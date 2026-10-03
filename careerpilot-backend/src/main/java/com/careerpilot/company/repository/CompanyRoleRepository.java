package com.careerpilot.company.repository;

import com.careerpilot.company.entity.CompanyRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRoleRepository extends JpaRepository<CompanyRole, Long> {
    List<CompanyRole> findByCompanyId(Long companyId);
}
