package com.careerpilot.student.controller;

import com.careerpilot.auth.entity.User;
import com.careerpilot.auth.repository.UserRepository;
import com.careerpilot.student.dto.StudentProfileDto;
import com.careerpilot.student.dto.UpdateProfileRequest;
import com.careerpilot.student.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<StudentProfileDto> getMyProfile(Authentication authentication) {
        User user = getUserFromAuth(authentication);
        return ResponseEntity.ok(studentService.getProfileByUserId(user.getId()));
    }

    @PutMapping("/me")
    public ResponseEntity<StudentProfileDto> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request) {
        User user = getUserFromAuth(authentication);
        return ResponseEntity.ok(studentService.updateProfile(user.getId(), request));
    }

    private User getUserFromAuth(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("Authenticated user not found"));
    }
}
