package com.careerpilot.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeDto {
    private Long id;
    private Long studentId;
    private String objectKey;
    private String originalFilename;
    private String contentType;
    private Long fileSizeBytes;
    private String extractedTextStatus;
    private String analysisStatus;
    private String extractedTextSnippet;
    private Instant createdAt;
}
