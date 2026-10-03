package com.careerpilot.company.service;

import com.careerpilot.company.dto.CompanyDto;
import com.careerpilot.company.dto.CompanyRoleDto;
import com.careerpilot.company.dto.CreateCompanyRequest;
import com.careerpilot.company.dto.SkillRequirementDto;
import com.careerpilot.company.entity.Company;
import com.careerpilot.company.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Transactional(readOnly = true)
    public List<CompanyDto> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public CompanyDto getCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Company not found with id: " + id));
        return mapToDto(company);
    }

    @Transactional
    public CompanyDto createCompany(CreateCompanyRequest request) {
        String normalized = request.getName().toLowerCase().trim().replaceAll("[^a-z0-9]", "");
        
        if (companyRepository.findByNormalizedName(normalized).isPresent()) {
            throw new IllegalArgumentException("Company already exists with name: " + request.getName());
        }

        Company company = Company.builder()
                .name(request.getName().trim())
                .normalizedName(normalized)
                .description(request.getDescription())
                .website(request.getWebsite())
                .status("ACTIVE")
                .build();

        Company saved = companyRepository.save(company);
        return mapToDto(saved);
    }

    private CompanyDto mapToDto(Company company) {
        List<CompanyRoleDto> roles = company.getRoles() == null ? List.of() : company.getRoles().stream()
                .map(role -> CompanyRoleDto.builder()
                        .id(role.getId())
                        .name(role.getName())
                        .description(role.getDescription())
                        .status(role.getStatus())
                        .skillRequirements(role.getSkillRequirements() == null ? List.of() : role.getSkillRequirements().stream()
                                .map(req -> SkillRequirementDto.builder()
                                        .id(req.getId())
                                        .skillName(req.getSkillName())
                                        .requirementType(req.getRequirementType())
                                        .importance(req.getImportance())
                                        .source(req.getSource())
                                        .build())
                                .toList())
                        .build())
                .toList();

        return CompanyDto.builder()
                .id(company.getId())
                .name(company.getName())
                .normalizedName(company.getNormalizedName())
                .description(company.getDescription())
                .website(company.getWebsite())
                .status(company.getStatus())
                .roles(roles)
                .build();
    }
}
