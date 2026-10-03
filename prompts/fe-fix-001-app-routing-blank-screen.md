# TASK PROMPT: FE-FIX-001 — Resolve Frontend Blank Screen with App Shell & Client Routing

**Task ID:** `FE-FIX-001`  
**Phase:** Phase 3 — Frontend Routing & UI Shell  
**Target Package:** `careerpilot-frontend/src`  

---

## 1. Goal & Context
When running Vite dev (`http://localhost:5173`) or preview (`http://localhost:4173`), the browser renders a completely blank page without any visual output or console errors.

Root cause analysis:
`careerpilot-frontend/src/App.tsx` was left returning an empty fragment `<></>`. React mounts into `<div id="root"></div>`, producing empty output. Furthermore, client-side routing defined in `FE-BASE-001` (`react-router-dom`, `AuthProvider`, `ProtectedRoute`, `LoginPage`, `RegisterPage`, `ProfilePage`, `DesignSystemPage`, `DashboardPage`) was never mounted.

This task resolves the blank screen by:
1. Setting up full client-side routing in `App.tsx` using `BrowserRouter`, `AuthProvider`, and route configuration.
2. Creating an application navigation shell (`Navbar.tsx`) with orientation, brand title, authenticated user badge, and navigation links.
3. Implementing `DashboardPage.tsx` as the student preparation hub (target company, profile overview, resume upload section).
4. Providing root `/` redirect handling and fallback for unmatched routes.
5. Updating `vite.config.ts` to proxy `/api/v1` to the Spring Boot backend (`http://localhost:8080`).

---

## 2. Decision Point
- **Option A**: Render a static placeholder string or simple single-page component in `App.tsx`.
  - *Short description*: Fixes the blank page quickly, but fails to connect existing auth pages, protected routes, resume upload, or design token showcase.
- **Option B (Recommended)**: Implement complete React Router integration with `AuthProvider`, persistent navigation bar shell, `DashboardPage`, `ProfilePage`, `DesignSystemPage`, and auth redirection.
  - *Why*: Delivers the intended CareerPilot user experience per `docs/07-ux-design-spec.md` and fulfills `FE-BASE-001` Definition of Done without tech debt.

---

## 3. Step-by-Step Instructions
1. Create `careerpilot-frontend/src/components/Navbar.tsx` for persistent application header and auth controls.
2. Create `careerpilot-frontend/src/pages/DashboardPage.tsx` integrating student preparation status, target company link, and resume upload.
3. Update `careerpilot-frontend/src/App.tsx` with `BrowserRouter`, `AuthProvider`, `Navbar`, and routes (`/`, `/login`, `/register`, `/dashboard`, `/profile`, `/design-system`, and catch-all).
4. Update `careerpilot-frontend/vite.config.ts` with API proxy configuration for backend communication.
5. Validate using `pnpm build` and test running dev / preview server.

---

## 4. Definition of Done
- `http://localhost:5173` and `http://localhost:4173` render visible UI without blank screen.
- Routes `/`, `/login`, `/register`, `/dashboard`, `/profile`, and `/design-system` render their respective components.
- Navigation bar provides brand identity and links to all primary platform pages.
- `pnpm build` compiles cleanly with zero TypeScript errors.

