package com.careerpilot.company.repository;

import com.careerpilot.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByNormalizedName(String normalizedName);
    List<Company> findByStatus(String status);
}
