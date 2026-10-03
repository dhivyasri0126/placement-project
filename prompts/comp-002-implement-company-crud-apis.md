# TASK PROMPT: COMP-002 — Target Company CRUD APIs & Service

**Task ID:** `COMP-002`  
**Phase:** Phase 4 — Target Company & Student Profile  
**Target Package:** `com.careerpilot.company`  

---

## 1. Goal & Context
Target company catalog APIs allow students to browse target companies and staff/admin to manage company roles per OpenAPI contract (`docs/04-api-spec.yaml`).

Endpoints:
- `GET /api/v1/companies` (Returns active target companies and job roles).
- `GET /api/v1/companies/{id}` (Returns company details with skill requirements).
- `POST /api/v1/companies` (Admin/Staff creates target company profile).

This task creates:
- DTOs (`CompanyDto`, `CompanyRoleDto`, `SkillRequirementDto`, `CreateCompanyRequest`).
- `CompanyService.java` with methods `getAllCompanies()`, `getCompanyById()`, `createCompany()`.
- `CompanyController.java` exposing REST endpoints.

---

## 2. Step-by-Step Instructions
1. Create `com.careerpilot.company.dto` package with DTO classes.
2. Implement `CompanyService.java` in `com.careerpilot.company.service`.
3. Implement `CompanyController.java` in `com.careerpilot.company.controller`.
4. Run `./mvnw clean test` to verify backend build and test execution.

---

## 3. Definition of Done
- `GET /api/v1/companies` and `POST /api/v1/companies` endpoints implemented.
- Normalized company names generated automatically (`Google` -> `google`).
- `./mvnw clean test` passes with zero errors.
