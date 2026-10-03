# TASK PROMPT: BASE-001 — Align Backend Baseline Dependencies

**Task ID:** `BASE-001`  
**Phase:** Phase 0 — Baseline & Infrastructure Setup  
**Target File:** `careerpilot-backend/pom.xml`  

---

## 1. Goal & Context
`careerpilot-backend` is currently missing essential starter dependencies required by system specifications (`docs/05-data-model.md`, `docs/06-security-spec.md`, `docs/08-ai-spec.md`, `docs/09-integrations-spec.md`). 

This task adds:
- `flyway-core` and `flyway-database-postgresql` for database migrations.
- `jjwt-api`, `jjwt-impl`, and `jjwt-jackson` (0.12.x) for JWT token generation and validation.
- `spring-boot-starter-webflux` for non-blocking HTTP WebClient integration with AI providers (OpenRouter/Groq).
- `org.apache.pdfbox:pdfbox` (3.x) for parsing PDF resume files.

---

## 2. Step-by-Step Instructions
1. Open `careerpilot-backend/pom.xml`.
2. Add property versions for JJWT (`0.12.6`) and PDFBox (`3.0.3`) if applicable.
3. Add the required dependencies to `<dependencies>` block.
4. Run `./mvnw clean compile` from `careerpilot-backend` to verify compilation and dependency resolution.

---

## 3. Definition of Done
- `pom.xml` contains Flyway, JJWT, WebClient, and PDFBox.
- `./mvnw clean compile` finishes with `BUILD SUCCESS`.
- No deprecation or version mismatch warnings break compilation.
