package com.careerpilot.company.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
    private Long id;
    private String name;
    private String normalizedName;
    private String description;
    private String website;
    private String status;
    private List<CompanyRoleDto> roles;
}
