# CareerPilot Implementation Plan

**Document:** `12-implementation-plan.md`  
**Status:** Baseline implementation plan  
**Product:** CareerPilot, AI-Powered Placement Preparation Platform  
**Purpose:** Controlled implementation sequence from the existing backend foundation to a validated end-to-end product.

---

## 1. Purpose

This plan converts the approved CareerPilot product, requirements, architecture, API, data, security, UX, AI, integration, testing, and deployment specifications into an implementation sequence.

The plan is deliberately incremental.

It does **not** authorize a rewrite of the existing backend. `AGENTS.md` requires the existing Spring Boot authentication, JWT, roles, PostgreSQL/JPA model, APIs, and business logic to be preserved unless a documented reason and plan justify a change.

The source project defines three roles:

- Student
- Staff/Admin
- Super Admin

and the primary student journey:

```text
Target Company
      ↓
Resume Analysis
      ↓
Skill Gap
      ↓
Learning Roadmap
      ↓
Practice
      ↓
AI Mock Interview
      ↓
Feedback
      ↓
Progress
      ↓
Next Action
```

The original project source explicitly defines authentication, student profile, resume analysis, skill-gap analysis, learning recommendations, mock interviews, progress tracking, staff monitoring, and super-admin management as core modules.

---

# 2. Implementation Principles

### IMP-001 Inspect before modifying

Every implementation task begins with:

```text
Inspect
  ↓
Understand
  ↓
Plan
  ↓
Implement
  ↓
Validate
  ↓
Document
```

This is required by `AGENTS.md`.

### IMP-002 Existing behavior is the compatibility baseline

Existing authentication behavior must be tested before it is extended.

### IMP-003 Specifications precede implementation

A feature is not implemented from a prompt alone.

The relevant:

- requirement
- architecture boundary
- API contract
- data model
- UX behavior
- security rule
- AI behavior
- testing rule

must be understood first.

### IMP-004 Small vertical increments

Prefer a complete, tested vertical slice over building large disconnected layers.

### IMP-005 No speculative infrastructure

Do not introduce microservices, Kubernetes, queues, Redis, event buses, or other infrastructure unless an approved requirement or measured implementation need justifies it.

### IMP-006 AI is an application component, not the source of truth

Deterministic rules remain deterministic.

AI extracts, evaluates, explains, recommends, or generates within the approved AI boundary.

### IMP-007 No silent breaking changes

Any breaking dependency, API, schema, authentication, role, or frontend contract change requires explicit analysis and an ExecPlan.

---

# 3. Current Baseline

The current backend is an established Spring Boot application with:

- authentication controller/service
- registration
- login
- JWT authentication
- role model
- Spring Security
- PostgreSQL/JPA
- protected test endpoint

The source project independently specifies JWT authentication, role-based access, registration/login, refresh token, change password, student features, resume processing, AI modules, learning recommendations, mock interviews, admin dashboard, and super-admin management.

The implementation therefore starts from **existing authentication**, not from an empty application.

Known baseline gaps that must be handled deliberately include:

- missing role-specific authorization rules
- missing refresh-token flow
- missing forgot/reset password
- missing student profile APIs
- missing company/target-company APIs
- missing resume processing
- missing skill-gap APIs
- missing learning-resource APIs
- missing mock-interview APIs
- missing progress APIs
- missing staff APIs
- missing super-admin APIs
- incomplete error contract
- production secret/configuration hardening
- insufficient automated security/API coverage
- production database migration strategy

These are implementation gaps, not reasons to discard the current foundation.

---

# 4. Scope

## In scope

- Backend completion
- Frontend application
- PostgreSQL schema evolution
- Authentication hardening
- Student workflows
- Resume processing
- Skill-gap analysis
- Learning recommendations
- Mock interviews
- Progress tracking
- Staff monitoring
- Super-admin management
- AI integration boundary
- External integrations
- Testing
- Deployment readiness
- Operational validation

## Out of scope unless separately approved

- native mobile applications
- custom foundation model
- microservice rewrite
- Kubernetes platform
- generic chatbot
- black-box placement prediction
- full LMS
- full HRMS
- unrelated social features

---

# 5. Workstream Structure

Implementation is divided into these workstreams:

```text
W0  Repository + toolchain foundation
W1  Backend compatibility + authentication
W2  Database foundation
W3  Frontend foundation + application shell
W4  Student profile + target company
W5  Resume pipeline
W6  Skill-gap analysis
W7  Learning recommendations
W8  Mock interviews
W9  Progress + student dashboard
W10 Staff monitoring
W11 Super Admin
W12 AI hardening + evaluation
W13 Integrations
W14 Security hardening
W15 Testing + regression
W16 Deployment + operations
W17 Release validation
```

Workstreams may overlap only when their contracts are already stable.

---

# 6. Milestone 0: Repository and Toolchain Foundation

## Objective

Make the repository reproducible before feature implementation expands.

## Tasks

- verify repository structure
- verify backend build
- establish frontend application structure
- establish required `skills/` directories
- establish `.agent/PLANS.md`
- verify documentation references
- establish environment templates
- establish safe local configuration
- verify Java/Maven/Node tooling against approved project versions
- establish formatting/lint/build conventions

## Validation

- backend compiles
- backend tests execute
- frontend installs/builds
- no production secrets exist in source control
- documentation paths are consistent

## Exit condition

A new developer can understand and start the project without undocumented machine-specific configuration.

---

# 7. Milestone 1: Backend Compatibility and Authentication

## Objective

Stabilize the existing authentication foundation before adding protected modules.

## Preserve

```text
POST /api/auth/register
POST /api/auth/login
```

Existing role names remain:

```text
STUDENT
STAFF
SUPER_ADMIN
```

The existing login response fields must remain compatible unless an explicit API migration is approved.

## Tasks

### 1.1 Compatibility tests

Add tests for:

- successful registration
- duplicate email
- invalid registration
- successful login
- invalid password
- inactive account
- valid JWT
- invalid JWT
- expired JWT
- protected endpoint

### 1.2 Authorization

Add role-specific authorization only after confirming endpoint ownership.

### 1.3 Refresh tokens

Implement only according to `06-security-spec.md`.

Required:

- refresh session storage
- rotation
- revocation
- reuse detection
- expiry handling

### 1.4 Password lifecycle

Implement:

- change password
- forgot password
- reset password

with secure token lifecycle.

### 1.5 Error contract

Introduce the approved error model without breaking existing legacy responses unexpectedly.

## Risks

- JWT compatibility
- frontend assumptions
- role authorization mistakes
- token invalidation behavior

## Rollback

Keep legacy login operational until the replacement authentication behavior passes compatibility tests.

---

# 8. Milestone 2: Database Foundation

## Objective

Evolve PostgreSQL from the current authentication schema into the CareerPilot domain model.

## Core areas

```text
users
roles
student_profile
companies
skills
student_skills
resumes
resume_analysis
skill_gaps
learning_resources
learning_progress
interviews
interview_questions
interview_answers
interview_evaluations
progress
refresh_sessions
password_reset_tokens
audit_events
```

Exact table names and relationships must follow `05-data-model.md`.

## Tasks

1. inspect existing schema
2. create migration baseline
3. introduce new tables incrementally
4. add foreign keys
5. add indexes based on query needs
6. preserve existing user/role records
7. validate migrations on a clean database
8. validate migrations against an existing database
9. move production schema management away from automatic mutation
10. verify backup/restore procedure

## Critical rule

Never destroy or recreate the existing user/role data merely to simplify implementation.

---

# 9. Milestone 3: Frontend Foundation

## Objective

Create the application shell and design-system foundation before feature pages.

## Tasks

### Application shell

- route structure
- authentication state
- protected routes
- role-aware navigation
- page layout
- responsive structure
- global error handling
- loading patterns

### Design system

Implement semantic tokens from `07-ux-design-spec.md`.

Established CareerPilot palette:

```text
Primary        #00B2DA
Secondary      #2AC0D6
Accent         #4BC3CB
Background     #C2E4F4
Accent Soft    #91D7EC
```

Do not scatter raw colors throughout components.

### Required reusable states

Every data-dependent component must support relevant:

- loading
- empty
- success
- validation error
- server error
- permission denied
- unavailable/offline

## Exit condition

All roles can authenticate and reach their intended application shell.

---

# 10. Milestone 4: Student Profile and Target Company

## Objective

Build the first complete student-owned domain workflow.

## Student data

- personal details
- college
- department
- CGPA
- skills
- target company

These fields are explicitly part of the original student module.

## Flow

```text
Login
  ↓
Dashboard
  ↓
Complete Profile
  ↓
Select Target Company
  ↓
Save
  ↓
Dashboard reflects current state
```

## Validation

- ownership authorization
- input validation
- persistence
- refresh/reload consistency
- empty profile state
- invalid target company
- unauthorized access

---

# 11. Milestone 5: Resume Pipeline

## Objective

Implement the complete resume workflow.

The source defines:

```text
Upload PDF
   ↓
Store Resume
   ↓
Extract Text
   ↓
Save Resume
   ↓
Send to AI
   ↓
Save Analysis
   ↓
Display Report
```

## Tasks

1. validate upload
2. store file privately
3. create resume metadata
4. extract text
5. persist extracted representation
6. invoke approved AI boundary
7. validate AI response
8. persist analysis
9. expose report API
10. display report in UI

## Security

- PDF validation
- file-size limit
- content-type validation
- storage isolation
- authorization
- malware/security scanning where approved
- no public file exposure

## Failure states

The UI must distinguish:

- upload failed
- extraction failed
- analysis failed
- analysis unavailable
- analysis completed

Do not show a fabricated score when analysis fails.

---

# 12. Milestone 6: Skill-Gap Analysis

## Objective

Compare the student's evidence with target-company requirements.

Source flow:

```text
Target Company
      ↓
Required Skills
      ↓
Resume Skills
      ↓
Comparison
      ↓
Missing Skills
      ↓
Suggestions
```

## Tasks

- company requirement representation
- normalized skill representation
- resume-derived skills
- gap calculation
- missing-skill persistence
- explanation/evidence
- student UI

## Important rule

Company requirements must come from an approved data source.

AI must not invent company requirements.

If reliable requirements are unavailable, the system must state that limitation.

---

# 13. Milestone 7: Learning Recommendations

## Objective

Convert verified skill gaps into actionable learning resources.

The source lists:

- YouTube
- NPTEL
- Coursera
- LinkedIn Learning

as recommendation sources.

## Flow

```text
Missing Skill
     ↓
Learning Recommendation
     ↓
Approved Resource
     ↓
Student Action
     ↓
Progress Update
```

## Tasks

- resource model
- provider adapter boundary
- skill/resource mapping
- recommendation generation
- resource display
- completion tracking

## Important rule

A recommendation must not imply that a student completed a course merely because it was recommended.

---

# 14. Milestone 8: AI Mock Interviews

## Objective

Implement the complete interview loop.

Source flow:

```text
Student
   ↓
Company + Difficulty
   ↓
AI Question
   ↓
Student Answer
   ↓
AI Evaluation
   ↓
Score
   ↓
Feedback
```

## Tasks

### Interview setup

- company
- difficulty
- interview type where specified

### Question generation

AI returns validated structured question data.

### Answer submission

Persist the answer with interview ownership.

### Evaluation

AI evaluates against the approved evaluation schema.

### Result

Persist:

- score
- strengths
- weaknesses
- feedback
- provenance/version information

## AI safety

Do not let free-form AI output directly become trusted database state without validation.

---

# 15. Milestone 9: Progress and Student Dashboard

## Objective

Make the product's core preparation loop visible.

Source requirements include:

- resume score
- mock interview scores
- completed skills
- progress graph

## Dashboard should answer

```text
Where am I?
What is missing?
What should I do next?
What have I completed?
How is my interview performance changing?
```

## Tasks

- progress aggregation
- dashboard API
- metric cards
- skill-gap summary
- learning progress
- interview history
- progress visualization
- next-action presentation

## Metric rule

Every metric must have a defined source and calculation.

Do not display an undefined "readiness" number merely because a dashboard needs a metric.

---

# 16. Milestone 10: Staff Monitoring

## Objective

Allow staff to monitor students without violating student privacy boundaries.

Source requirements include:

- view students
- monitor progress
- view resume reports
- view interview scores
- dashboard
- generate reports

## Tasks

- staff dashboard
- student list
- student detail
- progress summaries
- resume reports
- interview reports
- filters/search
- report generation

## Authorization

Staff access must be limited according to the approved ownership/scope rules.

Never assume that every staff account can access every student's private information without an explicit rule.

---

# 17. Milestone 11: Super Admin

## Objective

Implement controlled platform management.

Source requirements include:

- staff accounts
- staff management
- companies
- learning resources
- analytics
- AI configuration

## Tasks

- staff management
- company management
- learning-resource management
- AI configuration management
- administrative audit trail
- analytics

## Security

Super-admin operations require explicit authorization and auditability.

AI configuration changes must be versioned where required by `08-ai-spec.md`.

---

# 18. Milestone 12: AI Hardening and Evaluation

## Objective

Make AI behavior production-safe rather than merely functional.

## AI functions

The source project identifies:

1. Resume Analysis
2. Skill Gap Analysis
3. Learning Recommendation
4. Mock Interview
5. Answer Evaluation

## Implementation requirements

For each function:

```text
Input validation
      ↓
Context assembly
      ↓
AI invocation
      ↓
Structured output validation
      ↓
Business-rule validation
      ↓
Persistence
      ↓
Provenance
      ↓
User presentation
```

## Required controls

- schema validation
- prompt/context versioning
- provider/model metadata
- failure handling
- timeout handling
- bounded retries
- prompt-injection defenses
- privacy controls
- cost/usage controls
- evaluation datasets
- regression evaluation

## Deterministic boundary

Do not replace deterministic application logic with an LLM merely because an LLM can produce an answer.

---

# 19. Milestone 13: External Integrations

## Objective

Connect approved external services without coupling the domain model directly to vendors.

## Integration categories

- AI provider
- learning providers
- object storage
- email/notifications
- approved company/requirement sources

The original source specifies AI provider options and learning-resource providers, but does not finalize a specific production vendor configuration.

## Pattern

```text
CareerPilot Domain
       ↓
Application Adapter
       ↓
Provider API
```

Provider SDK/API details must not leak throughout the domain modules.

---

# 20. Milestone 14: Security Hardening

## Objective

Close the gap between development authentication and production-ready security.

## Tasks

- externalize JWT secret/key
- remove unsafe development defaults
- verify password policy
- implement refresh-token security
- implement reset-token security
- enforce role authorization
- configure CORS explicitly
- validate upload security
- protect private storage
- rate-limit sensitive endpoints
- review logs
- audit sensitive operations
- verify secret handling
- dependency security review

## Validation

Run the security tests defined by `10-testing-spec.md`.

Security changes require an ExecPlan according to `AGENTS.md`.

---

# 21. Milestone 15: Testing and Regression

## Objective

Prove that the platform works as a system.

## Test layers

```text
Unit
  ↓
Component
  ↓
API
  ↓
Database
  ↓
Integration
  ↓
E2E
```

## Critical E2E journeys

### Student

```text
Register
 ↓
Login
 ↓
Complete Profile
 ↓
Select Company
 ↓
Upload Resume
 ↓
Receive Analysis
 ↓
View Skill Gap
 ↓
Open Learning Recommendation
 ↓
Take Mock Interview
 ↓
View Feedback
 ↓
View Progress
```

### Staff

```text
Login
 ↓
Dashboard
 ↓
Student List
 ↓
Student Progress
 ↓
Resume Report
 ↓
Interview Report
```

### Super Admin

```text
Login
 ↓
Manage Staff
 ↓
Manage Companies
 ↓
Manage Resources
 ↓
Review Configuration
```

The testing specification defines these flows as release-critical validation areas.

---

# 22. Milestone 16: Deployment and Operations

## Objective

Make the validated application deployable and recoverable.

Follow `11-deployment-operations.md`.

## Tasks

- environment separation
- production configuration
- secret management
- build artifacts
- database migrations
- health checks
- logging
- monitoring
- backups
- restore test
- rollback procedure
- staging deployment
- smoke tests

No production infrastructure is considered complete merely because the application starts.

---

# 23. Milestone 17: Release Validation

## Objective

Verify the complete product before declaring a release.

## Release gate

```text
Specifications current
        ↓
Code complete
        ↓
Unit tests
        ↓
API/integration tests
        ↓
Database migration tests
        ↓
Security validation
        ↓
AI evaluation
        ↓
Frontend build
        ↓
E2E tests
        ↓
Staging deployment
        ↓
Smoke tests
        ↓
Operational checks
        ↓
Release approval
```

---

# 24. Dependency and Version Policy

Dependency changes are not a routine part of every milestone.

Before any upgrade:

```text
Current version
      ↓
Usage inspection
      ↓
Compatibility assessment
      ↓
Official release notes
      ↓
Migration guidance
      ↓
Affected modules
      ↓
Plan/spec update
      ↓
Tests
      ↓
Upgrade
      ↓
Regression validation
```

`AGENTS.md` explicitly requires this process for potentially breaking changes and prefers LTS/stable supported releases.

Do not upgrade the existing Spring Boot/Java foundation simply to make the project appear newer.

---

# 25. API Implementation Order

The API should grow in dependency order.

## Phase A: Existing compatibility

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/test/protected
```

The existing API baseline is documented in `04-api-spec.yaml`.

## Phase B: Authentication

```text
refresh
change password
forgot password
reset password
logout/revoke
```

## Phase C: Student

```text
profile
target company
skills
dashboard
```

## Phase D: Resume

```text
upload
status
analysis
report
```

## Phase E: Skill Gap

```text
gap
missing skills
recommendations
```

## Phase F: Learning

```text
resources
recommendations
progress
```

## Phase G: Interview

```text
create session
question
answer
evaluation
results
history
```

## Phase H: Staff

```text
students
student detail
progress
reports
dashboard
```

## Phase I: Super Admin

```text
staff
companies
resources
AI configuration
analytics
```

Exact final paths must follow `04-api-spec.yaml` and must not be invented independently by frontend implementation.

---

# 26. Data Implementation Order

```text
Existing users/roles
       ↓
Student profile
       ↓
Companies
       ↓
Skills
       ↓
Resumes
       ↓
Resume analysis
       ↓
Skill gaps
       ↓
Learning resources
       ↓
Learning progress
       ↓
Interviews
       ↓
Interview evaluation
       ↓
Progress aggregation
       ↓
Staff/admin reporting
       ↓
Audit/operational data
```

Each migration must preserve valid existing records.

---

# 27. Frontend Implementation Order

```text
Application shell
      ↓
Authentication
      ↓
Role routing
      ↓
Student dashboard
      ↓
Profile
      ↓
Target company
      ↓
Resume
      ↓
Skill gap
      ↓
Learning
      ↓
Mock interview
      ↓
Progress
      ↓
Staff
      ↓
Super Admin
```

Build shared components only when at least two real consumers justify them.

Do not create a large design-system abstraction before actual UI requirements are known.

---

# 28. UX Implementation Rule

Every page must be implemented from `07-ux-design-spec.md`.

Before coding a page, define:

- purpose
- user
- entry points
- primary action
- secondary actions
- information hierarchy
- loading state
- empty state
- success state
- validation state
- error state
- permission state
- responsive behavior
- keyboard behavior
- motion
- accessibility
- destructive-action behavior

If any of these materially change, update the UX specification first.

---

# 29. AI Implementation Rule

AI implementation must follow:

```text
Repository context
      ↓
Approved specification
      ↓
Runtime data
      ↓
Structured prompt/context
      ↓
AI
      ↓
Schema validation
      ↓
Business validation
      ↓
Persist
      ↓
Explain to user
```

AI coding agents working on CareerPilot must use repository `AGENTS.md`, relevant specifications, and relevant `skills/` instead of inventing project context from general model knowledge.

---

# 30. Feature Completion Template

Every feature implementation should record:

### Feature

Name and requirement IDs.

### Current behavior

What exists before the change.

### Desired behavior

What the specification requires.

### Affected areas

- backend
- frontend
- database
- API
- security
- AI
- integrations
- tests

### Breaking-change analysis

- none
- compatible extension
- migration required
- breaking

### Validation

Exact tests/commands used.

### Documentation

Which source-of-truth documents changed.

---

# 31. ExecPlan Trigger Rules

Create an ExecPlan before:

- architecture changes
- database migrations
- authentication changes
- authorization changes
- JWT changes
- dependency upgrades
- breaking API changes
- shared UI architecture changes
- AI provider changes
- storage-provider changes
- production infrastructure changes
- multi-module refactors
- security-sensitive changes

Small isolated fixes may proceed without a separate plan only when they are clearly low-risk and contained.

This follows `AGENTS.md`.

---

# 32. Migration and Rollback Strategy

Every material change must identify:

### Migration

How current state becomes desired state.

### Compatibility

Whether old clients/data continue working.

### Rollback

How the application or data can be restored if deployment fails.

### Validation

How correctness is proven after migration.

For database changes, prefer backward-compatible expand-and-contract migrations where needed.

Never assume that an application rollback is safe after an irreversible database migration.

---

# 33. Risks

| Risk | Control |
|---|---|
| Breaking existing login | Compatibility tests before/after auth changes |
| JWT incompatibility | Explicit token migration/rotation strategy |
| Data loss | Controlled migrations and tested backups |
| AI hallucination | Structured outputs, validation, provenance |
| Fake company requirements | Approved requirement sources |
| Sensitive resume exposure | Private storage and authorization |
| Incorrect staff access | Explicit resource-scope authorization |
| AI provider outage | Failure state and provider boundary |
| External API changes | Adapter + integration tests |
| Dependency breakage | Version review + migration testing |
| UI/backend mismatch | API-first contract validation |
| Undefined scores | Explicit metric definitions |
| Deployment failure | Staging, smoke tests, rollback |
| Documentation drift | Update source-of-truth documents with behavior changes |

---

# 34. Acceptance Criteria

CareerPilot is implementation-complete for the approved scope only when:

### Product

- [ ] Student can complete the core preparation journey.
- [ ] Staff can monitor permitted student progress.
- [ ] Super Admin can manage approved platform resources.

### Backend

- [ ] Existing authentication compatibility is preserved.
- [ ] Required APIs are implemented.
- [ ] Authorization is enforced.
- [ ] Errors follow the approved contract.
- [ ] Database migrations are controlled.

### Frontend

- [ ] Required role-based routes work.
- [ ] UX specification is implemented.
- [ ] Responsive behavior is validated.
- [ ] accessibility requirements are addressed.
- [ ] all relevant states are implemented.

### AI

- [ ] AI functions follow the approved boundary.
- [ ] outputs are validated.
- [ ] provenance is retained.
- [ ] failures are handled.
- [ ] AI regression evaluation passes.

### Security

- [ ] secrets are externalized
- [ ] authentication tests pass
- [ ] authorization tests pass
- [ ] file security is validated
- [ ] sensitive data is protected

### Operations

- [ ] staging deployment works
- [ ] production configuration is defined
- [ ] backup/restore is tested
- [ ] monitoring exists
- [ ] rollback/recovery is documented

### Quality

- [ ] unit tests pass
- [ ] API/integration tests pass
- [ ] database tests pass
- [ ] frontend checks pass
- [ ] critical E2E flows pass
- [ ] no known critical regression remains

---

# 35. Final Delivery Sequence

The recommended implementation sequence is:

```text
1. Repository + toolchain
        ↓
2. Authentication compatibility
        ↓
3. Database foundation
        ↓
4. Frontend shell
        ↓
5. Student profile + target company
        ↓
6. Resume pipeline
        ↓
7. Skill-gap analysis
        ↓
8. Learning recommendations
        ↓
9. AI mock interviews
        ↓
10. Progress/dashboard
        ↓
11. Staff monitoring
        ↓
12. Super Admin
        ↓
13. AI hardening/evaluation
        ↓
14. Integrations
        ↓
15. Security hardening
        ↓
16. Full regression
        ↓
17. Staging deployment
        ↓
18. Release validation
```

This order follows the product's dependency graph and avoids building dashboards around data that does not yet exist.

---

# 36. Definition of Done

A milestone is complete only when:

- required behavior is implemented
- existing contracts are preserved or explicitly migrated
- relevant tests pass
- security implications are validated
- UX states are implemented
- database changes are migrated safely
- AI outputs are validated where applicable
- external failures are handled
- documentation is updated
- no unnecessary dependency/infrastructure was introduced
- the associated acceptance criteria are satisfied

Compilation alone is not completion.

---

# 37. Plan Maintenance

This document is a living implementation plan.

Update it when:

- a milestone changes
- an architectural decision changes
- an API contract changes
- a database migration changes scope
- a dependency decision changes
- a security decision changes
- an implementation discovery invalidates an assumption
- a milestone is completed

Completed work should be marked with:

- implementation status
- validation result
- relevant commit/release reference where the project uses one
- unresolved follow-up, if any

The plan must remain aligned with the specifications and actual repository behavior.

---

## Final Principle

CareerPilot should be implemented as a sequence of **small, validated, production-relevant vertical slices**.

The guiding rule remains:

> **Inspect → Understand → Plan → Implement → Validate → Document**

The goal is not to produce the largest codebase.

The goal is to produce the smallest correct system that fully implements the approved CareerPilot product, preserves existing behavior, protects student data, keeps AI bounded and explainable, and can be operated reliably.
