# TASK PROMPT: PROF-001 — Student Profile Entity & Service

**Task ID:** `PROF-001`  
**Phase:** Phase 4 — Target Company & Student Profile  
**Target Package:** `com.careerpilot.student`  

---

## 1. Goal & Context
Every student user has a `Student` profile record storing college, department, CGPA, graduation year, phone, bio, and target company selection per `docs/05-data-model.md`.

This task creates:
- `Student` JPA entity (`@Entity`, `@Table(name = "students")`).
- `StudentRepository` (`findByUserId(Long userId)`).
- Profile DTOs (`StudentProfileDto`, `UpdateProfileRequest`).
- `StudentService.java` providing `getStudentProfile(Long userId)` and `updateStudentProfile(Long userId, UpdateProfileRequest request)`.

---

## 2. Step-by-Step Instructions
1. Create package `com.careerpilot.student.entity` and implement `Student.java`.
2. Create package `com.careerpilot.student.repository` and implement `StudentRepository.java`.
3. Create package `com.careerpilot.student.dto` and implement `StudentProfileDto.java` and `UpdateProfileRequest.java`.
4. Create package `com.careerpilot.student.service` and implement `StudentService.java`.
5. Compile backend via `./mvnw clean compile`.

---

## 3. Definition of Done
- `Student` entity mapped to `students` table.
- `StudentService` creates profile if missing and handles updates cleanly.
- `./mvnw clean compile` passes with zero errors.
