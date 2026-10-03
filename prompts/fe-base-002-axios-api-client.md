# TASK PROMPT: FE-BASE-002 — Axios HTTP API Client & Interceptors

**Task ID:** `FE-BASE-002`  
**Phase:** Phase 3 — Frontend Auth & Navigation  
**Target File:** `careerpilot-frontend/src/api/client.ts`  

---

## 1. Goal & Context
Frontend API requests must automatically attach JWT access tokens in the `Authorization: Bearer <token>` header, handle 401 Unauthorized responses with automatic token refresh, and provide central error handling per `docs/04-api-spec.yaml`.

This task creates:
- `api/client.ts` Axios instance configured with `baseURL` (`/api/v1`).
- Request interceptor attaching `Bearer <token>` from local storage.
- Response interceptor catching 401 errors and calling `/api/v1/auth/refresh`.

---

## 2. Step-by-Step Instructions
1. Create `careerpilot-frontend/src/api/client.ts`.
2. Configure request and response interceptors.
3. Export custom `api` client instance.
4. Verify with `pnpm build`.

---

## 3. Definition of Done
- Axios instance configured with authorization headers and token refresh logic.
- `pnpm build` passes with zero errors.
