package com.careerpilot.student.entity;

import com.careerpilot.auth.entity.User;
import com.careerpilot.company.entity.Company;
import com.careerpilot.company.entity.CompanyRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String college;
    private String department;

    @Column(precision = 3, scale = 2)
    private BigDecimal cgpa;

    @Column(name = "graduation_year")
    private Integer graduationYear;

    private String phone;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_company_id")
    private Company targetCompany;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_company_role_id")
    private CompanyRole targetCompanyRole;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
