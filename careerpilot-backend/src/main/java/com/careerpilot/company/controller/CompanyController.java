package com.careerpilot.company.controller;

import com.careerpilot.company.dto.CompanyDto;
import com.careerpilot.company.dto.CreateCompanyRequest;
import com.careerpilot.company.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping
    public ResponseEntity<List<CompanyDto>> getAllCompanies() {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDto> getCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.getCompanyById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('STAFF', 'SUPER_ADMIN')")
    public ResponseEntity<CompanyDto> createCompany(@Valid @RequestBody CreateCompanyRequest request) {
        CompanyDto created = companyService.createCompany(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
