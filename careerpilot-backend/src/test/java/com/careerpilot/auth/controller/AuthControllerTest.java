package com.careerpilot.auth.controller;

import com.careerpilot.auth.dto.AuthResponse;
import com.careerpilot.auth.dto.LoginRequest;
import com.careerpilot.auth.dto.RegisterRequest;
import com.careerpilot.auth.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    void registerUser_Success() throws Exception {
        RegisterRequest request = RegisterRequest.builder()
                .name("Jane Student")
                .email("jane@example.com")
                .password("password123")
                .role("STUDENT")
                .build();

        AuthResponse response = AuthResponse.builder()
                .accessToken("mock-access-token")
                .refreshToken("mock-refresh-token")
                .userId(1L)
                .email("jane@example.com")
                .name("Jane Student")
                .role("STUDENT")
                .build();

        when(authService.register(any(RegisterRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken").value("mock-access-token"))
                .andExpect(jsonPath("$.email").value("jane@example.com"))
                .andExpect(jsonPath("$.role").value("STUDENT"));
    }

    @Test
    void loginUser_Success() throws Exception {
        LoginRequest request = LoginRequest.builder()
                .email("jane@example.com")
                .password("password123")
                .build();

        AuthResponse response = AuthResponse.builder()
                .accessToken("mock-access-token")
                .refreshToken("mock-refresh-token")
                .userId(1L)
                .email("jane@example.com")
                .name("Jane Student")
                .role("STUDENT")
                .build();

        when(authService.login(any(LoginRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("mock-access-token"))
                .andExpect(jsonPath("$.email").value("jane@example.com"));
    }

    @Test
    void loginUser_ValidationError() throws Exception {
        LoginRequest request = LoginRequest.builder()
                .email("invalid-email")
                .password("")
                .build();

        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}
