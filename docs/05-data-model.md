# CareerPilot Data Model Specification

**Document ID:** CP-DOC-05  
**Status:** Baseline  
**Version:** 1.0  
**Scope:** PostgreSQL logical and physical data model for CareerPilot  
**Depends on:** `01-product-spec.md`, `02-requirements.md`, `03-architecture.md`, `04-api-spec.yaml`, existing backend/database behavior

---

## 1. Purpose

This document defines the database model for CareerPilot and establishes the rules for:

- domain entities and relationships
- data ownership and lifecycle
- keys, constraints, and indexes
- authentication/security data
- AI-generated data and provenance
- migration and compatibility strategy
- authorization and Row-Level Security boundaries

PostgreSQL is the system of record for application data. File contents such as uploaded resumes are stored in object storage; PostgreSQL stores their metadata, ownership, processing state, and references.

This document is a **target design and compatibility guide**. It does not authorize destructive database changes by itself.

---

## 2. Source and Compatibility Baseline

The original project specification defines `users` and `roles` for authentication and the Student, Staff/Admin, and Super Admin roles. It also defines student profile, resume, skill gap, learning, mock interview, progress, and administration capabilities. These are retained as the domain basis here.

The current backend is an established Spring Boot + JPA + PostgreSQL implementation. Existing authentication data and contracts must be preserved unless a migration is explicitly planned and validated.

### Existing compatibility invariants

- Existing `users` records must not be deleted or recreated merely to adopt the target model.
- Existing `roles` and role names remain:
  - `STUDENT`
  - `STAFF`
  - `SUPER_ADMIN`
- Existing user IDs remain stable.
- Existing authentication endpoints remain compatible until an explicit API migration is approved.
- Existing passwords remain usable through a controlled authentication migration.
- `User.name` is a display attribute and must not be treated as globally unique.
- Schema changes must be additive or explicitly migrated.
- No production database reset, drop-and-recreate strategy, or silent data transformation is permitted.

---

## 3. Data Modeling Principles

### 3.1 Relational design

Use normalized relational tables as the default.

- Target 3NF for normal transactional data.
- Use stronger normalization where it removes real update anomalies.
- Introduce denormalized data only for a demonstrated performance or reporting requirement.
- Do not create generic entity/value tables when a concrete relational table is clearer.

### 3.2 Identifiers

- Use UUID identifiers for externally addressable domain resources.
- Preserve existing primary-key types where changing them would break current data or JPA/API compatibility.
- Never expose internal database sequences or implementation details as a business identifier unless deliberately specified.

### 3.3 Time

Use `timestamptz` for timestamps representing real-world instants.

Recommended audit columns for mutable domain entities:

```text
created_at
updated_at
```

Additional lifecycle timestamps are added only when their business meaning is distinct, for example:

```text
analyzed_at
completed_at
expires_at
used_at
```

### 3.4 Nullability

`NULL` means "unknown/not provided/not applicable", not an arbitrary workflow state.

Use explicit status/state columns when lifecycle state matters.

### 3.5 Flexible data

Use `jsonb` only for data whose structure is genuinely provider-specific or expected to evolve, such as:

- AI provider request/response metadata
- model-specific diagnostic metadata
- raw extraction metadata where retention is justified

Core business facts must remain typed relational columns.

### 3.6 Constraints

Important business invariants should be enforced at the database boundary where practical using:

- `PRIMARY KEY`
- `FOREIGN KEY`
- `NOT NULL`
- `UNIQUE`
- `CHECK`

Application validation remains necessary, but it must not be the only protection for critical integrity rules.

---

## 4. Logical Domain Model

```text
users
  ├── role → roles
  ├── student_profile → student_profiles
  ├── resumes
  ├── target_companies → student_targets → companies
  ├── learning_plans
  ├── interview_sessions
  └── progress_records

roles
  ├── role_permissions → permissions
  └── user_direct_grants → permissions

companies
  ├── company_roles
  │     └── company_role_skill_requirements → skills
  └── student_targets

student_profiles
  └── student_skills → skills

resumes
  └── resume_analyses
       └── skill_gap_analyses
            └── skill_gap_items → skills

skills
  ├── student_skills
  ├── company_role_skill_requirements
  ├── resource_skills → learning_resources
  └── learning_plan_items

learning_plans
  └── learning_plan_items → skills / learning_resources

interview_sessions
  └── interview_questions
       └── interview_answers
            └── interview_evaluations

progress_records
audit_events
```

---

## 5. Core Tables

### 5.1 `users`

Authentication identity and account lifecycle.

**Existing compatibility fields include:**

- `id`
- `name`
- `email`
- `password`
- `role_id`
- `active`

**Target additions/clarifications:**

- normalized email identity handling
- `created_at`
- `updated_at`
- account status where required

**Rules**

- Email identity must have an explicit uniqueness strategy.
- Display name must not be unique.
- Password material must contain only an approved password hash, never plaintext.
- `active` must not be overloaded to represent unrelated workflow states.

### 5.2 `roles`

Stable application roles.

Initial roles:

```text
STUDENT
STAFF
SUPER_ADMIN
```

The role model remains compatible with the existing one-role-per-user implementation.

Granular permissions are added separately rather than encoding every authorization rule into role names.

### 5.3 `permissions`

Atomic capabilities such as:

```text
PROFILE.READ
PROFILE.UPDATE
RESUME.READ
RESUME.CREATE
RESUME.UPDATE
RESUME.ANALYZE
SKILL_GAP.READ
SKILL_GAP.GENERATE
LEARNING_PLAN.READ
LEARNING_PLAN.CREATE
INTERVIEW.READ
INTERVIEW.START
INTERVIEW.ANSWER
INTERVIEW.EVALUATE
PROGRESS.READ
STUDENT.READ
REPORT.READ
REPORT.EXPORT
COMPANY.READ
COMPANY.CREATE
COMPANY.UPDATE
COMPANY.DELETE
STAFF.READ
STAFF.CREATE
STAFF.UPDATE
AI.CONFIGURE
```

This list is a capability catalog, not a final authorization grant matrix. The final matrix belongs to the security specification.

### 5.4 `role_permissions`

Maps roles to permission bundles.

```text
role_id  → roles.id
permission_id → permissions.id
```

Unique constraint:

```text
(role_id, permission_id)
```

### 5.5 `user_permission_grants`

Optional direct permission grants or restrictions for exceptional administrative cases.

Use sparingly. Normal authorization should be role-based plus resource/relationship rules.

---

## 6. Student and Career Domain

### 6.1 `student_profiles`

One profile per Student user.

Key fields:

```text
id
user_id
college
department
cgpa
graduation_year
phone
bio
created_at
updated_at
```

`user_id` is unique.

Do not store derived readiness scores as authoritative student profile facts.

### 6.2 `skills`

Canonical skill catalog.

Example:

```text
Java
Spring Boot
React
PostgreSQL
Data Structures
REST API
```

Recommended fields:

```text
id
name
normalized_name
description
status
created_at
updated_at
```

`normalized_name` should have an explicit uniqueness policy.

### 6.3 `student_skills`

Many-to-many relationship between students and skills.

Recommended fields:

```text
student_profile_id
skill_id
source
proficiency
verified
created_at
updated_at
```

`source` distinguishes evidence such as profile entry, resume extraction, assessment, or verified staff input.

Do not treat AI extraction as automatically verified achievement.

### 6.4 `companies`

Target and reference companies.

Recommended fields:

```text
id
name
normalized_name
description
website
status
created_at
updated_at
```

Company data used for AI recommendations must have provenance and freshness information where applicable.

### 6.5 `company_roles`

A company may have multiple relevant job roles.

Examples:

```text
Software Engineer
Backend Developer
Frontend Engineer
```

Recommended fields:

```text
id
company_id
name
description
status
created_at
updated_at
```

### 6.6 `company_role_skill_requirements`

Maps a company role to required/preferred skills.

Recommended fields:

```text
id
company_role_id
skill_id
requirement_type
importance
source
source_url
source_observed_at
```

Do not fabricate requirements. AI may interpret supplied evidence, but the stored requirement must have a source or explicit provenance.

### 6.7 `student_targets`

Stores the student's selected target company/role.

Recommended fields:

```text
id
student_profile_id
company_id
company_role_id
is_primary
created_at
updated_at
```

Business rules prevent invalid company/role combinations.

---

## 7. Resume and AI Analysis Domain

### 7.1 `resumes`

Metadata and lifecycle for uploaded resumes.

Recommended fields:

```text
id
student_profile_id
object_key
original_filename
content_type
file_size_bytes
checksum
version
status
uploaded_at
processed_at
created_at
updated_at
```

The actual PDF is not stored in PostgreSQL.

### 7.2 `resume_analyses`

One or more analyses can exist for a resume version.

Recommended fields:

```text
id
resume_id
model_provider
model_name
prompt_version
analysis_version
status
score
summary
structured_result
created_at
completed_at
```

`structured_result` may use `jsonb` for AI-specific output, while authoritative business fields remain typed.

### 7.3 `skill_gap_analyses`

Represents a comparison between a resume/profile state and a selected company role.

Recommended fields:

```text
id
student_profile_id
resume_analysis_id
company_role_id
status
overall_score
created_at
completed_at
```

### 7.4 `skill_gap_items`

Individual gaps or matches.

Recommended fields:

```text
id
skill_gap_analysis_id
skill_id
classification
importance
evidence
recommendation
created_at
```

Do not store a single opaque AI paragraph as the only representation of a skill gap.

---

## 8. Learning Domain

### 8.1 `learning_resources`

Catalog of external or internal learning resources.

Recommended fields:

```text
id
title
provider
resource_type
url
description
status
source_verified_at
created_at
updated_at
```

Potential providers include YouTube, NPTEL, Coursera, and LinkedIn Learning as defined by the original project specification. Availability and access must be treated as current external data, not permanent facts.

### 8.2 `resource_skills`

Many-to-many mapping between learning resources and skills.

Unique:

```text
(resource_id, skill_id)
```

### 8.3 `learning_plans`

A student-specific learning plan generated from identified gaps.

Recommended fields:

```text
id
student_profile_id
source_skill_gap_analysis_id
status
created_at
updated_at
completed_at
```

### 8.4 `learning_plan_items`

Ordered actionable learning steps.

Recommended fields:

```text
id
learning_plan_id
skill_id
resource_id
sequence_no
status
started_at
completed_at
```

Completion must represent an explicit application event or verified action, not an AI inference.

---

## 9. Mock Interview Domain

### 9.1 `interview_sessions`

Represents one mock interview attempt.

Recommended fields:

```text
id
student_profile_id
company_role_id
difficulty
status
started_at
completed_at
overall_score
created_at
```

### 9.2 `interview_questions`

Stores generated or selected questions for a session.

Recommended fields:

```text
id
interview_session_id
sequence_no
question_text
skill_id
generation_source
created_at
```

### 9.3 `interview_answers`

Student response to a question.

```text
id
question_id
answer_text
answered_at
```

### 9.4 `interview_evaluations`

Evaluation associated with an answer.

```text
id
answer_id
model_provider
model_name
prompt_version
score
feedback
structured_result
created_at
```

Scores and feedback must remain traceable to the answer and evaluation version.

---

## 10. Progress and Reporting

### 10.1 `progress_records`

Stores measurable progress events or snapshots.

The exact progress/readiness calculation is intentionally unresolved until the product and requirements decisions are finalized.

Possible dimensions:

```text
resume_score
interview_score
skill_progress
learning_progress
```

Do not duplicate the same derived metric across many tables without a defined ownership rule.

### 10.2 Reporting

Staff dashboards should normally derive reports from authoritative domain tables or controlled reporting views.

Do not create permanent "top student" or "weak student" records unless a business requirement explicitly needs historical snapshots.

If historical dashboard snapshots are introduced later, they must have:

```text
calculated_at
calculation_version
source_scope
```

---

## 11. Authentication and Security Data

These tables belong to the data model but their security behavior is defined by `06-security-spec.md`.

### 11.1 `refresh_sessions`

For refresh-token sessions if/when the target authentication flow is introduced.

Store:

```text
id
user_id
token_hash
issued_at
expires_at
revoked_at
rotated_from_id
last_used_at
device_metadata
```

Never store a raw refresh token.

### 11.2 `password_reset_tokens`

Store:

```text
id
user_id
token_hash
expires_at
used_at
created_at
```

The raw reset token is delivered to the user and is not persisted.

### 11.3 `audit_events`

Security and important business events.

Recommended fields:

```text
id
actor_user_id
event_type
resource_type
resource_id
result
ip_hash_or_network_metadata
metadata
created_at
```

Do not place passwords, raw tokens, resume contents, or unnecessary personal data into audit metadata.

---

## 12. Relationship Rules

Key relationships:

```text
users 1 ── 1 student_profiles
users N ── 1 roles
roles N ── N permissions
student_profiles N ── N skills
companies 1 ── N company_roles
company_roles N ── N skills
student_profiles N ── N companies
student_profiles 1 ── N resumes
resumes 1 ── N resume_analyses
resume_analyses 1 ── N skill_gap_analyses
skill_gap_analyses 1 ── N skill_gap_items
learning_plans 1 ── N learning_plan_items
learning_resources N ── N skills
interview_sessions 1 ── N interview_questions
interview_questions 1 ── N interview_answers
interview_answers 1 ── N interview_evaluations
users 1 ── N audit_events
```

Foreign keys must explicitly define deletion behavior.

Default principle:

- Do not cascade-delete important student history accidentally.
- Prefer `RESTRICT`/`NO ACTION` for historical records.
- Use `CASCADE` only where child rows have no independent meaning and the behavior is explicitly tested.

---

## 13. Indexing Strategy

Do not add indexes speculatively.

Primary keys and unique constraints already provide their required indexes.

Expected query-driven indexes include:

```text
users(email)
student_profiles(user_id)
resumes(student_profile_id, created_at)
resume_analyses(resume_id, created_at)
skill_gap_analyses(student_profile_id, created_at)
skill_gap_items(skill_gap_analysis_id)
student_skills(student_profile_id, skill_id)
company_roles(company_id)
company_role_skill_requirements(company_role_id, skill_id)
learning_plans(student_profile_id, created_at)
learning_plan_items(learning_plan_id, sequence_no)
interview_sessions(student_profile_id, created_at)
interview_questions(interview_session_id, sequence_no)
audit_events(actor_user_id, created_at)
```

Final indexes must be validated against real query plans and workload.

---

## 14. Authorization and Row-Level Security

Application authorization is authoritative at the Spring Security/service boundary.

PostgreSQL Row-Level Security may provide defense in depth for sensitive student data.

RLS must not be enabled as an incomplete shortcut before the application transaction context is correctly propagated.

The intended context mechanism is transaction-local database session configuration, for example:

```sql
SELECT set_config('app.user_id', :user_id, true);
SELECT set_config('app.role', :role, true);
```

Helper functions/policies may then evaluate the current application identity.

### RLS rules

- Student: own student-owned records.
- Staff: only records within explicitly defined staff scope.
- Super Admin: administrative scope as explicitly authorized.
- Background jobs: use a deliberate service identity and least privilege.
- Database owners/superusers must not be treated as normal application identities.

RLS policies require integration tests for allow and deny cases before production use.

---

## 15. Data Lifecycle and Retention

### Student data

Retain only data required for product functionality, reporting, security, or legally required purposes.

### Resumes

- Store binary files in object storage.
- Store metadata and references in PostgreSQL.
- Use checksums for integrity/deduplication decisions.
- Do not log resume contents.

### AI data

Retain enough metadata to reproduce or audit important AI-derived results where required:

```text
provider
model
prompt version
application/analysis version
input references
created_at
result status
```

Do not assume external AI providers retain or can reproduce historical outputs.

### Audit data

Audit events should be append-oriented and protected from ordinary user modification.

Retention periods remain an open product/security decision.

---

## 16. Migration Strategy

The current project uses JPA/Hibernate schema update behavior. The target architecture moves schema authority to version-controlled migrations.

### Target

```text
Application startup
    ↓
Flyway migration validation/migration
    ↓
Hibernate/JPA schema validation
    ↓
Application
```

Hibernate must not silently create production schema changes.

### Migration rules

1. Inspect the existing database before the first migration.
2. Take a verified backup before structural changes.
3. Baseline an existing database rather than recreating it.
4. Preserve existing IDs and authentication records.
5. Add new tables before adding required foreign keys that depend on them.
6. Backfill data in explicit, testable steps.
7. Validate row counts and relationships after backfills.
8. Only then tighten `NOT NULL`, `UNIQUE`, or other constraints.
9. Prefer forward migrations over editing already-applied migration files.
10. Rollback strategy must be defined for each production migration.

Example migration sequence:

```text
V001 baseline/current schema capture
V002 permission model
V003 student profile
V004 company and skill catalog
V005 resume and analysis
V006 skill-gap and learning
V007 interview and progress
V008 security/session data
V009 audit and authorization support
V010 constraints/indexes/RLS where approved
```

These versions are a planning example, not yet committed migration filenames. Actual migration ordering must follow the inspected live database.

---

## 17. Seed and Reference Data

Reference data that the application depends on should be deterministic and version-controlled.

Initial role seed:

```text
STUDENT
STAFF
SUPER_ADMIN
```

Reference permissions may be seeded through migration scripts.

Company data must not be seeded as permanent "official requirements" unless its source and effective date are recorded.

AI-generated data is never reference seed data.

---

## 18. Transaction Boundaries

Use database transactions around operations that must remain atomic.

Examples:

### Registration

```text
validate
→ create user
→ assign role
→ commit
```

### Resume metadata creation

```text
validate ownership
→ create resume record
→ commit
→ upload/process asynchronously where appropriate
```

### Interview completion

```text
persist final answer/evaluation state
→ update session state
→ commit
```

External AI calls should not hold long database transactions open unless there is a documented reason.

---

## 19. Concurrency and Consistency

Default to strong transactional consistency for:

- identity/account changes
- ownership changes
- permission changes
- learning completion
- interview state transitions
- audit events associated with critical actions

AI analysis and external integrations may use asynchronous processing.

Use explicit state transitions rather than relying on timing assumptions.

Where concurrent updates are possible, use optimistic locking/versioning or another deliberately selected concurrency control mechanism.

---

## 20. Performance Boundaries

Initial implementation should remain a normal PostgreSQL transactional system.

Do not introduce:

- sharding
- database partitioning
- a separate vector database
- a distributed cache
- read replicas

until measured requirements justify them.

Large resume files and generated reports belong in object storage.

Reporting queries that become expensive may use controlled views/materialized views later, with refresh and correctness rules documented before adoption.

---

## 21. Database Roles and Least Privilege

Production database access should separate responsibilities.

Conceptual roles:

```text
careerpilot_owner
careerpilot_migrator
careerpilot_app
careerpilot_readonly
```

The application runtime role must not have unnecessary schema ownership or superuser privileges.

Migration credentials must not be reused as normal application credentials.

Secrets belong in environment/secret management, not source control.

---

## 22. Open Decisions

The following are intentionally unresolved and must not be invented during implementation:

1. Exact UUID strategy for legacy entities.
2. Exact email normalization/collation policy.
3. Final password-reset and refresh-session retention periods.
4. Resume maximum file size and retention period.
5. Exact progress/readiness formula.
6. Exact score normalization for resume and interviews.
7. Final company-role requirement sourcing workflow.
8. Whether student/staff data requires institution or department tenancy.
9. Final RLS rollout boundary.
10. Whether historical reporting snapshots are required.
11. Exact AI output retention and privacy policy.
12. Whether PostgreSQL extensions are required for future semantic/vector search.

Any resolved decision must update this document and the relevant ADR/security/API requirements.

---

## 23. Validation Requirements

Before a database change is considered complete:

- migration applies successfully to an empty database
- migration applies successfully to a representative existing database
- existing authentication records remain usable
- existing IDs remain unchanged
- constraints reject invalid data
- foreign keys prevent orphaned records
- indexes support validated high-frequency queries
- authorization tests cover allowed and denied access
- RLS tests cover intended isolation if RLS is enabled
- rollback/recovery procedure is tested where applicable
- application starts with schema validation enabled
- no secrets are committed
- relevant API and integration tests pass

---

## 24. Standards and Reference Basis

This specification follows the project requirement to use evidence and stable, supported technology.

PostgreSQL's current documentation defines primary keys, foreign keys, unique constraints, check constraints, and row-level security as database-level mechanisms for enforcing integrity and access policies.

Flyway's versioned migration model applies migrations in version order, records applied versions/checksums, and recommends creating a new migration rather than modifying an already-applied permanent migration.

Reference documentation:

- PostgreSQL Data Definition: https://www.postgresql.org/docs/current/ddl.html
- PostgreSQL Constraints: https://www.postgresql.org/docs/current/ddl-constraints.html
- PostgreSQL Row-Level Security: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- Flyway Versioned Migrations: https://documentation.red-gate.com/fd/versioned-migrations-273973333.html

---

## 25. Definition of Done

The data model is ready for implementation when:

- entities and ownership are agreed
- compatibility with the existing authentication schema is preserved
- unresolved decisions are explicitly tracked
- migration strategy is approved
- constraints and relationships are testable
- security-sensitive data handling is defined
- API/resource ownership aligns with `04-api-spec.yaml`
- implementation follows an ExecPlan for the migration
- database tests and migration validation are defined
- `06-security-spec.md` resolves the security-specific open items

**Next document:** `06-security-spec.md`
