package com.careerpilot.auth.service;

import com.careerpilot.auth.dto.AuthResponse;
import com.careerpilot.auth.dto.LoginRequest;
import com.careerpilot.auth.dto.RefreshTokenRequest;
import com.careerpilot.auth.dto.RegisterRequest;
import com.careerpilot.auth.entity.Role;
import com.careerpilot.auth.entity.User;
import com.careerpilot.auth.repository.RoleRepository;
import com.careerpilot.auth.repository.UserRepository;
import com.careerpilot.auth.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered: " + request.getEmail());
        }

        String roleName = (request.getRole() != null && !request.getRole().isBlank()) 
                ? request.getRole().toUpperCase() 
                : "STUDENT";

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleName));

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail().toLowerCase().trim())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .active(true)
                .build();

        User savedUser = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String accessToken = tokenProvider.generateAccessToken(authentication, savedUser.getId());
        String refreshToken = tokenProvider.generateRefreshToken(savedUser.getEmail(), savedUser.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(tokenProvider.getJwtExpirationMs())
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .name(savedUser.getName())
                .role(savedUser.getRole().getName())
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String accessToken = tokenProvider.generateAccessToken(authentication, user.getId());
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail(), user.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(tokenProvider.getJwtExpirationMs())
                .userId(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().getName())
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        return refreshToken(request.getRefreshToken());
    }

    @Transactional(readOnly = true)
    public AuthResponse refreshToken(String rawRefreshToken) {
        if (rawRefreshToken == null || !tokenProvider.validateToken(rawRefreshToken)) {
            throw new IllegalArgumentException("Invalid or expired refresh token");
        }

        String email = tokenProvider.getUsernameFromToken(rawRefreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found for token"));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(), null, java.util.List.of(() -> "ROLE_" + user.getRole().getName())
        );

        String newAccessToken = tokenProvider.generateAccessToken(authentication, user.getId());
        String newRefreshToken = tokenProvider.generateRefreshToken(user.getEmail(), user.getId());

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .expiresIn(tokenProvider.getJwtExpirationMs())
                .userId(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().getName())
                .build();
    }
}
