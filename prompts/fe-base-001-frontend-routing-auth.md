# TASK PROMPT: FE-BASE-001 — Frontend Client Routing & AuthContext Setup

**Task ID:** `FE-BASE-001`  
**Phase:** Phase 3 — Frontend Auth & Navigation  
**Target Package:** `careerpilot-frontend/src`  

---

## 1. Goal & Context
`careerpilot-frontend` requires client-side routing, an authentication context provider (`AuthContext`), and protected route guards per `docs/07-ux-design-spec.md`.

This task creates:
- `types/auth.ts` defining user and session state types (`User`, `AuthTokenPayload`).
- `context/AuthContext.tsx` providing `login`, `logout`, `token`, and `currentUser` state.
- `components/ProtectedRoute.tsx` enforcing role-based route guards (`STUDENT`, `STAFF`, `SUPER_ADMIN`).
- `pages/LoginPage.tsx` and `pages/RegisterPage.tsx` initial UI forms.
- `App.tsx` routing setup with `BrowserRouter`, `Routes`, and `Route` components.

---

## 2. Step-by-Step Instructions
1. Create `src/types/auth.ts`.
2. Create `src/context/AuthContext.tsx`.
3. Create `src/components/ProtectedRoute.tsx`.
4. Create placeholder/initial pages `LoginPage.tsx` and `RegisterPage.tsx`.
5. Update `src/App.tsx` to wrap pages in `AuthProvider` and `BrowserRouter`.
6. Run `pnpm build` in `careerpilot-frontend` to verify bundling and type checking.

---

## 3. Definition of Done
- `AuthContext` manages local storage token persistence.
- `ProtectedRoute` redirects unauthorized users to `/login`.
- `App.tsx` renders routes `/login`, `/register`, `/design-system`, `/dashboard`.
- `pnpm build` passes with zero errors.
