# TASK PROMPT: COMP-001 — Target Company Schema & JPA Entities

**Task ID:** `COMP-001`  
**Phase:** Phase 4 — Target Company & Student Profile  
**Target Package:** `com.careerpilot.company`  

---

## 1. Goal & Context
Target company requirements drive resume analysis, skill gap calculation, and AI mock interview question generation per `docs/01-product-spec.md` and `docs/05-data-model.md`.

This task creates:
- Flyway Migration `V2__companies.sql` defining `companies`, `company_roles`, and `company_role_skill_requirements` tables.
- `Company` entity (`@Entity`, `@Table(name = "companies")`).
- `CompanyRole` entity (`@Entity`, `@Table(name = "company_roles")`).
- `CompanyRoleSkillRequirement` entity (`@Entity`, `@Table(name = "company_role_skill_requirements")`).
- Repositories (`CompanyRepository`, `CompanyRoleRepository`).

---

## 2. Step-by-Step Instructions
1. Create Flyway migration file `V2__companies.sql` in `db/migration`.
2. Create package `com.careerpilot.company.entity` and implement `Company.java`, `CompanyRole.java`, `CompanyRoleSkillRequirement.java`.
3. Create package `com.careerpilot.company.repository` and implement `CompanyRepository.java` and `CompanyRoleRepository.java`.
4. Compile backend via `./mvnw clean compile`.

---

## 3. Definition of Done
- `V2__companies.sql` created with foreign keys and unique constraints.
- Company JPA entities mapped cleanly.
- `./mvnw clean compile` passes with zero errors.
