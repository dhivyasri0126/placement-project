package com.careerpilot.company.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "company_roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Builder.Default
    @Column(nullable = false, length = 50)
    private String status = "ACTIVE";

    @OneToMany(mappedBy = "companyRole", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CompanyRoleSkillRequirement> skillRequirements = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
