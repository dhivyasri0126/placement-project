package com.careerpilot.resume.service;

import com.careerpilot.auth.entity.User;
import com.careerpilot.auth.repository.UserRepository;
import com.careerpilot.resume.dto.ResumeDto;
import com.careerpilot.resume.entity.Resume;
import com.careerpilot.resume.repository.ResumeRepository;
import com.careerpilot.student.entity.Student;
import com.careerpilot.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final PdfTextExtractorService pdfTextExtractorService;

    @Transactional
    public ResumeDto uploadResume(Long userId, MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.equalsIgnoreCase("application/pdf")) {
            throw new IllegalArgumentException("Only PDF resume files are accepted. Provided type: " + contentType);
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("Resume file size exceeds maximum limit of 5MB");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        Student student = studentRepository.findByUserId(userId)
                .orElseGet(() -> studentRepository.save(Student.builder().user(user).build()));

        // 1. Store File locally
        String objectKey = fileStorageService.storeFile(file);

        // 2. Extract Plain Text
        String extractedText = "";
        String extractedStatus = "COMPLETED";
        try {
            extractedText = pdfTextExtractorService.extractTextFromPdf(file.getInputStream());
        } catch (Exception e) {
            log.error("Text extraction failed for file {}", objectKey, e);
            extractedStatus = "FAILED";
        }

        // 3. Save Resume Entity
        Resume resume = Resume.builder()
                .student(student)
                .objectKey(objectKey)
                .originalFilename(file.getOriginalFilename() != null ? file.getOriginalFilename() : "resume.pdf")
                .contentType(contentType)
                .fileSizeBytes(file.getSize())
                .extractedText(extractedText)
                .extractedTextStatus(extractedStatus)
                .analysisStatus("NOT_ANALYZED")
                .build();

        Resume saved = resumeRepository.save(resume);
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public ResumeDto getLatestResume(Long userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Student profile not found for user: " + userId));

        Resume resume = resumeRepository.findFirstByStudentIdOrderByCreatedAtDesc(student.getId())
                .orElseThrow(() -> new IllegalArgumentException("No uploaded resume found for student"));

        return mapToDto(resume);
    }

    @Transactional(readOnly = true)
    public Resource loadResumeAsResource(Long userId, Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("Resume not found with id: " + resumeId));

        if (!resume.getStudent().getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized access to resume file");
        }

        Path path = fileStorageService.loadFileAsPath(resume.getObjectKey());
        try {
            Resource resource = new UrlResource(path.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new IllegalArgumentException("Could not read file: " + resume.getOriginalFilename());
            }
        } catch (MalformedURLException e) {
            throw new IllegalArgumentException("Error reading file: " + resume.getOriginalFilename(), e);
        }
    }

    private ResumeDto mapToDto(Resume resume) {
        String snippet = resume.getExtractedText();
        if (snippet != null && snippet.length() > 200) {
            snippet = snippet.substring(0, 200) + "...";
        }

        return ResumeDto.builder()
                .id(resume.getId())
                .studentId(resume.getStudent().getId())
                .objectKey(resume.getObjectKey())
                .originalFilename(resume.getOriginalFilename())
                .contentType(resume.getContentType())
                .fileSizeBytes(resume.getFileSizeBytes())
                .extractedTextStatus(resume.getExtractedTextStatus())
                .analysisStatus(resume.getAnalysisStatus())
                .extractedTextSnippet(snippet)
                .createdAt(resume.getCreatedAt())
                .build();
    }
}
