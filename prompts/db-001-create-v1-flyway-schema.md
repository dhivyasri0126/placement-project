# TASK PROMPT: DB-001 — Create Flyway V1 Initial Schema

**Task ID:** `DB-001`  
**Phase:** Phase 1 — Database Foundation & Migrations  
**Target File:** `careerpilot-backend/src/main/resources/db/migration/V1__initial_schema.sql`  

---

## 1. Goal & Context
Per `docs/05-data-model.md` and `docs/13-technology-standards.md`, database schema management must be version-controlled via Flyway migrations.

This task creates the initial schema baseline (`V1__initial_schema.sql`) containing:
- `roles` (id, name, created_at, updated_at) with default seed (`STUDENT`, `STAFF`, `SUPER_ADMIN`).
- `permissions` (id, name, description, created_at) catalog.
- `role_permissions` (role_id, permission_id) mapping.
- `users` (id, name, email, password, active, role_id, created_at, updated_at).
- `students` (id, user_id, college, department, cgpa, graduation_year, phone, bio, created_at, updated_at).
- `audit_logs` (id, actor_user_id, action, resource, details, ip_address, created_at).
- `ai_request_logs` (id, user_id, feature, provider, model, prompt_tokens, completion_tokens, total_tokens, latency_ms, status, created_at).

---

## 2. Step-by-Step Instructions
1. Create directory `careerpilot-backend/src/main/resources/db/migration`.
2. Create `V1__initial_schema.sql` with PostgreSQL DDL syntax.
3. Configure `application.properties` with database connection settings and Flyway configuration (`spring.flyway.enabled=true`, `spring.jpa.hibernate.ddl-auto=validate`).
4. Validate schema creation by compiling/testing backend or verifying SQL DDL correctness.

---

## 3. Definition of Done
- `V1__initial_schema.sql` exists in `db/migration`.
- SQL includes PKs, FKs, NOT NULL constraints, UNIQUE indices, and initial seed data.
- `./mvnw clean compile` succeeds without configuration errors.
