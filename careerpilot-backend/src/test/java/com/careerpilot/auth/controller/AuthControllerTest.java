package com.careerpilot.auth.controller;

import com.careerpilot.auth.dto.AuthResponse;
import com.careerpilot.auth.dto.LoginRequest;
import com.careerpilot.auth.dto.RegisterRequest;
import com.careerpilot.auth.security.JwtTokenProvider;
import com.careerpilot.auth.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.containsString;
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

    @Mock
    private JwtTokenProvider tokenProvider;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(authController, "cookieSecure", false);
        ReflectionTestUtils.setField(authController, "cookieSameSite", "Lax");
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
                .expiresIn(86400000L)
                .userId(1L)
                .email("jane@example.com")
                .name("Jane Student")
                .role("STUDENT")
                .build();

        when(tokenProvider.getJwtRefreshExpirationMs()).thenReturn(604800000L);
        when(authService.register(any(RegisterRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(header().exists(HttpHeaders.SET_COOKIE))
                .andExpect(header().string(HttpHeaders.SET_COOKIE, containsString("refreshToken=mock-refresh-token")))
                .andExpect(header().string(HttpHeaders.SET_COOKIE, containsString("HttpOnly")))
                .andExpect(jsonPath("$.accessToken").value("mock-access-token"))
                .andExpect(jsonPath("$.refreshToken").doesNotExist())
                .andExpect(jsonPath("$.expiresIn").value(86400000L))
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
                .expiresIn(86400000L)
                .userId(1L)
                .email("jane@example.com")
                .name("Jane Student")
                .role("STUDENT")
                .build();

        when(tokenProvider.getJwtRefreshExpirationMs()).thenReturn(604800000L);
        when(authService.login(any(LoginRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(header().exists(HttpHeaders.SET_COOKIE))
                .andExpect(header().string(HttpHeaders.SET_COOKIE, containsString("refreshToken=mock-refresh-token")))
                .andExpect(header().string(HttpHeaders.SET_COOKIE, containsString("HttpOnly")))
                .andExpect(jsonPath("$.accessToken").value("mock-access-token"))
                .andExpect(jsonPath("$.refreshToken").doesNotExist())
                .andExpect(jsonPath("$.expiresIn").value(86400000L))
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

    @Test
    void refresh_WithCookie_Success() throws Exception {
        AuthResponse response = AuthResponse.builder()
                .accessToken("new-access-token")
                .refreshToken("rotated-refresh-token")
                .expiresIn(86400000L)
                .userId(1L)
                .email("jane@example.com")
                .name("Jane Student")
                .role("STUDENT")
                .build();

        when(tokenProvider.getJwtRefreshExpirationMs()).thenReturn(604800000L);
        when(authService.refreshToken("old-refresh-token")).thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/refresh")
                .cookie(new Cookie("refreshToken", "old-refresh-token")))
                .andExpect(status().isOk())
                .andExpect(header().exists(HttpHeaders.SET_COOKIE))
                .andExpect(header().string(HttpHeaders.SET_COOKIE, containsString("refreshToken=rotated-refresh-token")))
                .andExpect(header().string(HttpHeaders.SET_COOKIE, containsString("HttpOnly")))
                .andExpect(jsonPath("$.accessToken").value("new-access-token"))
                .andExpect(jsonPath("$.refreshToken").doesNotExist())
                .andExpect(jsonPath("$.expiresIn").value(86400000L));
    }

    @Test
    void refresh_MissingToken_ReturnsUnauthorized() throws Exception {
        mockMvc.perform(post("/api/v1/auth/refresh"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void refresh_InvalidToken_ReturnsUnauthorizedAndClearsCookie() throws Exception {
        when(authService.refreshToken("invalid-refresh-token"))
                .thenThrow(new IllegalArgumentException("Invalid token"));

        mockMvc.perform(post("/api/v1/auth/refresh")
                .cookie(new Cookie("refreshToken", "invalid-refresh-token")))
                .andExpect(status().isUnauthorized())
                .andExpect(header().string(HttpHeaders.SET_COOKIE, containsString("Max-Age=0")));
    }

    @Test
    void logout_ClearsRefreshTokenCookie() throws Exception {
        mockMvc.perform(post("/api/v1/auth/logout"))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.SET_COOKIE, containsString("Max-Age=0")))
                .andExpect(jsonPath("$.message").value("Logged out successfully"));
    }
}
