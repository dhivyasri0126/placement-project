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
public class UpdateProfileRequest {
    private String college;
    private String department;
    private BigDecimal cgpa;
    private Integer graduationYear;
    private String phone;
    private String bio;
    private Long targetCompanyId;
    private Long targetCompanyRoleId;
}
