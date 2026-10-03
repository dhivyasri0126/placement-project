# TASK PROMPT: PROF-002 — Student Profile API Endpoints & UI Page

**Task ID:** `PROF-002`  
**Phase:** Phase 4 — Target Company & Student Profile  
**Target Package:** `com.careerpilot.student` & `careerpilot-frontend`  

---

## 1. Goal & Context
Expose profile management endpoints (`GET /api/v1/students/me`, `PUT /api/v1/students/me`) and implement the frontend student profile page per OpenAPI contract (`docs/04-api-spec.yaml`).

Endpoints:
- `GET /api/v1/students/me` (Returns authenticated student's profile & target company selection).
- `PUT /api/v1/students/me` (Updates college, CGPA, graduation year, bio, & target company ID).

This task creates:
- `StudentController.java` with Spring Security user identity extraction.
- `StudentControllerTest.java` integration test.
- `ProfilePage.tsx` initial UI form in `careerpilot-frontend`.

---

## 2. Step-by-Step Instructions
1. Create `StudentController.java` under `com.careerpilot.student.controller`.
2. Create test `StudentControllerTest.java`.
3. Create `ProfilePage.tsx` under `careerpilot-frontend/src/pages/ProfilePage.tsx`.
4. Compile backend with `./mvnw clean test` and build frontend with `pnpm build`.

---

## 3. Definition of Done
- `GET /me` and `PUT /me` endpoints return authenticated student profile.
- Profile update changes target company and metadata cleanly.
- Tests pass via `./mvnw clean test` and `pnpm build`.
