package com.careerpilot.company.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillRequirementDto {
    private Long id;
    private String skillName;
    private String requirementType;
    private Integer importance;
    private String source;
}
