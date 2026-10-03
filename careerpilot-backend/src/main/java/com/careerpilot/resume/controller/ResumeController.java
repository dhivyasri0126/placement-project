package com.careerpilot.resume.controller;

import com.careerpilot.auth.entity.User;
import com.careerpilot.auth.repository.UserRepository;
import com.careerpilot.resume.dto.ResumeDto;
import com.careerpilot.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;
    private final UserRepository userRepository;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResumeDto> uploadResume(
            Authentication authentication,
            @RequestParam("file") MultipartFile file) {
        User user = getUserFromAuth(authentication);
        ResumeDto response = resumeService.uploadResume(user.getId(), file);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/latest")
    public ResponseEntity<ResumeDto> getLatestResume(Authentication authentication) {
        User user = getUserFromAuth(authentication);
        return ResponseEntity.ok(resumeService.getLatestResume(user.getId()));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadResume(
            Authentication authentication,
            @PathVariable Long id) {
        User user = getUserFromAuth(authentication);
        Resource resource = resumeService.loadResumeAsResource(user.getId(), id);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    private User getUserFromAuth(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("Authenticated user not found"));
    }
}
