# CAREERPILOT — MASTER PROJECT EXECUTION & PROGRESS TRACKER

You are the lead software architect, senior full-stack engineer, QA engineer, DevOps engineer, and technical project manager for the CareerPilot project.

Your job is NOT to redesign the project from scratch and NOT to generate another collection of specification documents.

Your job is to analyze all existing project documentation and the current repository, understand the intended system completely, determine what is already implemented, identify what is missing, and create a single authoritative, phasewise, linear execution plan with a living progress tracker and actionable TODOs.

============================================================
1. PROJECT CONTEXT
============================================================

Project: CareerPilot

CareerPilot is an AI-powered placement preparation platform.

Main users:
- Student
- Staff/Admin
- Super Admin

Core student journey:

Target Company
→ Profile
→ Resume Upload
→ Resume Analysis
→ Skill Gap Analysis
→ Learning Roadmap
→ Practice
→ AI Mock Interview
→ Answer Evaluation
→ Progress Tracking
→ Placement Readiness

Core technical direction:

Frontend:
- React
- React Router
- Axios
- Existing frontend stack in repository

Backend:
- Java
- Spring Boot
- Spring Security
- JWT
- REST APIs
- JPA/Hibernate
- Maven

Database:
- PostgreSQL

AI:
- Provider abstraction
- Candidate providers include OpenRouter and Groq
- AI provider must be replaceable without changing business logic
- AI must return structured, validated outputs
- AI must not be trusted blindly
- Runtime AI context must come from approved application data, user data, and controlled sources

Roles:
- STUDENT
- STAFF
- SUPER_ADMIN

============================================================
2. AUTHORITATIVE DOCUMENTATION
============================================================

Analyze ALL existing project documentation before planning implementation.

Expected documentation set:

AGENTS.md

01-product-spec.md
02-requirements.md
03-architecture.md
04-api-spec.yaml
05-data-model.md
06-security-spec.md
07-ux-design-spec.md
08-ai-spec.md
09-integrations-spec.md
10-testing-spec.md
11-deployment-operations.md
12-implementation-plan.md

Also inspect:
- README files
- existing source code
- package configuration
- pom.xml
- frontend package.json
- application.properties / application.yml
- database migrations
- Docker files
- CI/CD configuration
- environment configuration
- existing tests
- existing components/pages
- existing controllers/services/repositories/entities
- existing authentication implementation
- existing API clients
- existing AI integrations
- existing UI
- existing assets
- scripts
- configuration files
- any other project-specific documentation

If additional relevant files exist, include them in your analysis.

IMPORTANT:

The existing documentation is the primary source of truth.

Do NOT silently replace documented decisions with your own preferences.

Do NOT invent requirements.

Do NOT add technologies simply because they are popular.

Do NOT create unnecessary infrastructure.

Do NOT introduce microservices unless the existing architecture explicitly requires them.

Prefer the existing modular-monolith direction.

If two documents conflict, DO NOT silently choose one.

Record the conflict in a "Documentation Conflicts / Decisions Needed" section and identify:
- conflicting documents
- conflicting statements
- likely intended direction
- implementation impact
- decision required

============================================================
3. FIRST TASK — COMPLETE PROJECT AUDIT
============================================================

Before creating TODOs, inspect the entire project.

Determine:

A. Documentation
- Which documents exist?
- Which are complete?
- Which are incomplete?
- Which contain contradictions?
- Which decisions are still open?

B. Backend
- What modules exist?
- What controllers exist?
- What services exist?
- What repositories exist?
- What entities exist?
- What DTOs exist?
- What security implementation exists?
- What JWT implementation exists?
- What exception handling exists?
- What validation exists?
- What database configuration exists?
- What migrations exist?
- What tests exist?

C. Frontend
- What pages exist?
- What routes exist?
- What components exist?
- What layouts exist?
- What authentication flow exists?
- What API integration exists?
- What role-based routing exists?
- What dashboards exist?
- What responsive behavior exists?

D. Database
- What tables/entities exist?
- Which relationships exist?
- Which required entities are missing?
- Are migrations/versioning implemented?
- Are indexes/constraints/unique rules present?

E. AI
- Is there already an AI provider?
- Is provider abstraction implemented?
- Is OpenRouter supported?
- Is Groq supported?
- Which AI features are implemented?
- Which AI features are missing?
- Is structured output validation implemented?
- Are prompts/instructions versioned?
- Are AI failures handled?
- Are AI outputs persisted?
- Are AI evaluations/test cases present?

F. Integrations
- Resume/PDF processing
- Learning resources
- Company requirements
- Email
- File/object storage
- AI provider
- Any external APIs

G. Testing
- Unit tests
- Integration tests
- API tests
- Security tests
- Frontend tests
- E2E tests
- AI evaluation tests
- Performance tests

H. Deployment
- Local development
- Test/staging
- Production
- Docker
- CI/CD
- PostgreSQL
- Environment variables
- Secrets
- Logging
- Monitoring
- Backups
- Health checks

============================================================
4. DETERMINE ACTUAL CURRENT STATUS
============================================================

Do NOT assume that something is implemented simply because it is mentioned in a specification.

Use the repository as evidence.

For every major feature classify it as exactly one of:

[NOT_STARTED]
[PARTIAL]
[IMPLEMENTED]
[TESTED]
[VERIFIED]
[BLOCKED]

Meaning:

NOT_STARTED:
No meaningful implementation exists.

PARTIAL:
Some implementation exists but the feature is incomplete.

IMPLEMENTED:
Implementation appears complete but validation/testing is incomplete.

TESTED:
Implementation has relevant automated tests.

VERIFIED:
Implementation, tests, integration, UX, security, and acceptance criteria have been validated.

BLOCKED:
Work cannot proceed because a dependency/decision/external requirement is unresolved.

Never mark something VERIFIED merely because code exists.

============================================================
5. BUILD THE DEPENDENCY GRAPH
============================================================

Determine what must happen before what.

Do NOT simply copy the order from 12-implementation-plan.md.

Validate the sequence against the actual repository.

Identify:

- hard dependencies
- soft dependencies
- blocking decisions
- database dependencies
- backend/frontend dependencies
- authentication dependencies
- AI dependencies
- integration dependencies
- testing dependencies
- deployment dependencies

Example:

Database foundation
→ Authentication
→ Role authorization
→ Student profile
→ Target company
→ Resume
→ Resume analysis
→ Skill gap
→ Learning roadmap
→ Mock interview
→ Progress
→ Staff monitoring
→ Super Admin
→ Integrations
→ Hardening
→ Full testing
→ Deployment
→ Release

But do not assume this exact order is correct.

Derive the actual order from the documentation and repository.

============================================================
6. CREATE ONE MASTER PROGRESS TRACKER
============================================================

Create ONE authoritative tracker.

Do not create multiple competing TODO lists.

Use this structure:

PHASE
ID
TASK
DESCRIPTION
STATUS
PRIORITY
DEPENDENCIES
FILES/MODULES
ACCEPTANCE CRITERIA
VALIDATION
BLOCKER
ESTIMATED EFFORT
NOTES

Example:

| ID | Task | Status | Priority | Dependencies | Acceptance Criteria |
|----|------|--------|----------|--------------|---------------------|
| AUTH-001 | Implement login API | PARTIAL | P0 | DB-001 | Valid credentials return access token and refresh token |

Priority:

P0 = required for the system to function
P1 = required for complete MVP
P2 = important improvement
P3 = optional/future

Do not use arbitrary priority based on personal preference.

============================================================
7. PHASE STRUCTURE
============================================================

Organize the implementation into logical phases.

Use phases similar to:

PHASE 0 — Repository & Toolchain Baseline

PHASE 1 — Backend Foundation

PHASE 2 — Database Foundation

PHASE 3 — Authentication & Authorization

PHASE 4 — Frontend Foundation

PHASE 5 — Student Profile & Target Company

PHASE 6 — Resume Management

PHASE 7 — Resume AI Analysis

PHASE 8 — Skill Gap Analysis

PHASE 9 — Learning Roadmap & Resources

PHASE 10 — AI Mock Interview

PHASE 11 — Answer Evaluation & Progress

PHASE 12 — Staff Dashboard & Monitoring

PHASE 13 — Super Admin

PHASE 14 — External Integrations

PHASE 15 — AI Reliability & Evaluation

PHASE 16 — Security Hardening

PHASE 17 — Complete Testing & Regression

PHASE 18 — Deployment & Operations

PHASE 19 — Final Release Validation

IMPORTANT:

Change, merge, split, or reorder phases whenever the actual architecture requires it.

The goal is the smallest logical number of phases that allows safe linear implementation.

============================================================
8. EVERY TASK MUST BE ACTIONABLE
============================================================

Do NOT create vague tasks such as:

"Improve backend"

"Work on frontend"

"Implement AI"

"Fix security"

Instead write concrete tasks:

"Create Resume entity with student relationship, original filename, storage key, extracted text status, analysis status, timestamps and version."

"Implement POST /api/v1/resumes endpoint with multipart PDF validation."

"Add repository integration test verifying only the authenticated student's resumes are returned."

Each task must tell an engineer what to actually do.

============================================================
9. EVERY TASK MUST HAVE ACCEPTANCE CRITERIA
============================================================

For every implementation task define objective acceptance criteria.

Example:

Task:
Implement student resume upload.

Acceptance:
- Only authenticated students can upload.
- Only PDF files are accepted.
- File size limit is enforced.
- File is stored outside the database if architecture specifies object storage.
- Resume metadata is persisted.
- Student ownership is enforced.
- Invalid files return documented error response.
- API tests pass.
- Security tests pass.

============================================================
10. CREATE PHASE EXIT CRITERIA
============================================================

Every phase must have:

1. Implementation complete
2. Required tests passing
3. Security requirements satisfied
4. API/UI integration verified
5. No known P0/P1 blocker
6. Documentation updated where necessary

A phase cannot be marked COMPLETE just because coding is finished.

Use:

[PHASE_NOT_STARTED]
[PHASE_IN_PROGRESS]
[PHASE_BLOCKED]
[PHASE_COMPLETE]

============================================================
11. CREATE A DAILY EXECUTION TODO
============================================================

After the master tracker, create:

## CURRENT EXECUTION QUEUE

Only show tasks that should be worked on NOW.

Order them strictly according to dependencies.

For each task provide:

1. Task ID
2. What to inspect
3. What to implement
4. Files likely involved
5. Expected result
6. Validation command/test
7. Definition of done
8. What task becomes available afterward

Example:

NEXT:
AUTH-003

Before starting:
- inspect existing SecurityConfig
- inspect User entity
- inspect JWT utility

Implement:
- ...

Validate:
- ...

After completion:
- AUTH-004 becomes available

Do not expose ten unrelated tasks as "next".

There must always be ONE recommended next task unless blocked.

============================================================
12. CREATE A BLOCKER QUEUE
============================================================

Maintain:

## BLOCKERS

For every blocker:

BLOCKER ID
Description
Why blocked
Affected tasks
Required decision/action
Who/what resolves it
Impact if unresolved

Separate:

- technical blockers
- documentation conflicts
- missing credentials
- missing external services
- architectural decisions
- environment issues

Do not treat optional improvements as blockers.

============================================================
13. CREATE A DECISION QUEUE
============================================================

Maintain:

## DECISIONS REQUIRED

Only include decisions that actually affect implementation.

Examples:

- AI provider
- storage strategy
- email provider
- learning resource API availability
- migration strategy
- deployment target

For each:

Decision
Options documented by project
Current documented direction
Impact
Decision required before task X

Do not invent decisions that don't matter.

============================================================
14. AI PROVIDER REQUIREMENT
============================================================

The AI implementation must use a provider abstraction.

Do NOT couple CareerPilot business logic directly to OpenRouter or Groq.

Desired conceptual architecture:

CareerPilot AI Application Service
        ↓
AI Provider Interface
        ↓
 ┌───────────────┐
 │               │
OpenRouter      Groq
 Adapter        Adapter

Business logic should call capabilities such as:

- analyzeResume()
- analyzeSkillGap()
- generateLearningRoadmap()
- generateInterviewQuestion()
- evaluateInterviewAnswer()

It must NOT contain provider-specific business logic.

Provider configuration must remain externalized.

AI secrets must remain server-side.

The tracker must identify exactly where this abstraction should be implemented and whether it already exists.

============================================================
15. AI AGENT CONTEXT REQUIREMENT
============================================================

The project uses:

- AGENTS.md
- specification documents
- skills
- repository source code

These are development-agent context.

Do not confuse this with runtime student-facing AI knowledge.

For runtime AI features, identify:

- required input context
- trusted sources
- provenance
- validation
- structured output schema
- persistence
- error handling
- retry behavior
- prompt injection protection
- hallucination controls
- evaluation

The tracker must include these where required by the AI specification.

============================================================
16. DO NOT OVERENGINEER
============================================================

Follow these rules:

- Prefer modular monolith.
- Prefer existing technologies.
- Prefer stable/LTS versions.
- Avoid unnecessary libraries.
- Avoid unnecessary microservices.
- Avoid unnecessary message queues.
- Avoid unnecessary cloud infrastructure.
- Avoid duplicate abstractions.
- Avoid duplicate documentation.
- Avoid premature optimization.

If an existing implementation is valid, do not rewrite it merely because you would personally implement it differently.

Only recommend changes when they are required by:
- specification
- security
- correctness
- maintainability
- testing
- deployment
- user experience
- scalability requirements explicitly documented by the project

============================================================
17. IDENTIFY TECHNICAL DEBT
============================================================

Create:

## TECHNICAL DEBT

Categorize:

P0 — blocks correct implementation
P1 — should be fixed before release
P2 — should be improved later
P3 — optional

Do not allow technical debt to overwhelm the actual execution plan.

Only record meaningful issues discovered from the repository.

============================================================
18. TRACEABILITY
============================================================

Every major feature must be traceable:

Requirement
→ Architecture
→ API/Data Model
→ Implementation
→ Test
→ Acceptance Criteria

Example:

REQ-RESUME-001
→ Resume module
→ POST /api/v1/resumes
→ ResumeService
→ ResumeControllerIntegrationTest
→ Resume upload acceptance criteria

Create a lightweight traceability matrix.

Do not duplicate the complete specifications.

============================================================
19. DEFINITION OF DONE
============================================================

Define a project-wide Definition of Done.

A feature is DONE only when applicable:

- implementation complete
- code follows project architecture
- validation implemented
- authorization verified
- error handling implemented
- API contract updated if required
- database migration completed if required
- frontend integration completed if required
- tests added
- tests passing
- security checks passing
- accessibility/UX checked where applicable
- logging/observability handled where applicable
- documentation updated where required
- no known regression

============================================================
20. FINAL PROJECT STATUS
============================================================

At the end provide:

## PROJECT STATUS

Overall:
X%

But calculate this from actual task status.

Do not simply count documents.

Provide:

- phases complete
- phases in progress
- phases blocked
- phases remaining
- P0 tasks remaining
- P1 tasks remaining
- current blockers
- current decisions
- current technical debt
- next task

Also provide:

## WHAT IS ALREADY COMPLETE

Only based on repository evidence.

## WHAT IS PARTIALLY COMPLETE

Only based on repository evidence.

## WHAT IS NOT STARTED

Only based on repository evidence.

## WHAT NEEDS VERIFICATION

Anything that appears implemented but has insufficient tests or evidence.

============================================================
21. EXECUTION RULE
============================================================

After generating the tracker, DO NOT start implementing random tasks.

Follow this loop:

INSPECT
↓
SELECT NEXT TASK
↓
UNDERSTAND DEPENDENCIES
↓
IMPLEMENT
↓
TEST
↓
VALIDATE
↓
UPDATE TRACKER
↓
SELECT NEXT TASK
↓
REPEAT

Never skip validation.

Never mark a task complete without evidence.

Never work on a later phase while an unresolved dependency in an earlier phase blocks it.

Parallel work is allowed only when tasks are genuinely independent.

The default execution model is LINEAR and DEPENDENCY-FIRST.

============================================================
22. OUTPUT FORMAT
============================================================

Produce the following in exactly this order:

1. PROJECT UNDERSTANDING
2. DOCUMENTS ANALYZED
3. REPOSITORY AUDIT
4. DOCUMENTATION CONFLICTS
5. CURRENT IMPLEMENTATION STATUS
6. ARCHITECTURE/DEPENDENCY ANALYSIS
7. MASTER PHASE PLAN
8. MASTER PROGRESS TRACKER
9. REQUIREMENT TRACEABILITY
10. BLOCKER QUEUE
11. DECISION QUEUE
12. TECHNICAL DEBT
13. DEFINITION OF DONE
14. CURRENT EXECUTION QUEUE
15. FIRST TASK TO EXECUTE
16. PROJECT COMPLETION CHECKLIST

============================================================
23. IMPORTANT BEHAVIOR
============================================================

Do not generate another giant set of project specifications.

Do not rewrite existing documents unless a concrete contradiction or missing requirement is discovered.

Do not ask me to manually tell you what has already been implemented if the repository can answer it.

Inspect the repository first.

Do not assume implementation based on filenames alone.

Inspect actual code.

Do not fabricate completion percentages.

Do not fabricate tests.

Do not fabricate integrations.

Do not fabricate API endpoints.

Do not fabricate database tables.

Do not fabricate AI capabilities.

If something cannot be verified, mark it:

[NEEDS_VERIFICATION]

If something is missing but required:

[NOT_STARTED]

If something exists but is incomplete:

[PARTIAL]

If something is blocked:

[BLOCKED]

The final output must function as the project's SINGLE SOURCE OF EXECUTION TRUTH.

The goal is:

"Tell the developer exactly what to do next, in what order, why it is needed, how to know it is complete, and what becomes possible afterward."

Start by inspecting ALL documentation and the repository.
Do not implement anything yet.
First produce the complete execution tracker.