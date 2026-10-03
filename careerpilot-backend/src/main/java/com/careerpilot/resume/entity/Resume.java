package com.careerpilot.resume.entity;

import com.careerpilot.student.entity.Student;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "object_key", nullable = false, unique = true)
    private String objectKey;

    @Column(name = "original_filename", nullable = false)
    private String originalFilename;

    @Column(name = "content_type", nullable = false, length = 100)
    private String contentType;

    @Column(name = "file_size_bytes", nullable = false)
    private Long fileSizeBytes;

    private String checksum;

    @Column(name = "extracted_text", columnDefinition = "TEXT")
    private String extractedText;

    @Builder.Default
    @Column(name = "extracted_text_status", nullable = false, length = 50)
    private String extractedTextStatus = "PENDING"; // PENDING, COMPLETED, FAILED

    @Builder.Default
    @Column(name = "analysis_status", nullable = false, length = 50)
    private String analysisStatus = "NOT_ANALYZED"; // NOT_ANALYZED, IN_PROGRESS, COMPLETED, FAILED

    @OneToOne(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    private ResumeAnalysis analysis;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
