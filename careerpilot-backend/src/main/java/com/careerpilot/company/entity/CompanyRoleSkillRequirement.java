package com.careerpilot.company.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "company_role_skill_requirements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyRoleSkillRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_role_id", nullable = false)
    private CompanyRole companyRole;

    @Column(name = "skill_name", nullable = false, length = 100)
    private String skillName;

    @Builder.Default
    @Column(name = "requirement_type", nullable = false, length = 50)
    private String requirementType = "REQUIRED"; // REQUIRED, PREFERRED

    @Builder.Default
    @Column(nullable = false)
    private Integer importance = 1;

    private String source;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}
