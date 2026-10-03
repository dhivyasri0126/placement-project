package com.careerpilot.student.service;

import com.careerpilot.auth.entity.User;
import com.careerpilot.auth.repository.UserRepository;
import com.careerpilot.company.entity.Company;
import com.careerpilot.company.entity.CompanyRole;
import com.careerpilot.company.repository.CompanyRepository;
import com.careerpilot.company.repository.CompanyRoleRepository;
import com.careerpilot.student.dto.StudentProfileDto;
import com.careerpilot.student.dto.UpdateProfileRequest;
import com.careerpilot.student.entity.Student;
import com.careerpilot.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final CompanyRoleRepository companyRoleRepository;

    @Transactional
    public StudentProfileDto getProfileByUserId(Long userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultStudentProfile(userId));

        return mapToDto(student);
    }

    @Transactional
    public StudentProfileDto updateProfile(Long userId, UpdateProfileRequest request) {
        Student student = studentRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultStudentProfile(userId));

        if (request.getCollege() != null) student.setCollege(request.getCollege());
        if (request.getDepartment() != null) student.setDepartment(request.getDepartment());
        if (request.getCgpa() != null) student.setCgpa(request.getCgpa());
        if (request.getGraduationYear() != null) student.setGraduationYear(request.getGraduationYear());
        if (request.getPhone() != null) student.setPhone(request.getPhone());
        if (request.getBio() != null) student.setBio(request.getBio());

        if (request.getTargetCompanyId() != null) {
            Company company = companyRepository.findById(request.getTargetCompanyId())
                    .orElseThrow(() -> new IllegalArgumentException("Company not found: " + request.getTargetCompanyId()));
            student.setTargetCompany(company);
        }

        if (request.getTargetCompanyRoleId() != null) {
            CompanyRole role = companyRoleRepository.findById(request.getTargetCompanyRoleId())
                    .orElseThrow(() -> new IllegalArgumentException("Company role not found: " + request.getTargetCompanyRoleId()));
            student.setTargetCompanyRole(role);
        }

        Student updated = studentRepository.save(student);
        return mapToDto(updated);
    }

    private Student createDefaultStudentProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        Student student = Student.builder()
                .user(user)
                .build();

        return studentRepository.save(student);
    }

    private StudentProfileDto mapToDto(Student student) {
        return StudentProfileDto.builder()
                .id(student.getId())
                .userId(student.getUser().getId())
                .name(student.getUser().getName())
                .email(student.getUser().getEmail())
                .college(student.getCollege())
                .department(student.getDepartment())
                .cgpa(student.getCgpa())
                .graduationYear(student.getGraduationYear())
                .phone(student.getPhone())
                .bio(student.getBio())
                .targetCompanyId(student.getTargetCompany() != null ? student.getTargetCompany().getId() : null)
                .targetCompanyName(student.getTargetCompany() != null ? student.getTargetCompany().getName() : null)
                .targetCompanyRoleId(student.getTargetCompanyRole() != null ? student.getTargetCompanyRole().getId() : null)
                .targetCompanyRoleName(student.getTargetCompanyRole() != null ? student.getTargetCompanyRole().getName() : null)
                .build();
    }
}
