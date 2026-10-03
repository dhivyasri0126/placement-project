package com.careerpilot.resume.controller;

import com.careerpilot.auth.entity.User;
import com.careerpilot.auth.repository.UserRepository;
import com.careerpilot.resume.dto.ResumeDto;
import com.careerpilot.resume.service.ResumeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class ResumeControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ResumeService resumeService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ResumeController resumeController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(resumeController).build();
    }

    @Test
    void uploadResume_Success() throws Exception {
        User user = User.builder().id(1L).email("student@example.com").build();
        MockMultipartFile pdfFile = new MockMultipartFile("file", "resume.pdf", "application/pdf", "Dummy PDF content".getBytes());

        ResumeDto dto = ResumeDto.builder()
                .id(100L)
                .studentId(10L)
                .originalFilename("resume.pdf")
                .contentType("application/pdf")
                .fileSizeBytes(16L)
                .extractedTextStatus("COMPLETED")
                .analysisStatus("NOT_ANALYZED")
                .build();

        when(userRepository.findByEmail("student@example.com")).thenReturn(Optional.of(user));
        when(resumeService.uploadResume(eq(1L), any())).thenReturn(dto);

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken("student@example.com", null);
        SecurityContextHolder.getContext().setAuthentication(auth);

        mockMvc.perform(multipart("/api/v1/resumes")
                .file(pdfFile)
                .principal(auth))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.originalFilename").value("resume.pdf"))
                .andExpect(jsonPath("$.extractedTextStatus").value("COMPLETED"));
    }
}
