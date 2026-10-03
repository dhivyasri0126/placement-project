package com.careerpilot.student.controller;

import com.careerpilot.auth.entity.User;
import com.careerpilot.auth.repository.UserRepository;
import com.careerpilot.student.dto.StudentProfileDto;
import com.careerpilot.student.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class StudentControllerTest {

    private MockMvc mockMvc;

    @Mock
    private StudentService studentService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private StudentController studentController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(studentController).build();
    }

    @Test
    void getMyProfile_Success() throws Exception {
        User user = User.builder().id(1L).email("student@example.com").name("Alex").build();
        StudentProfileDto dto = StudentProfileDto.builder()
                .id(10L)
                .userId(1L)
                .name("Alex")
                .email("student@example.com")
                .college("MIT")
                .department("Computer Science")
                .build();

        when(userRepository.findByEmail("student@example.com")).thenReturn(Optional.of(user));
        when(studentService.getProfileByUserId(1L)).thenReturn(dto);

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken("student@example.com", null);
        SecurityContextHolder.getContext().setAuthentication(auth);

        mockMvc.perform(get("/api/v1/students/me")
                .principal(auth)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("student@example.com"))
                .andExpect(jsonPath("$.college").value("MIT"));
    }
}
