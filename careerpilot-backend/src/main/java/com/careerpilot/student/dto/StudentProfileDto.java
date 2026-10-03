package com.careerpilot.student.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileDto {
    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String college;
    private String department;
    private BigDecimal cgpa;
    private Integer graduationYear;
    private String phone;
    private String bio;
    private Long targetCompanyId;
    private String targetCompanyName;
    private Long targetCompanyRoleId;
    private String targetCompanyRoleName;
}
