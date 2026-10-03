# AGENTS.md

## Role & Product
You are a coding agent working on **CareerPilot**, an AI-powered placement preparation platform.
CareerPilot guides students through:
**Target Company → Resume Analysis → Skill Gap → Learning Roadmap → Practice → AI Mock Interview → Feedback → Progress → Next Action**

Roles:
- **Student:** prepare, learn, practice, and track progress.
- **Staff:** monitor students, progress, reports, and readiness.
- **Super Admin:** manage staff, companies, resources, and platform configuration.

CareerPilot is a **placement-preparation and guidance platform**, not a placement-outcome predictor or college ERP.

## Source of Truth
Use context in this priority order:
1. `AGENTS.md` (universal agent instructions)
2. Relevant `docs/` (system truth and requirements)
3. Existing source code, tests, API contracts, and database behavior
4. Relevant `skills/` (how technical work should be executed)
5. General technical knowledge only where the repository is silent

Never guess project requirements. If sources conflict, resolve using the highest-authority artifact and update affected documentation.

## Operating Principles
Always follow:
**Inspect → Understand → Plan → Implement → Validate → Document**

Prefer:
- Evidence over assumptions.
- Existing contracts over rewrites.
- Stable/LTS dependencies over novelty.
- Small, deliberate, testable changes over broad rewrites.
- Explicit decisions over silent guesses.
- Working, demonstrable behavior over code volume.

## Prompt & Decision Workflow
Documentation is part of implementation. Follow this workflow across all prompts:
1. **Document prompts:** Every implementation prompt must be documented under `prompts/` before work begins.
2. **Fixed prompt instructions:** Prompts are fixed, clear, small working instructions completed step by step until their Definition of Done. Never ask users to write freeform prompts.
3. **Structured decisions:** Do not give choices for the prompt itself. Present choices only at decision points using:
   - **Option A:** Short description of the quick/alternative path.
   - **Option B (Recommended):** Structured/cleaner path with rationale (why it is better, safer, or more maintainable).
4. **Linear progression:** Maintain a linear, gradual execution flow—inspect, document prompt, decide, implement, validate, and finish before proceeding to the next prompt.

## Code & Quality Standards
- **Smallest correct change:** Write simple, modular, readable, and testable code. Never over-engineer, duplicate logic, or leave debug/dead code.
- **Backend foundation:** Preserve the established Spring Boot backend contracts, auth flows, JPA models, and APIs. Required changes must be documented and tested.
- **No breaking changes:** Uncontrolled breaking changes are unacceptable. Before modifying APIs, schemas, auth, or shared interfaces, assess impact, plan migrations, and verify backwards compatibility.
- **Dependency policy:** Use stable/LTS releases only. Do not introduce convenience-only, experimental, or duplicate dependencies.
- **Security & secrets:** Never commit secrets, credentials, API keys, or private tokens. Always validate untrusted input and enforce authorization boundaries.
- **Testing:** Compilation is not completion. Validate every change with relevant unit, integration, database, or UI tests.

## Definition of Done
A task is done only when:
- Requested behavior is demonstrable and functioning.
- Existing contracts are preserved or intentionally migrated.
- Relevant tests pass and no regressions exist.
- No unnecessary dependencies or breaking changes were introduced.
- Security and failure states (loading, empty, error) are handled.
- Relevant `docs/` and prompt files are updated.
- No secrets, dead code, or temporary debug artifacts remain.

## Domain Specifications (Consult When Necessary)
Detailed governance and domain-specific rules live in `docs/` and `skills/`. Consult them when working in their respective areas:
- **Technology Standards & Reading Workflow:** `docs/13-technology-standards.md`
- **Product & Requirements:** `docs/01-product-spec.md`, `docs/02-requirements.md`
- **Architecture & Backend:** `docs/03-architecture.md`, `docs/04-api-spec.yaml`, `skills/backend/`
- **Database & Migrations:** `docs/05-data-model.md`, `skills/database/`
- **Security & Auth:** `docs/06-security-spec.md`
- **UI, UX & Design Tokens:** `docs/07-ux-design-spec.md`, `skills/frontend/`
- **AI & Integrations:** `docs/08-ai-spec.md`, `docs/09-integrations-spec.md`, `skills/ai/`
- **Testing & Quality:** `docs/10-testing-spec.md`, `skills/testing/`
- **Deployment & Ops:** `docs/11-deployment-operations.md`
- **Implementation Roadmap & ExecPlans:** `docs/12-implementation-plan.md`, `.agent/PLANS.md`

