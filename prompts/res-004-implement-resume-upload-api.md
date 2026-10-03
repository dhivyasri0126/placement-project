# TASK PROMPT: RES-004 — Resume Upload API & UI Component

**Task ID:** `RES-004`  
**Phase:** Phase 5 — Resume Management  
**Target Package:** `com.careerpilot.resume` & `careerpilot-frontend`  

---

## 1. Goal & Context
Provide multipart PDF resume upload endpoint (`POST /api/v1/resumes`) enforcing student ownership, PDF mime-type validation, file size limits (5MB), local object storage, and text extraction per `docs/04-api-spec.yaml`.

Endpoints:
- `POST /api/v1/resumes` (Accepts multipart/form-data PDF file, extracts text, persists Resume entity).
- `GET /api/v1/resumes/latest` (Returns authenticated student's latest uploaded resume).
- `GET /api/v1/resumes/{id}/download` (Downloads PDF resume file).

This task creates:
- `ResumeDto.java`.
- `ResumeService.java`.
- `ResumeController.java`.
- `ResumeUpload.tsx` UI component in `careerpilot-frontend`.

---

## 2. Step-by-Step Instructions
1. Create `ResumeDto.java` in `com.careerpilot.resume.dto`.
2. Implement `ResumeService.java` in `com.careerpilot.resume.service`.
3. Implement `ResumeController.java` in `com.careerpilot.resume.controller`.
4. Create `ResumeUpload.tsx` under `careerpilot-frontend/src/components/ResumeUpload.tsx`.
5. Run `./mvnw clean test` and `pnpm build`.

---

## 3. Definition of Done
- `POST /api/v1/resumes` accepts PDF file and extracts plain text.
- Invalid non-PDF files return `400 Bad Request`.
- Backend tests pass and frontend builds with zero errors.
