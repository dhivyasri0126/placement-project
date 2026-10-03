# TASK PROMPT: RES-001 — Resume Schema, Local Object Storage & PDF Text Extraction

**Task ID:** `RES-001`  
**Phase:** Phase 5 — Resume Management  
**Target Package:** `com.careerpilot.resume`  

---

## 1. Goal & Context
PDF resume uploads are stored in object storage outside PostgreSQL while metadata, extraction status, and parsed plain text are stored in PostgreSQL per `docs/05-data-model.md` and `docs/09-integrations-spec.md`.

This task creates:
- Flyway Migration `V3__resumes.sql` defining `resumes` and `resume_analyses` tables.
- `FileStorageService.java` securely persisting uploaded PDFs to a configured local storage directory.
- `PdfTextExtractorService.java` using Apache PDFBox 3.x to extract plain text from PDF resumes.
- `Resume` entity (`@Entity`, `@Table(name = "resumes")`).
- `ResumeRepository` (`findByStudentId(Long studentId)`).

---

## 2. Step-by-Step Instructions
1. Create `V3__resumes.sql` under `db/migration`.
2. Create package `com.careerpilot.resume.service` and implement `FileStorageService.java` and `PdfTextExtractorService.java`.
3. Create package `com.careerpilot.resume.entity` and implement `Resume.java`.
4. Create package `com.careerpilot.resume.repository` and implement `ResumeRepository.java`.
5. Compile backend via `./mvnw clean compile`.

---

## 3. Definition of Done
- `V3__resumes.sql` created with constraints.
- `FileStorageService` creates target storage folder and saves files securely.
- `PdfTextExtractorService` parses PDF input stream using PDFBox `PDFTextStripper`.
- `./mvnw clean compile` passes.
