# TASK PROMPT: BASE-004 — Concurrent Frontend and Backend Dev Runner

**Task ID:** `BASE-004`  
**Phase:** Phase 0 — Baseline & Infrastructure Setup  
**Target Files:** `package.json`, `scripts/dev.sh`, `prompts/base-004-concurrent-dev-runner.md`

---

## 1. Goal & Context
Developers need a clean, single-command workflow to start both the Spring Boot backend (`careerpilot-backend`) and the Vite React frontend (`careerpilot-frontend`) concurrently from the project root (`pnpm run dev`), along with individual task commands and a standalone shell fallback.

Decision point:
- **Option A:** Shell script only (`scripts/dev.sh`) without root manifest.
  - *Short description:* Lightweight bash script using background jobs and signal traps. Fails if user runs `pnpm run dev` from root.
- **Option B (Recommended):** Root `package.json` with `concurrently` + companion `scripts/dev.sh`.
  - *Why it is better:* Addresses `ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND` directly, adheres to 2026 monorepo developer ergonomics, provides color-coded process labeling (`[backend]`, `[frontend]`), cleanly terminates child processes on `Ctrl+C` or failure (`--kill-others-on-fail`), and includes convenience commands for individual services and Docker.

---

## 2. Step-by-Step Instructions
1. Create root `package.json` marked as `"private": true` with `pnpm` engine specification and scripts:
   - `dev`: `concurrently -k -n "backend,frontend" -c "magenta.bold,cyan.bold" "pnpm run dev:backend" "pnpm run dev:frontend"`
   - `dev:frontend`: `pnpm --prefix careerpilot-frontend run dev`
   - `dev:backend`: `cd careerpilot-backend && ./mvnw spring-boot:run`
   - `build:frontend`: `pnpm --prefix careerpilot-frontend run build`
   - `build:backend`: `cd careerpilot-backend && ./mvnw clean package -DskipTests`
   - `db:up`: `docker compose up -d`
   - `db:down`: `docker compose down`
2. Install `concurrently` as a root dev dependency via `pnpm add -D -w concurrently`.
3. Provide a POSIX-compliant helper script `scripts/dev.sh` that checks Docker/DB availability, supports running with or without `pnpm`, and sets up trap cleanup.
4. Validate that `pnpm run dev:frontend` and root commands execute properly.
5. Update documentation / instructions.

---

## 3. Definition of Done
- Root `package.json` exists with `"private": true` and appropriate scripts.
- Running `pnpm run dev` or `pnpm run dev:frontend` from the repository root works seamlessly.
- Process termination (`SIGINT`/`SIGTERM`) cleanly terminates both processes without dangling Java or Vite ports.
- Documentation and scripts are verified.
