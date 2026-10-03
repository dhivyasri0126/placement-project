# TASK PROMPT: BASE-003 — Create docker-compose for PostgreSQL Database

**Task ID:** `BASE-003`  
**Phase:** Phase 0 — Baseline & Infrastructure Setup  
**Target File:** `docker-compose.yml`  

---

## 1. Goal & Context
To run local database migrations and backend integration tests, a local PostgreSQL 16 instance is required.

This task creates:
- Root `docker-compose.yml` with a `postgres` service.
- Database: `careerpilot_db`
- User: `careerpilot`
- Password: `careerpilot_password`
- Port mapping: `5432:5432`
- Healthcheck strategy to verify readiness before application startup.

---

## 2. Step-by-Step Instructions
1. Create `docker-compose.yml` in repository root.
2. Configure PostgreSQL container image (`postgres:16-alpine`), environment variables, volume persistence, and healthcheck.
3. Validate by running `docker compose config` or launching with `docker compose up -d`.

---

## 3. Definition of Done
- `docker-compose.yml` exists in root.
- PostgreSQL service configured per project specs.
- Syntax validated with `docker compose config`.
