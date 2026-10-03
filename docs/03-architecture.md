# CareerPilot Architecture Specification

**Document ID:** CP-DOC-03\
**Document:** Architecture Specification\
**Status:** Baseline Draft\
**Version:** 0.1.0\
**Product:** CareerPilot\
**Authority:** System-architecture source of truth\
**Parent Documents:** `01-product-spec.md`, `02-requirements.md`\
**Last Updated:** 2026-10-03

------------------------------------------------------------------------

## 1. Purpose

This document defines the technical architecture of CareerPilot.

It answers:

-   what major systems exist;
-   where responsibilities live;
-   how the frontend, backend, database, AI, files, and external systems
    interact;
-   how the existing backend is preserved;
-   where domain boundaries exist;
-   which architectural decisions are fixed;
-   which decisions remain open.

This document intentionally avoids detailed API schemas, relational
table definitions, UI specifications, AI prompts, and deployment
runbooks. Those belong to their respective source-of-truth documents.

------------------------------------------------------------------------

# 2. Architecture Drivers

The architecture is driven by the following requirements and
constraints.

### Product drivers

CareerPilot must support:

-   student preparation;
-   resume analysis;
-   skill-gap identification;
-   learning recommendations;
-   mock interviews;
-   progress tracking;
-   staff monitoring;
-   Super Admin management.

### Engineering drivers

The system must be:

-   maintainable;
-   secure;
-   testable;
-   explicit about boundaries;
-   compatible with the existing backend;
-   suitable for AI-assisted development;
-   based on supported stable dependencies;
-   capable of evolving without premature distributed-system complexity.

### Project constraints

The existing Spring Boot backend is an established foundation.

The project must not replace working authentication, APIs, JWT behavior,
PostgreSQL/JPA behavior, or existing roles without a documented reason,
compatibility analysis, migration plan, and validation.

The AI layer must not become the system of record.

------------------------------------------------------------------------

# 3. Architectural Style

## 3.1 Primary style

CareerPilot uses a:

> **Modular Monolith**

with:

-   React frontend;
-   Spring Boot backend;
-   PostgreSQL as the primary system of record;
-   object storage for uploaded documents;
-   an application-owned AI orchestration boundary;
-   external integration adapters.

The backend is deployed as one application initially, while internal
modules maintain explicit ownership boundaries.

------------------------------------------------------------------------

## 3.2 Why a modular monolith

A modular monolith provides:

-   simple local development;
-   simple deployment;
-   transactional consistency where required;
-   lower operational overhead;
-   clear module boundaries;
-   easier debugging;
-   easier testing;
-   a future path to service extraction if actual scale or ownership
    requires it.

CareerPilot does not currently have evidence requiring:

-   microservices;
-   Kubernetes;
-   service meshes;
-   distributed transactions;
-   event-stream infrastructure as a mandatory foundation.

These technologies are therefore not architectural requirements.

------------------------------------------------------------------------

# 4. System Context

``` text
                         ┌──────────────────────┐
                         │      Student         │
                         └──────────┬───────────┘
                                    │
                                    │
                         ┌──────────▼───────────┐
                         │                      │
                         │     CareerPilot      │
                         │                      │
                         │ React + Spring Boot  │
                         │ + PostgreSQL         │
                         │                      │
                         └───────┬──────┬───────┘
                                 │      │
                    ┌────────────┘      └─────────────┐
                    │                                 │
          ┌─────────▼─────────┐             ┌─────────▼─────────┐
          │ Staff / Super     │             │ External Systems  │
          │ Admin             │             │                   │
          └───────────────────┘             │ AI Provider       │
                                            │ Learning Sources  │
                                            │ Company Sources   │
                                            │ Email             │
                                            └───────────────────┘
```

The system context follows the C4 model's system-context abstraction. C4
recommends using only the diagram levels that add value; for
CareerPilot, system context and container-level architecture are
sufficient at the current stage. citeturn0search3turn0search5

------------------------------------------------------------------------

# 5. Container Architecture

``` text
┌──────────────────────────────────────────────────────────────┐
│                        CareerPilot                           │
│                                                              │
│  ┌───────────────────────┐                                   │
│  │ React Web Application  │                                   │
│  │ Student / Staff / Admin│                                   │
│  └────────────┬──────────┘                                   │
│               │ HTTPS / JSON                                 │
│               ▼                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Spring Boot Application                  │ │
│  │                                                         │ │
│  │  Auth │ Student │ Resume │ Skill Gap │ Learning         │ │
│  │  Interview │ Progress │ Staff │ Admin │ AI │ Shared     │ │
│  └───────┬───────────────────────┬─────────────────────────┘ │
│          │                       │                            │
│          ▼                       ▼                            │
│  ┌───────────────┐      ┌──────────────────────┐             │
│  │ PostgreSQL    │      │ Object/File Storage  │             │
│  │ System of     │      │ Resume documents     │             │
│  │ Record        │      │ Generated reports    │             │
│  └───────────────┘      └──────────────────────┘             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                  │
                  │ controlled outbound adapters
                  ▼
        ┌─────────────────────────────┐
        │ External Services           │
        │ AI / Email / Learning /     │
        │ Company / Optional GitHub   │
        └─────────────────────────────┘
```

------------------------------------------------------------------------

# 6. Frontend Architecture

The frontend is a separate presentation application.

Primary responsibilities:

-   routing;
-   page composition;
-   interaction handling;
-   form validation appropriate to UX;
-   loading/empty/error states;
-   presentation of backend data;
-   accessibility;
-   responsive behavior;
-   authentication-state presentation;
-   capability-aware navigation.

The frontend MUST NOT be the authoritative enforcement point for:

-   authorization;
-   ownership;
-   score calculations;
-   security decisions;
-   persistence rules;
-   AI validation.

The backend remains authoritative.

------------------------------------------------------------------------

# 7. Backend Architecture

The Spring Boot backend is the application's primary business system.

It owns:

-   authentication;
-   authorization;
-   business rules;
-   validation at application boundaries;
-   persistence;
-   domain workflows;
-   AI orchestration;
-   external integration coordination;
-   audit events.

The backend is organized by domain responsibility rather than by a
single global controller/service/repository structure.

------------------------------------------------------------------------

# 8. Backend Module Boundaries

The baseline module structure is:

``` text
backend/
│
├── auth/
├── student/
├── resume/
├── skillgap/
├── learning/
├── interview/
├── progress/
├── staff/
├── superadmin/
├── ai/
└── shared/
```

### Auth

Owns:

-   registration;
-   login;
-   authentication lifecycle;
-   password recovery;
-   token/session handling;
-   identity-related security operations.

It does not own student preparation behavior.

### Student

Owns:

-   student profile;
-   student preparation identity;
-   target-company association where appropriate.

### Resume

Owns:

-   resume metadata;
-   upload workflow;
-   document-processing state;
-   extracted resume information;
-   resume analysis lifecycle.

### Skill Gap

Owns:

-   skill-gap analysis;
-   skill status;
-   gap-generation workflow;
-   relation between student evidence and target requirements.

### Learning

Owns:

-   learning resources;
-   learning recommendations;
-   learning plans;
-   learning completion state.

### Interview

Owns:

-   interview sessions;
-   questions;
-   answers;
-   evaluation results;
-   interview lifecycle.

### Progress

Owns:

-   progress events;
-   progress aggregation;
-   student progress views;
-   supported progress metrics.

### Staff

Owns:

-   staff-facing student monitoring;
-   staff-scoped reporting;
-   staff dashboard queries.

It must use the authorization system rather than assuming all staff can
view all students.

### Super Admin

Owns:

-   staff management;
-   company management;
-   learning-resource administration;
-   approved platform configuration;
-   administrative analytics.

### AI

Owns the AI integration boundary, not the business source of truth.

It provides:

-   context assembly;
-   provider abstraction;
-   model invocation;
-   structured output handling;
-   AI validation;
-   provenance metadata;
-   failure handling.

### Shared

Contains only genuinely cross-cutting concerns such as:

-   common error handling;
-   shared validation infrastructure;
-   common response/problem types;
-   security primitives;
-   observability primitives.

Shared MUST NOT become a dumping ground for domain business logic.

------------------------------------------------------------------------

# 9. Dependency Direction

The architecture should maintain predictable dependency direction.

``` text
Presentation / API
       ↓
Application / Domain workflow
       ↓
Domain rules
       ↓
Ports / abstractions
       ↓
Infrastructure adapters
       ↓
Database / External systems
```

A domain module should not directly depend on another module's internal
persistence implementation.

Preferred interaction:

``` text
Resume
  ↓
Resume application interface
  ↓
AI abstraction
```

Not:

``` text
Resume
  ↓
OpenAI SDK directly
```

This preserves provider replaceability and testability.

------------------------------------------------------------------------

# 10. Module Communication

Modules communicate through explicit application/domain contracts.

### Allowed

``` text
Interview
   ↓
AI application interface
```

``` text
Skill Gap
   ↓
Company requirement interface
```

``` text
Progress
   ↓
Progress events / approved domain data
```

### Discouraged

``` text
Module A
   ↓
Module B repository
```

Direct repository access across domain boundaries should be avoided
unless explicitly justified.

------------------------------------------------------------------------

# 11. System of Record

PostgreSQL is the primary system of record.

Authoritative application data includes:

-   users;
-   roles/permissions;
-   student profiles;
-   companies;
-   skills;
-   resumes metadata;
-   analyses;
-   learning plans;
-   interview sessions;
-   interview results;
-   progress;
-   audit records.

AI providers, browser state, caches, and external APIs are not
authoritative sources for persisted CareerPilot business state.

------------------------------------------------------------------------

# 12. Database Architecture

The database is relational and owned by the application.

The architecture favors:

-   normalized relational data;
-   explicit primary/foreign keys;
-   constraints;
-   transactional integrity;
-   indexed access paths;
-   controlled JSON use for genuinely flexible AI/provider payloads.

Detailed schema design belongs in `05-data-model.md`.

------------------------------------------------------------------------

# 13. Existing Backend Compatibility Baseline

The current backend establishes the compatibility baseline.

The known implementation currently contains:

``` text
Spring Boot
Java
Spring Security
JPA
PostgreSQL
JWT
Maven
```

The current authentication contract includes:

``` text
POST /api/auth/register
POST /api/auth/login
GET  /api/test/protected
```

The existing roles are:

``` text
STUDENT
STAFF
SUPER_ADMIN
```

These existing contracts MUST be treated as compatibility-sensitive.

The architecture does not authorize silently replacing them.

------------------------------------------------------------------------

# 14. Runtime Request Flow

Normal request:

``` text
Browser
   ↓
React
   ↓
HTTPS
   ↓
Spring Security
   ↓
Authentication
   ↓
Authorization
   ↓
Controller / API boundary
   ↓
Application service
   ↓
Domain rules
   ↓
Repository / infrastructure
   ↓
PostgreSQL
   ↓
Response DTO
   ↓
React
```

The frontend must never bypass the backend to access protected system
data.

------------------------------------------------------------------------

# 15. Resume Processing Flow

``` text
Student
   ↓
React
   ↓
Resume API
   ↓
File validation
   ↓
File storage
   ↓
Document extraction
   ↓
Structured resume data
   ↓
AI analysis
   ↓
Output validation
   ↓
Persist analysis
   ↓
Student report
```

AI failure must not invalidate the stored original resume.

------------------------------------------------------------------------

# 16. Skill Gap Flow

``` text
Student Target
      ↓
Approved Company Requirement Context
      ↓
Student Resume / Profile Evidence
      ↓
Skill Normalization
      ↓
Comparison
      ↓
Skill Gap Result
      ↓
Learning Actions
```

AI may assist with extraction, normalization, interpretation, or
recommendation.

Deterministic application rules remain responsible for authoritative
persistence and supported calculations.

------------------------------------------------------------------------

# 17. Mock Interview Flow

``` text
Student
   ↓
Start Interview
   ↓
Interview Context
   ↓
AI Question Generation
   ↓
Question Validation
   ↓
Student Answer
   ↓
AI Evaluation
   ↓
Evaluation Validation
   ↓
Persist Result
   ↓
Progress Update
```

The AI provider is an external dependency and is therefore behind the AI
boundary.

------------------------------------------------------------------------

# 18. Staff Monitoring Flow

``` text
Staff
   ↓
Authenticated Request
   ↓
Authorization Policy
   ↓
Staff Scope
   ↓
Student Query
   ↓
Allowed Student Data
   ↓
Dashboard / Report
```

Authorization MUST occur before sensitive student information is
returned.

The staff role alone is not sufficient evidence of access to every
student.

------------------------------------------------------------------------

# 19. AI Architecture Boundary

The AI architecture follows:

``` text
Domain Module
      ↓
AI Application Interface
      ↓
Context Builder
      ↓
Approved Project / Runtime Context
      ↓
Provider Adapter
      ↓
AI Model
      ↓
Structured Output
      ↓
Schema Validation
      ↓
Business Validation
      ↓
Domain Module
```

The model MUST NOT directly:

-   write arbitrary database records;
-   change permissions;
-   change authentication state;
-   change company requirements;
-   mark learning complete without application rules;
-   assign authoritative scores without validation;
-   create unverified student achievements.

------------------------------------------------------------------------

# 20. AI Provider Abstraction

The architecture MUST avoid coupling core domain logic directly to one
AI provider.

Conceptually:

``` text
AIService
   │
   ├── Provider Adapter A
   ├── Provider Adapter B
   └── Test / Mock Adapter
```

The exact provider and model are intentionally unresolved until the AI
specification.

The existing product requirements identify OpenAI or Gemini as possible
providers. That does not constitute an architectural commitment to
either provider.

------------------------------------------------------------------------

# 21. External Integration Boundary

External systems are accessed through adapters.

``` text
Domain
  ↓
Application Port
  ↓
Integration Adapter
  ↓
External API
```

Potential integrations include:

-   AI provider;
-   learning resources;
-   company/job sources;
-   email;
-   optional GitHub/LeetCode activity.

No external integration becomes a mandatory architectural dependency
until its product requirement and security/data contract are approved.

------------------------------------------------------------------------

# 22. File Architecture

Resume files are treated differently from relational business data.

``` text
Application
   ↓
Upload Validation
   ↓
Object Storage
   ↓
Metadata in PostgreSQL
```

PostgreSQL stores file metadata and lifecycle information.

Binary document content should use approved object/file storage rather
than unnecessarily storing large documents directly in relational
tables.

Detailed file controls belong in the security and later operational
specifications.

------------------------------------------------------------------------

# 23. Synchronous vs Asynchronous Work

Short operations may remain synchronous.

Examples:

-   profile update;
-   target company selection;
-   basic reads;
-   small metadata updates.

Potentially long-running operations should be processed asynchronously
when justified by measured behavior.

Examples:

-   PDF extraction;
-   resume analysis;
-   large report generation;
-   AI-intensive workflows.

The architecture does not introduce a queue or worker platform merely
because asynchronous processing exists conceptually.

The specific mechanism is deferred until workload and operational
requirements justify it.

------------------------------------------------------------------------

# 24. Transaction Boundaries

Database transactions belong to business operations that require atomic
persistence.

Examples:

``` text
Create account + assign initial role
```

``` text
Persist interview answer + associated lifecycle update
```

``` text
Persist validated analysis + associated metadata
```

External AI calls should not be treated as part of an indefinitely open
database transaction.

Preferred pattern:

``` text
Persist processing state
   ↓
Call external service
   ↓
Validate result
   ↓
Persist result
```

------------------------------------------------------------------------

# 25. Consistency Model

CareerPilot prefers strong consistency for authoritative transactional
data.

Examples:

-   identity;
-   permissions;
-   ownership;
-   completed learning state;
-   interview results;
-   audit events.

Derived dashboards may use computed or cached representations where
justified, but the underlying authoritative data remains the source of
truth.

------------------------------------------------------------------------

# 26. Authorization Boundary

Authorization is a cross-cutting backend responsibility.

Conceptually:

``` text
Authenticated User
        ↓
Identity
        ↓
Roles / Permissions
        ↓
Resource
        ↓
Action
        ↓
Ownership / Relationship / Scope
        ↓
Policy Decision
        ↓
Allow / Deny
```

The architecture supports the project's planned fine-grained
authorization model rather than hard-coding every rule around the three
product roles.

Detailed authorization policy belongs in `06-security-spec.md`.

------------------------------------------------------------------------

# 27. API Boundary

The API is the public application contract between frontend and backend.

``` text
React
  │
  │ HTTP/JSON
  ▼
API Boundary
  │
  ├── Authentication
  ├── Validation
  ├── Authorization
  ├── DTO Mapping
  └── Error Contract
  │
  ▼
Application Modules
```

JPA entities must not become accidental public API contracts.

Detailed endpoint and schema definitions belong in `04-api-spec.yaml`.

------------------------------------------------------------------------

# 28. Error Architecture

Errors are handled at explicit boundaries.

``` text
Domain / Infrastructure Failure
             ↓
Application Error
             ↓
API Error Mapping
             ↓
Standard Error Contract
             ↓
Frontend State
```

Errors MUST:

-   be explicit;
-   avoid leaking secrets;
-   avoid exposing unnecessary internal implementation details;
-   preserve useful correlation information for operations;
-   distinguish validation, authentication, authorization, not-found,
    conflict, dependency, and server failures where appropriate.

------------------------------------------------------------------------

# 29. Security Architecture

Security is defense in depth.

``` text
Browser
   ↓
Transport Security
   ↓
Authentication
   ↓
Authorization
   ↓
Input Validation
   ↓
Business Rules
   ↓
Database Constraints / Isolation
   ↓
Audit / Observability
```

No single layer is assumed to be sufficient.

Database-level controls such as row-level security may provide
additional defense but must not replace application authorization.

------------------------------------------------------------------------

# 30. Observability Boundary

The application should produce structured operational signals for:

-   request failures;
-   authentication/security events;
-   authorization denials;
-   asynchronous processing;
-   AI calls;
-   external integration failures;
-   important administrative actions.

Observability data must not contain:

-   passwords;
-   access tokens;
-   API keys;
-   unnecessary resume content;
-   unnecessary personal data.

Detailed logging, metrics, tracing, and alerting belong in
`11-deployment-operations.md`.

------------------------------------------------------------------------

# 31. Deployment Shape

Initial deployment:

``` text
                Internet
                   │
                   ▼
             Reverse Proxy /
             Managed HTTPS
                   │
          ┌────────▼────────┐
          │ React Frontend  │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ Spring Boot API │
          └───────┬─────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
   PostgreSQL          Object Storage
        │
        └──────────────┐
                       ▼
                 External APIs
```

The exact cloud provider and hosting services remain open.

Kubernetes is not a baseline requirement.

------------------------------------------------------------------------

# 32. Scalability Strategy

CareerPilot should scale in stages.

### Stage 1

Single modular application with managed PostgreSQL and object storage.

### Stage 2

Scale the application horizontally if measured workload requires it.

### Stage 3

Introduce dedicated workers or queues for demonstrated asynchronous
workload.

### Stage 4

Extract an individual module into a separate service only when there is
evidence for:

-   independent scaling;
-   independent deployment;
-   independent ownership;
-   strong fault-isolation requirement;
-   or a similarly concrete architectural reason.

Microservice extraction is therefore an optimization, not the initial
architecture.

------------------------------------------------------------------------

# 33. Technology Baseline

## Frontend

Product requirements specify React.

The detailed frontend toolchain will be selected in the frontend/UX
specification with the project's stable-dependency policy.

## Backend

Product requirements specify:

-   Java;
-   Spring Boot;
-   Spring Security;
-   REST;
-   JPA/Hibernate;
-   Maven.

The existing backend currently provides this foundation.

Spring Boot 4.0 requires at least Java 17. Current Spring documentation
also shows Java 17 as a supported baseline.
citeturn0search0turn0search4

Spring Boot 4.0 is a major generation and Spring's own release
announcement notes that migration from earlier generations can require
additional work. Therefore, no framework upgrade is implied merely by
this architecture document. citeturn0search11

## Database

PostgreSQL remains the system of record.

PostgreSQL 18 is the current major release and is supported through
November 14, 2030. PostgreSQL 17 is also supported through November 8,
2029. citeturn0search1turn0search16

The existing environment's PostgreSQL version must be treated as a
migration concern rather than silently changed during architecture work.

## Dependency policy

The project follows `AGENTS.md`:

-   prefer LTS where a genuine LTS release exists;
-   otherwise use a stable supported release;
-   no nightly/canary releases;
-   no dependency added without a demonstrated need;
-   no upgrade merely because a newer version exists.

------------------------------------------------------------------------

# 34. Architectural Decisions

The following decisions are baseline decisions.

  ID        Decision
  --------- ----------------------------------------------------------
  ADR-001   Use a modular monolith initially
  ADR-002   React is the web frontend
  ADR-003   Spring Boot is the backend foundation
  ADR-004   PostgreSQL is the system of record
  ADR-005   AI is accessed through an application-owned boundary
  ADR-006   Domain modules own their business responsibilities
  ADR-007   Backend is authoritative for authorization
  ADR-008   External integrations use adapters
  ADR-009   Do not introduce microservices without demonstrated need
  ADR-010   Existing backend contracts require controlled migration

These may later become individual ADR files when the decision is
implemented or changed.

------------------------------------------------------------------------

# 35. Architecture Invariants

The following are architectural invariants unless an approved ADR
changes them.

1.  PostgreSQL remains the primary system of record.
2.  Backend authorization is authoritative.
3.  AI is not the system of record.
4.  AI providers are not directly coupled to domain business logic.
5.  Existing backend contracts are compatibility-sensitive.
6.  Domain modules maintain explicit ownership boundaries.
7.  Frontend state does not override backend security decisions.
8.  External systems are treated as unreliable dependencies.
9.  Secrets are externalized from source code.
10. Breaking changes require explicit migration control.
11. Distributed architecture is not introduced without evidence.
12. The simplest architecture satisfying approved requirements is
    preferred.

------------------------------------------------------------------------

# 36. Architecture Risks

## Risk A --- Existing backend migration

Changing the existing authentication or dependency foundation can
introduce compatibility failures.

**Control:** inventory, ADR, ExecPlan, migration testing, rollback.

## Risk B --- AI dependency

External AI availability, latency, cost, and output quality can affect
user workflows.

**Control:** provider abstraction, validation, failure states, bounded
calls.

## Risk C --- Authorization complexity

Fine-grained access can become difficult if domain ownership is unclear.

**Control:** explicit resource ownership and policy boundaries before
implementation.

## Risk D --- Premature distributed architecture

Adding microservices, queues, or infrastructure too early increases
operational complexity.

**Control:** modular monolith first; split only when evidence exists.

## Risk E --- Data provenance

Company requirements and AI-derived skill information may become stale
or misleading.

**Control:** source/provenance metadata and explicit trust levels.

------------------------------------------------------------------------

# 37. Architecture Validation

Before implementation is considered architecture-ready, verify:

### Structure

-   modules have clear ownership;
-   dependencies have explicit direction;
-   no circular domain dependency is required.

### Compatibility

-   existing authentication contracts are identified;
-   existing APIs are identified;
-   existing roles are preserved or explicitly migrated;
-   current database behavior is known.

### Security

-   authentication boundary is explicit;
-   authorization boundary is explicit;
-   file boundary is explicit;
-   AI boundary is explicit.

### Data

-   PostgreSQL is the authoritative store;
-   external systems are not treated as authoritative without approved
    provenance.

### AI

-   provider abstraction exists conceptually;
-   AI output validation is explicit;
-   deterministic business rules remain deterministic.

### Operations

-   synchronous/asynchronous boundaries are understood;
-   failure handling exists;
-   observability boundaries exist.

------------------------------------------------------------------------

# 38. Architecture Scope Boundaries

This document intentionally does not finalize:

-   exact API endpoint paths and schemas;
-   exact PostgreSQL tables and indexes;
-   exact authentication token strategy;
-   exact authorization permissions;
-   exact RLS policies;
-   exact frontend state-management library;
-   exact UI component library;
-   exact AI provider/model;
-   exact AI prompts;
-   exact external integrations;
-   exact object-storage provider;
-   exact deployment provider;
-   exact performance numbers.

Those decisions must be made in the appropriate later source-of-truth
document.

------------------------------------------------------------------------

# 39. AI-Agent Implementation Rules

An AI coding agent working from this architecture MUST:

1.  read `AGENTS.md`;
2.  read `01-product-spec.md`;
3.  read `02-requirements.md`;
4.  read this architecture document;
5.  inspect the existing source before changing it;
6.  identify affected module boundaries;
7.  check compatibility before dependency/framework changes;
8.  use the appropriate later contract document when implementing
    APIs/data/security/AI behavior;
9.  create an ExecPlan for architecture changes, migrations, security
    changes, dependency upgrades, breaking changes, or substantial
    multi-file work;
10. validate implementation against the relevant requirement IDs.

An agent MUST NOT infer that an undocumented library, service,
framework, queue, database, AI provider, or cloud platform is approved
merely because it is commonly used elsewhere.

------------------------------------------------------------------------

# 40. Architecture Change Control

An architecture change requires:

1.  reason for change;
2.  affected components;
3.  affected requirements;
4.  compatibility analysis;
5.  security impact;
6.  data impact;
7.  migration strategy where applicable;
8.  rollback/recovery strategy where applicable;
9.  ADR when the decision is significant;
10. updated affected specifications;
11. validation evidence.

The smallest safe architecture change is preferred.

------------------------------------------------------------------------

# 41. Definition of Done

This architecture specification is baselined when:

-   system context is defined;
-   container boundaries are defined;
-   backend module ownership is defined;
-   frontend/backend boundary is defined;
-   database ownership is defined;
-   AI boundary is defined;
-   external integration boundary is defined;
-   security boundary is defined;
-   existing backend compatibility is acknowledged;
-   scalability strategy is defined;
-   major architectural invariants are explicit;
-   major risks are documented;
-   unresolved decisions are explicit;
-   no unsupported implementation detail is presented as approved.

------------------------------------------------------------------------

# 42. Next Document

The next authoritative document is:

> **`04-api-spec.yaml`**

It will define the machine-readable HTTP API contract.

It must preserve the existing authentication API during the initial
compatibility phase and introduce new resources only according to the
approved requirements and architecture.
