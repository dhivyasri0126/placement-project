# TASK PROMPT: BASE-002 — Add Frontend Baseline Dependencies

**Task ID:** `BASE-002`  
**Phase:** Phase 0 — Baseline & Infrastructure Setup  
**Target File:** `careerpilot-frontend/package.json`  

---

## 1. Goal & Context
`careerpilot-frontend` requires client-side routing (`react-router-dom`) and an HTTP API client (`axios`) to interact with backend endpoints.

This task adds:
- `react-router-dom` (6.x or compatible standard version) to `dependencies`.
- `axios` (1.x) to `dependencies`.
- `@types/react-router-dom` if required for TypeScript compilation.

---

## 2. Step-by-Step Instructions
1. Inspect `careerpilot-frontend/package.json`.
2. Run `pnpm add react-router-dom axios` (or edit `package.json` and run `pnpm install`).
3. Run `pnpm build` in `careerpilot-frontend` to verify clean TypeScript compilation and bundling.

---

## 3. Definition of Done
- `package.json` contains `react-router-dom` and `axios`.
- `pnpm build` compiles cleanly without TypeScript errors.
