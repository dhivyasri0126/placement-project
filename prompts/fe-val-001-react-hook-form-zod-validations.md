# TASK PROMPT: FE-VAL-001 — Implement Zod Validations & Inline React Hook Form Architecture

**Task ID:** `FE-VAL-001`  
**Phase:** Phase 3 / Phase 4 — Frontend Core & Form Infrastructure  
**Target Package:** `careerpilot-frontend/src`  

---

## 1. Goal & Context
Currently, frontend forms (`LoginPage`, `RegisterPage`, `ProfilePage`, `ResumeUpload`) rely on raw React state (`useState`) and native browser HTML5 validation attributes (such as `required`, `minLength`). This produces inconsistent browser-dependent error popups, lacks fine-grained schema enforcement matching backend DTO constraints, and fails to provide accessible inline error feedback.

This task establishes an enterprise-grade form validation architecture for all current and future screens using:
1. `zod` for declarative, type-safe schemas aligned with backend contracts.
2. `react-hook-form` paired with `@hookform/resolvers/zod` for high-performance form state management.
3. Accessible inline error displays and field wrappers with design-token-compliant error styling.
4. Strict removal of native `required` and `minLength` HTML attributes to ensure non-intrusive, inline Zod validation and full accessibility (`aria-invalid`, `aria-describedby`).
5. Extensible schema foundation under `src/validations/` covering Auth, Student Profile, Resume Upload, and Company management.

---

## 2. Decision Point
- **Option A**: Implement ad-hoc Zod schemas and manual error checking inside each component's `onSubmit` handler without React Hook Form or shared form primitives.
  - *Short description*: Minimal changes to existing state hooks, but repetitive boilerplate, no reactive inline validation state, inconsistent error UX, and high maintenance overhead for future forms.
- **Option B (Recommended)**: Adopt `react-hook-form` + `@hookform/resolvers/zod` with a centralized `src/validations/` schema library and accessible reusable form UI components (`FormField`, `Input`, `Select`, `Textarea`).
  - *Why*: Provides instant inline validation (`onTouched`), guarantees zero native browser tooltip popups (no native `required`), standardizes error rendering across all forms, aligns automatically with design tokens (`--input-border-error`), and equips future pages (mock interview, company management, learning plans) with plug-and-play validation.

---

## 3. Step-by-Step Instructions
1. Install `zod`, `react-hook-form`, and `@hookform/resolvers` into `careerpilot-frontend`.
2. Create schema definitions under `careerpilot-frontend/src/validations/`:
   - `auth.schema.ts` (`loginSchema`, `registerSchema`)
   - `profile.schema.ts` (`profileSchema`)
   - `resume.schema.ts` (`resumeUploadSchema`)
   - `company.schema.ts` (`companySchema` for future company management)
   - `index.ts` (centralized exports)
3. Create reusable accessible form controls under `careerpilot-frontend/src/components/ui/`:
   - `FormField.tsx` providing label, visual required indicator `*` (no native `required`), inline error message (`role="alert"`), and helper text.
   - Standardized input, select, and textarea styling bound to tokens.
4. Refactor existing forms with `useForm` + `zodResolver`:
   - `LoginPage.tsx`: email & password fields with inline validation on blur/touch, no native `required`.
   - `RegisterPage.tsx`: name, email, password, and role fields with inline errors, min-length enforcement, no native `required`.
   - `ProfilePage.tsx`: student target company, college, department, cgpa, graduation year, phone, bio with inline errors, no native `required`.
   - `ResumeUpload.tsx`: file validation (PDF type, size <= 5MB) via Zod/React Hook Form, no native `required`.
5. Validate using `pnpm run lint` and `pnpm run build`.

---

## 4. Definition of Done
- `zod`, `react-hook-form`, and `@hookform/resolvers` installed and configured.
- Centralized validation schemas in `src/validations/` with exported Zod types.
- All forms (`LoginPage`, `RegisterPage`, `ProfilePage`, `ResumeUpload`) use React Hook Form + Zod resolver.
- Zero native `required` attributes present on validated form inputs.
- Inline validation errors display beneath inputs with `--input-border-error` styling.
- `pnpm run lint` passes without errors.
- `pnpm run build` compiles cleanly with zero TypeScript errors.
