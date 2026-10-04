package com.careerpilot.auth.controller;

import com.careerpilot.auth.dto.AuthResponse;
import com.careerpilot.auth.dto.LoginRequest;
import com.careerpilot.auth.dto.RefreshTokenRequest;
import com.careerpilot.auth.dto.RegisterRequest;
import com.careerpilot.auth.security.JwtTokenProvider;
import com.careerpilot.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    public static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
    private static final String COOKIE_PATH = "/api/v1/auth";

    private final AuthService authService;
    private final JwtTokenProvider tokenProvider;

    @Value("${jwt.cookie.secure:false}")
    private boolean cookieSecure;

    @Value("${jwt.cookie.same-site:Lax}")
    private String cookieSameSite;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        ResponseCookie cookie = buildRefreshTokenCookie(response.getRefreshToken(), tokenProvider.getJwtRefreshExpirationMs() / 1000);

        AuthResponse clientResponse = response.toBuilder()
                .refreshToken(null)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(clientResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        ResponseCookie cookie = buildRefreshTokenCookie(response.getRefreshToken(), tokenProvider.getJwtRefreshExpirationMs() / 1000);

        AuthResponse clientResponse = response.toBuilder()
                .refreshToken(null)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(clientResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(
            @CookieValue(name = REFRESH_TOKEN_COOKIE_NAME, required = false) String refreshTokenFromCookie,
            @RequestBody(required = false) RefreshTokenRequest requestBody) {

        String tokenToValidate = (refreshTokenFromCookie != null && !refreshTokenFromCookie.isBlank())
                ? refreshTokenFromCookie
                : (requestBody != null ? requestBody.getRefreshToken() : null);

        if (tokenToValidate == null || tokenToValidate.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            AuthResponse response = authService.refreshToken(tokenToValidate);
            ResponseCookie newCookie = buildRefreshTokenCookie(
                    response.getRefreshToken(),
                    tokenProvider.getJwtRefreshExpirationMs() / 1000
            );

            AuthResponse clientResponse = response.toBuilder()
                    .refreshToken(null)
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, newCookie.toString())
                    .body(clientResponse);
        } catch (IllegalArgumentException ex) {
            // Invalid or expired refresh token
            ResponseCookie cleanCookie = buildCleanRefreshTokenCookie();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .header(HttpHeaders.SET_COOKIE, cleanCookie.toString())
                    .build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        ResponseCookie cleanCookie = buildCleanRefreshTokenCookie();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cleanCookie.toString())
                .body(Map.of("message", "Logged out successfully"));
    }

    private ResponseCookie buildRefreshTokenCookie(String token, long maxAgeSeconds) {
        return ResponseCookie.from(REFRESH_TOKEN_COOKIE_NAME, token)
                .httpOnly(true)
                .secure(cookieSecure)
                .path(COOKIE_PATH)
                .maxAge(maxAgeSeconds)
                .sameSite(cookieSameSite)
                .build();
    }

    private ResponseCookie buildCleanRefreshTokenCookie() {
        return ResponseCookie.from(REFRESH_TOKEN_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path(COOKIE_PATH)
                .maxAge(0)
                .sameSite(cookieSameSite)
                .build();
    }
}
