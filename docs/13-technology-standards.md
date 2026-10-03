# 13 — Technology Standards & Governance

This document defines the engineering standards, technology constraints, and documentation-first workflows for CareerPilot. Consult these rules when modifying code, choosing dependencies, designing database schemas, integrating AI, or updating documentation.

---

## Documentation-First File-Reading Workflow

Before writing or modifying any implementation code, follow this conceptual workflow:

```text
REQUEST
 ↓
IDENTIFY TECHNOLOGY
 ↓
READ AGENTS.md
 ↓
READ RELEVANT PROJECT SPEC (docs/)
 ↓
READ 13-technology-standards.md
 ↓
READ EXISTING IMPLEMENTATION
 ↓
READ RELATED TESTS
 ↓
CHECK OFFICIAL DOCUMENTATION
 ↓
CHECK BREAKING/DEPRECATION STATUS
 ↓
PLAN CHANGE
 ↓
IMPLEMENT
 ↓
TEST
 ↓
VALIDATE
 ↓
UPDATE DOCUMENTATION
 ↓
REPORT
```

> **Efficiency Guideline:** Read relevant documentation before implementation. For subsequent lines within the same implementation task, do not repeatedly reread unchanged documentation. If a new package, framework, or API is introduced during the task, repeat the verification process for that technology.

---

## Technology Governance Rules

### RULE 1 — READ BEFORE CODING
Before writing a new line of code related to a framework, library, package, runtime, database, API, infrastructure technology, or integration:
1. Identify which technology/package the code depends on.
2. Read the relevant section of this document and the relevant project specification in `docs/`.
3. Read the existing implementation and tests around the change.
4. Check official documentation when behavior is version-sensitive, APIs are unfamiliar or recently changed, deprecated APIs are involved, or security-sensitive behavior is modified.
5. Do not code from memory when the relevant behavior is version-sensitive.

---

### RULE 2 — RELEVANT FILES MUST BE READ FIRST
Before modifying an existing package or module, read:
- Relevant specification in `docs/`
- Relevant technology-standard section
- Existing implementation files and related tests
- Related configuration and API/data model contracts

Do not modify a file without understanding the surrounding implementation.

---

### RULE 3 — OFFICIAL DOCUMENTATION OVERRIDES MEMORY
If personal model knowledge conflicts with official package documentation, project specifications, or repository implementation, do not guess. Follow this priority:
1. Explicit project decisions
2. Current repository contracts
3. Official technology documentation
4. Official standards
5. General engineering knowledge

When a project decision intentionally differs from a framework recommendation, preserve the project decision unless a concrete issue is identified.

---

### RULE 4 — VERSION AWARENESS
Never assume an API is valid merely because it existed in an older version.
- Verify support in the project's selected version.
- Check deprecation status and migration guidance.
- Avoid preview or snapshot APIs unless explicitly approved.
- Do not introduce APIs from newer major versions than the project uses.

---

### RULE 5 — NO UNPLANNED DEPENDENCIES
Do not add a new dependency merely to solve a small problem.
1. Check whether the existing stack already provides the capability.
2. Check whether the dependency is already installed.
3. Check official maintenance, support status, and runtime compatibility.
4. Check security and license implications.
5. Document the rationale in the plan before adding approved dependencies.

---

### RULE 6 — NO DEPRECATED PATTERNS
Do not introduce deprecated APIs, obsolete configuration, unsupported framework patterns, legacy security configuration, outdated database practices, obsolete Tailwind/React patterns, or deprecated Spring/Hibernate APIs.
- If existing deprecated code is encountered, do not silently rewrite unrelated code.
- Record technical debt and address it only when required by the task or in a dedicated refactor.

---

### RULE 7 — SECURITY-SENSITIVE CODE
For authentication, authorization, passwords, JWTs, file uploads, database access, secrets, AI prompts, external APIs, and sensitive student data:
- Official documentation and `docs/06-security-spec.md` MUST be consulted.
- Never rely solely on memory.

---

### RULE 8 — DATABASE CHANGES
Before modifying entities, relationships, constraints, indexes, migrations, or queries:
- Read `docs/05-data-model.md`, Flyway migration standards, PostgreSQL standards, and JPA/Hibernate guidelines.
- Never use automatic production schema mutation (`ddl-auto=update` is prohibited).

---

### RULE 9 — AI CODE
Before modifying AI-related code:
- Read `docs/08-ai-spec.md` and `docs/09-integrations-spec.md`.
- Keep AI business logic provider-independent (never hard-code OpenRouter/Groq behavior into business services).
- Never treat model output as trusted application state; validate structured AI output before persistence or use.

---

### RULE 10 — UI & DESIGN SYSTEM CODE
Before modifying UI code:
- Read `docs/07-ux-design-spec.md` and use the design system tokens.
- Inspect nearby components to ensure consistency.
- Handle all component states: loading, empty, success, validation, error, and offline/unavailable.
- Do not introduce arbitrary colors, spacing, typography, or interaction patterns.

---

### RULE 11 — TEST WITH THE CHANGE
Every meaningful code change must identify and address test impact:
- Unit, integration/API, database, security, and UI/E2E tests where applicable.
- Do not postpone obvious regression tests indefinitely.

---

### RULE 12 — UPDATE DOCUMENTATION WHEN BEHAVIOR CHANGES
When implementation alters architecture, APIs, data models, security, AI behavior, integration patterns, or deployment conventions:
- Update the authoritative document in `docs/` immediately.
- Do not create duplicate documentation.

---

### RULE 13 — STOP WHEN UNCERTAIN
If the correct implementation cannot be determined from the repository, specifications, standards, or official documentation:
- Do not invent an implementation or guess.
- Mark `[NEEDS_VERIFICATION]` and specify precisely what needs verification.

---

### RULE 14 — VERIFY BEFORE MARKING COMPLETE
A task is never complete simply because code compiles. Verify:
- Functionality and demonstrable behavior
- Tests passing and API contracts preserved
- Database and security integrity
- UI states and accessibility
- Error handling and observability
- Acceptance criteria from the active prompt or plan

