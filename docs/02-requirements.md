# CareerPilot Requirements Specification

**Document ID:** CP-DOC-02\
**Document:** Requirements Specification\
**Status:** Baseline Draft\
**Version:** 0.1.0\
**Product:** CareerPilot\
**Authority:** Requirements-level source of truth\
**Parent Document:** `01-product-spec.md`\
**Last Updated:** 2026-10-03

------------------------------------------------------------------------

## 1. Purpose

This document converts the approved product intent into explicit,
testable functional and non-functional requirements.

It deliberately does **not** define:

-   implementation architecture;
-   database tables;
-   API paths;
-   framework choices;
-   UI component implementation;
-   AI model selection;
-   deployment topology.

Those decisions belong to later specifications.

Requirements are written so that an implementation team or AI coding
agent can determine:

1.  what the system must do;
2.  what conditions apply;
3.  what outcome is expected;
4.  how the requirement can be verified.

------------------------------------------------------------------------

## 2. Requirement Quality Rules

Each normative requirement follows these principles:

-   one primary behavior per requirement;
-   explicit actor or system responsibility where useful;
-   no implementation-specific wording unless implementation is itself a
    constraint;
-   observable outcome;
-   testable acceptance condition;
-   stable identifier;
-   no unsupported assumptions.

The normative terms **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**,
and **MAY** are used as requirement strength indicators.

------------------------------------------------------------------------

## 3. Requirement Status

  Status       Meaning
  ------------ ----------------------------------------------------
  Proposed     Identified but not yet approved for implementation
  Approved     Approved product requirement
  Deferred     Intentionally postponed
  Rejected     Explicitly outside the product
  Superseded   Replaced by a later approved requirement

Requirements in this baseline are **Approved** unless explicitly marked
otherwise.

------------------------------------------------------------------------

# 4. Functional Requirements

## 4.1 Authentication

### FR-AUTH-001 --- Student Registration

**Priority:** Must\
**Status:** Approved

The system MUST allow a new student to create an account using the
registration information defined by the product.

**Acceptance criteria:**

-   valid registration data creates an account;
-   invalid required data is rejected;
-   an existing account identifier cannot be registered again;
-   the system does not expose sensitive account information through
    validation errors.

------------------------------------------------------------------------

### FR-AUTH-002 --- User Login

**Priority:** Must\
**Status:** Approved

The system MUST allow an authenticated user to sign in using valid
credentials.

**Acceptance criteria:**

-   valid credentials establish an authenticated session;
-   invalid credentials do not establish an authenticated session;
-   inactive accounts cannot authenticate;
-   the response does not expose the stored password or
    password-equivalent secret.

------------------------------------------------------------------------

### FR-AUTH-003 --- Authenticated Access

**Priority:** Must\
**Status:** Approved

The system MUST require authentication for protected resources.

**Acceptance criteria:**

-   unauthenticated access to protected resources is rejected;
-   valid authenticated requests can access resources permitted to the
    user;
-   authentication state is validated server-side.

------------------------------------------------------------------------

### FR-AUTH-004 --- Role-Aware Access

**Priority:** Must\
**Status:** Approved

The system MUST enforce access according to the user's authorized
permissions and resource context.

The role names Student, Staff, and Super Admin are product roles, but
authorization MUST NOT rely solely on a client-provided role value.

**Acceptance criteria:**

-   unauthorized actions are rejected;
-   authorized actions succeed;
-   frontend visibility does not substitute for backend authorization;
-   access to another student's protected information is denied unless
    explicitly authorized by policy.

------------------------------------------------------------------------

### FR-AUTH-005 --- Forgot Password

**Priority:** Must\
**Status:** Approved

The system MUST provide a password-recovery initiation flow.

**Acceptance criteria:**

-   a user can initiate recovery using the supported account identifier;
-   the response does not unnecessarily reveal whether an account
    exists;
-   recovery credentials are time-limited and single-use;
-   recovery does not expose the existing password.

------------------------------------------------------------------------

### FR-AUTH-006 --- Reset Password

**Priority:** Must\
**Status:** Approved

The system MUST allow a user with a valid password-reset credential to
establish a new password.

**Acceptance criteria:**

-   expired or used reset credentials are rejected;
-   successful reset invalidates the reset credential;
-   the new password is stored using the approved password-storage
    mechanism;
-   reset credentials cannot be reused.

------------------------------------------------------------------------

## 4.2 Student Profile

### FR-PROFILE-001 --- View Profile

**Priority:** Must\
**Status:** Approved

The system MUST allow an authenticated student to view their own
preparation profile.

The profile includes, where applicable:

-   personal details;
-   college;
-   department;
-   CGPA;
-   skills;
-   target company.

------------------------------------------------------------------------

### FR-PROFILE-002 --- Update Profile

**Priority:** Must\
**Status:** Approved

The system MUST allow an authenticated student to update permitted
profile information.

**Acceptance criteria:**

-   only permitted fields can be changed;
-   invalid values are rejected;
-   successful changes are persisted;
-   the student can subsequently retrieve the updated information.

------------------------------------------------------------------------

### FR-PROFILE-003 --- Protect Student Profile Data

**Priority:** Must\
**Status:** Approved

The system MUST prevent users from reading or modifying another
student's protected profile data unless explicitly authorized.

------------------------------------------------------------------------

## 4.3 Target Company

### FR-COMPANY-001 --- Select Target Company

**Priority:** Must\
**Status:** Approved

The system MUST allow a student to select a supported target company for
placement preparation.

------------------------------------------------------------------------

### FR-COMPANY-002 --- Maintain Target Company

**Priority:** Must\
**Status:** Approved

The system MUST allow an authorized student to change their target
company.

The system MUST preserve the history or provenance required by
downstream analysis when changing the target company, if such history is
used by the product.

The exact historical model is a data-model decision.

------------------------------------------------------------------------

### FR-COMPANY-003 --- Company Requirement Context

**Priority:** Must\
**Status:** Approved

The system MUST associate skill-gap analysis with a defined company
requirement context.

The system MUST NOT silently treat stale, unknown, or unsupported
company requirements as current authoritative requirements.

The exact requirement source, freshness policy, and provenance model are
defined later.

------------------------------------------------------------------------

## 4.4 Resume

### FR-RESUME-001 --- Upload Resume

**Priority:** Must\
**Status:** Approved

The system MUST allow an authenticated student to upload a supported
resume document.

The baseline product requirement supports PDF resumes.

------------------------------------------------------------------------

### FR-RESUME-002 --- Validate Resume Upload

**Priority:** Must\
**Status:** Approved

The system MUST validate a resume upload before processing it.

Validation MUST include the controls required to establish that the file
is an acceptable supported document.

Exact size, content, malware, storage, and processing controls are
defined in the security and storage specifications.

------------------------------------------------------------------------

### FR-RESUME-003 --- Store Resume

**Priority:** Must\
**Status:** Approved

The system MUST persist the uploaded resume in a manner that associates
it with the owning student and preserves required metadata.

------------------------------------------------------------------------

### FR-RESUME-004 --- Extract Resume Content

**Priority:** Must\
**Status:** Approved

The system MUST extract usable text or structured information from a
supported resume before resume analysis.

If extraction fails, the system MUST report the processing failure
without presenting an unprocessed document as successfully analyzed.

------------------------------------------------------------------------

### FR-RESUME-005 --- Resume Analysis

**Priority:** Must\
**Status:** Approved

The system MUST provide an analysis of supported resume content using
the approved AI-assisted analysis workflow.

------------------------------------------------------------------------

### FR-RESUME-006 --- Resume Analysis Integrity

**Priority:** Must\
**Status:** Approved

Resume analysis MUST distinguish information supported by the resume
from information that cannot be established.

The system MUST NOT present AI-generated claims about a student's
education, experience, skills, achievements, projects, certifications,
or employment as confirmed facts when the available evidence does not
support them.

------------------------------------------------------------------------

### FR-RESUME-007 --- View Resume Analysis

**Priority:** Must\
**Status:** Approved

The system MUST allow the owning student to view the available analysis
for their resume.

Authorized staff may view permitted resume information according to the
authorization policy.

------------------------------------------------------------------------

### FR-RESUME-008 --- Resume Processing State

**Priority:** Must\
**Status:** Approved

The system MUST represent the relevant resume lifecycle state.

At minimum, the product MUST distinguish the meaningful states required
for:

-   upload;
-   processing;
-   successful analysis;
-   processing failure.

------------------------------------------------------------------------

## 4.5 Skill Gap

### FR-SKILLGAP-001 --- Generate Skill Gap

**Priority:** Must\
**Status:** Approved

The system MUST allow a student to obtain a skill-gap analysis based on:

1.  the student's available skill/evidence information; and
2.  the selected target company's approved requirement context.

------------------------------------------------------------------------

### FR-SKILLGAP-002 --- Identify Skill Status

**Priority:** Must\
**Status:** Approved

The skill-gap result MUST distinguish relevant skill states where
supported by available evidence.

The product model includes:

-   demonstrated;
-   inferred;
-   missing;
-   requiring verification.

The exact calculation rules are defined later.

------------------------------------------------------------------------

### FR-SKILLGAP-003 --- Explain Skill Gap

**Priority:** Must\
**Status:** Approved

The system SHOULD provide an understandable reason for identifying a
skill as a gap or development area.

Where a reliable source is available, the explanation SHOULD identify
the relevant requirement or evidence.

------------------------------------------------------------------------

### FR-SKILLGAP-004 --- Protect Skill Gap Integrity

**Priority:** Must\
**Status:** Approved

The system MUST NOT represent an AI-generated skill gap as an
authoritative hiring decision.

------------------------------------------------------------------------

## 4.6 Learning Roadmap

### FR-LEARNING-001 --- Generate Learning Recommendations

**Priority:** Must\
**Status:** Approved

The system MUST provide learning recommendations associated with
identified development areas.

------------------------------------------------------------------------

### FR-LEARNING-002 --- Associate Learning With Skill

**Priority:** Must\
**Status:** Approved

Each supported learning recommendation MUST identify the skill or
learning objective it is intended to address.

------------------------------------------------------------------------

### FR-LEARNING-003 --- Learning Resource Source

**Priority:** Must\
**Status:** Approved

The system MUST preserve the source information required to identify a
learning resource.

The original product requirements identify sources including YouTube,
NPTEL, Coursera, and LinkedIn Learning.

The system MUST NOT imply that a resource is currently available or
officially endorsed unless supported by the platform's resource data.

------------------------------------------------------------------------

### FR-LEARNING-004 --- Learning Progress

**Priority:** Must\
**Status:** Approved

The system MUST allow supported learning activities to have a trackable
completion state.

The exact definition of completion must be established before
implementation.

------------------------------------------------------------------------

### FR-LEARNING-005 --- Personalized Roadmap

**Priority:** Must\
**Status:** Approved

The system MUST organize relevant learning actions into a
student-specific roadmap based on available skill-gap information.

------------------------------------------------------------------------

## 4.7 Mock Interview

### FR-INTERVIEW-001 --- Start Mock Interview

**Priority:** Must\
**Status:** Approved

The system MUST allow an authenticated student to start a supported AI
mock interview.

The student selects the supported interview context, including company
and difficulty where applicable.

------------------------------------------------------------------------

### FR-INTERVIEW-002 --- Generate Interview Question

**Priority:** Must\
**Status:** Approved

The system MUST provide an interview question appropriate to the
configured interview context.

------------------------------------------------------------------------

### FR-INTERVIEW-003 --- Submit Answer

**Priority:** Must\
**Status:** Approved

The system MUST allow the student to submit an answer to an interview
question.

------------------------------------------------------------------------

### FR-INTERVIEW-004 --- Evaluate Answer

**Priority:** Must\
**Status:** Approved

The system MUST evaluate a submitted answer using the approved
evaluation workflow.

------------------------------------------------------------------------

### FR-INTERVIEW-005 --- Interview Score and Feedback

**Priority:** Must\
**Status:** Approved

The system MUST provide a supported score and feedback for a completed
mock interview evaluation.

The result MUST be represented as a CareerPilot practice evaluation and
MUST NOT be represented as an actual employer interview result.

------------------------------------------------------------------------

### FR-INTERVIEW-006 --- Interview Lifecycle

**Priority:** Must\
**Status:** Approved

The system MUST represent the relevant interview lifecycle states,
including:

-   not started;
-   in progress;
-   answer submission;
-   evaluation processing;
-   completed;
-   failed or unavailable evaluation.

------------------------------------------------------------------------

### FR-INTERVIEW-007 --- Interview History

**Priority:** Must\
**Status:** Approved

The system MUST allow a student to view their permitted completed
mock-interview results.

------------------------------------------------------------------------

## 4.8 Progress

### FR-PROGRESS-001 --- View Progress

**Priority:** Must\
**Status:** Approved

The system MUST allow a student to view their preparation progress.

------------------------------------------------------------------------

### FR-PROGRESS-002 --- Resume Score

**Priority:** Must\
**Status:** Approved

The system MUST expose the supported resume score associated with the
student's resume analysis.

The score calculation must be defined separately before implementation.

------------------------------------------------------------------------

### FR-PROGRESS-003 --- Interview Scores

**Priority:** Must\
**Status:** Approved

The system MUST expose supported mock-interview scores associated with
the student's completed evaluations.

------------------------------------------------------------------------

### FR-PROGRESS-004 --- Completed Skills

**Priority:** Must\
**Status:** Approved

The system MUST allow supported skill completion information to be
represented in student progress.

------------------------------------------------------------------------

### FR-PROGRESS-005 --- Progress Visualization

**Priority:** Should\
**Status:** Approved

The student experience SHOULD provide a progress visualization that
communicates meaningful preparation changes over time.

The visualization method is a UX decision.

------------------------------------------------------------------------

## 4.9 Staff Monitoring

### FR-STAFF-001 --- Staff Authentication

**Priority:** Must\
**Status:** Approved

The system MUST allow an authorized staff member to authenticate.

------------------------------------------------------------------------

### FR-STAFF-002 --- View Authorized Students

**Priority:** Must\
**Status:** Approved

The system MUST allow staff to view students within the staff member's
authorized scope.

------------------------------------------------------------------------

### FR-STAFF-003 --- Monitor Student Progress

**Priority:** Must\
**Status:** Approved

The system MUST allow authorized staff to review permitted student
preparation progress.

------------------------------------------------------------------------

### FR-STAFF-004 --- View Resume Reports

**Priority:** Must\
**Status:** Approved

The system MUST allow authorized staff to view supported resume-analysis
information for students within their permitted scope.

------------------------------------------------------------------------

### FR-STAFF-005 --- View Interview Performance

**Priority:** Must\
**Status:** Approved

The system MUST allow authorized staff to view supported mock-interview
performance information for students within their permitted scope.

------------------------------------------------------------------------

### FR-STAFF-006 --- Staff Dashboard

**Priority:** Must\
**Status:** Approved

The system MUST provide authorized staff with dashboard information
required by the approved product scope.

The baseline product identifies:

-   total students;
-   average resume score;
-   average interview score;
-   placement-preparation/readiness information;
-   top performers;
-   weak-performing areas or students.

Exact definitions and calculations must be established before
implementation of derived metrics.

------------------------------------------------------------------------

### FR-STAFF-007 --- Staff Reports

**Priority:** Must\
**Status:** Approved

The system MUST support the generation or retrieval of approved staff
reports.

Exact report formats and export requirements remain an open decision.

------------------------------------------------------------------------

## 4.10 Super Admin

### FR-ADMIN-001 --- Manage Staff Accounts

**Priority:** Must\
**Status:** Approved

The system MUST allow authorized Super Admin users to create and manage
staff accounts.

------------------------------------------------------------------------

### FR-ADMIN-002 --- Manage Companies

**Priority:** Must\
**Status:** Approved

The system MUST allow authorized Super Admin users to create, update,
and manage supported company records.

------------------------------------------------------------------------

### FR-ADMIN-003 --- Manage Learning Resources

**Priority:** Must\
**Status:** Approved

The system MUST allow authorized Super Admin users to manage supported
learning-resource records.

------------------------------------------------------------------------

### FR-ADMIN-004 --- Manage AI Configuration

**Priority:** Must\
**Status:** Approved

The system MUST allow authorized Super Admin users to manage approved AI
configuration.

Configuration changes MUST be constrained by the application's security
and validation rules.

------------------------------------------------------------------------

### FR-ADMIN-005 --- Platform Analytics

**Priority:** Must\
**Status:** Approved

The system MUST allow authorized Super Admin users to view supported
platform-level analytics.

------------------------------------------------------------------------

## 4.11 Audit and Accountability

### FR-AUDIT-001 --- Record Security-Sensitive Actions

**Priority:** Must\
**Status:** Approved

The system MUST record appropriate security-sensitive or administrative
actions required for accountability.

The exact event catalogue is defined in the security specification.

------------------------------------------------------------------------

## 4.12 Error and Failure Handling

### FR-ERROR-001 --- Explicit Operation Failure

**Priority:** Must\
**Status:** Approved

When a supported operation cannot be completed, the system MUST
communicate that the operation failed and MUST NOT represent the
operation as successful.

------------------------------------------------------------------------

### FR-ERROR-002 --- Preserve Data Integrity

**Priority:** Must\
**Status:** Approved

A failed operation MUST NOT leave partially persisted state that
violates the relevant business or data constraints.

------------------------------------------------------------------------

# 5. Non-Functional Requirements

The quality requirements below use the current ISO/IEC 25010:2023
product-quality model as a reference framework. ISO states that the 2023
edition is the current published product-quality model and provides
characteristics for specifying, measuring, and evaluating product
quality. citeturn0search0

These requirements are intentionally measurable where a reasonable
baseline can be defined now. Values that depend on deployment capacity
or measured workload remain targets to be established during
architecture and performance validation.

------------------------------------------------------------------------

## 5.1 Security

### NFR-SEC-001 --- Authentication Protection

The system MUST protect authenticated resources from unauthenticated
access.

### NFR-SEC-002 --- Authorization Enforcement

Authorization MUST be enforced server-side for every protected resource
and action.

### NFR-SEC-003 --- Least Privilege

Users MUST receive only the access required by their authorized
responsibilities and resource relationships.

### NFR-SEC-004 --- Secret Protection

The system MUST NOT store production secrets, credentials, private keys,
or tokens in source code or version-controlled configuration.

### NFR-SEC-005 --- Sensitive Data Exposure

The system MUST NOT expose passwords, password hashes, access tokens,
private credentials, or unnecessary sensitive student data through
normal API responses, logs, or client state.

### NFR-SEC-006 --- Input Validation

Untrusted input MUST be validated at application boundaries before it is
used in security-sensitive or data-sensitive operations.

### NFR-SEC-007 --- File Security

Uploaded files MUST be validated and processed according to the approved
file-security policy.

------------------------------------------------------------------------

## 5.2 Performance

### NFR-PERF-001 --- Responsive Common Operations

Common non-AI operations SHOULD provide timely feedback under the
supported workload.

The architecture specification must establish measurable latency targets
after the expected deployment environment and workload are defined.

### NFR-PERF-002 --- Long-Running Processing

Resume extraction, AI analysis, and other potentially long-running
operations MUST NOT require the user interface to assume that completion
is immediate.

The system MUST expose an appropriate processing state.

### NFR-PERF-003 --- Resource Protection

Expensive operations MUST have appropriate limits or controls to prevent
uncontrolled resource consumption.

------------------------------------------------------------------------

## 5.3 Reliability

### NFR-REL-001 --- Predictable Failure

Failures MUST result in explicit failure states rather than false
success.

### NFR-REL-002 --- Data Consistency

Successful persistence operations MUST satisfy applicable data integrity
constraints.

### NFR-REL-003 --- Recovery

Recoverable processing failures SHOULD support retry or reprocessing
where doing so is safe and idempotent.

------------------------------------------------------------------------

## 5.4 Availability

### NFR-AVAIL-001 --- Health Visibility

The deployed application SHOULD expose sufficient health information to
determine whether critical application dependencies are operational.

### NFR-AVAIL-002 --- Graceful Dependency Failure

Failure of a non-critical external dependency SHOULD degrade only the
affected capability where practical.

For example, failure of an AI provider should not make unrelated profile
functionality appear unavailable.

------------------------------------------------------------------------

## 5.5 Usability

### NFR-USE-001 --- Clear User Feedback

The system MUST clearly communicate important operation states,
validation errors, failures, and successful completion.

### NFR-USE-002 --- Consistent Terminology

The product MUST use consistent terminology for the same business
concept across supported user interfaces.

### NFR-USE-003 --- Action Clarity

Core student workflows SHOULD make the next supported preparation action
understandable without requiring the user to reconstruct it from
multiple unrelated screens.

------------------------------------------------------------------------

## 5.6 Accessibility

### NFR-A11Y-001 --- Keyboard Accessibility

Core workflows MUST support keyboard operation for applicable
interactive controls.

### NFR-A11Y-002 --- Form Accessibility

Interactive form controls MUST have programmatically associated labels
or equivalent accessible names.

### NFR-A11Y-003 --- Error Accessibility

Important validation and operation errors MUST be communicated in a
manner accessible to users of assistive technologies.

### NFR-A11Y-004 --- Contrast

Text and essential interface information MUST meet the accessibility
contrast requirements adopted by the project.

The exact conformance target will be established in the UX
specification.

------------------------------------------------------------------------

## 5.7 Maintainability

### NFR-MAINT-001 --- Explicit Contracts

Cross-module interactions MUST use explicit contracts rather than
undocumented coupling.

### NFR-MAINT-002 --- Supported Dependencies

Dependencies MUST use supported, stable releases. Where an LTS release
exists and is appropriate, the project SHOULD prefer it.

### NFR-MAINT-003 --- Controlled Changes

Breaking changes to APIs, database structures, authentication,
authorization, dependencies, or shared interfaces MUST be explicitly
identified, planned, validated, and documented.

### NFR-MAINT-004 --- Documentation Synchronization

Changes to behavior, architecture, API contracts, data structures,
security rules, UX behavior, or AI behavior MUST update their
corresponding source-of-truth specification.

------------------------------------------------------------------------

## 5.8 Compatibility

### NFR-COMP-001 --- Existing Backend Compatibility

Existing approved backend contracts MUST NOT be silently broken.

### NFR-COMP-002 --- Controlled Migration

When an existing contract must change, the change MUST define:

-   affected consumers;
-   compatibility impact;
-   migration path;
-   validation;
-   rollback or recovery strategy where applicable.

------------------------------------------------------------------------

## 5.9 Data Quality

### NFR-DATA-001 --- Data Provenance

The system MUST preserve provenance for data where provenance is
necessary to distinguish user-provided, source-backed,
application-derived, and AI-generated information.

### NFR-DATA-002 --- Referential Integrity

Persisted relationships MUST maintain the integrity rules defined by the
approved data model.

### NFR-DATA-003 --- No Silent Fabrication

The system MUST NOT persist AI-generated claims as verified facts
without the required validation or evidence.

------------------------------------------------------------------------

## 5.10 AI Quality

### NFR-AI-001 --- Context Control

AI features MUST use approved CareerPilot context and runtime inputs
rather than relying on general model knowledge as project-specific
truth.

### NFR-AI-002 --- Structured Output

AI responses used as application data SHOULD use an explicitly defined
structured contract.

### NFR-AI-003 --- Output Validation

AI-generated data MUST be validated before being treated as application
data.

### NFR-AI-004 --- Uncertainty Handling

When required evidence is unavailable or an AI result cannot be reliably
established, the system MUST represent the result as uncertain,
unsupported, or requiring review rather than presenting it as confirmed
fact.

### NFR-AI-005 --- Provider Abstraction

The product architecture SHOULD prevent individual product features from
becoming unnecessarily coupled to one AI provider or model.

### NFR-AI-006 --- AI Failure Isolation

AI provider failure MUST NOT corrupt unrelated persistent student data.

------------------------------------------------------------------------

# 6. Cross-Cutting Acceptance Requirements

### NFR-CROSS-001 --- State Completeness

Every data-dependent major feature MUST account for the applicable:

-   loading;
-   empty;
-   success;
-   validation error;
-   processing;
-   failure;
-   unauthorized;
-   forbidden;
-   unavailable/offline

states.

### NFR-CROSS-002 --- Observability

Important security, administrative, asynchronous-processing, and AI
operations MUST produce sufficient operational information for
troubleshooting and accountability without exposing secrets or
unnecessary personal data.

### NFR-CROSS-003 --- Traceability

Every approved functional requirement MUST be traceable to its
implementation and verification evidence before the corresponding
feature is considered complete.

------------------------------------------------------------------------

# 7. Requirements Not Yet Quantified

The following values intentionally remain unresolved because the product
sources do not provide sufficient evidence to choose a defensible
number:

-   API latency targets;
-   concurrent-user targets;
-   throughput targets;
-   uptime/SLO targets;
-   maximum resume size;
-   AI response-time target;
-   AI cost limits;
-   exact password policy values;
-   exact token lifetimes;
-   exact data-retention periods;
-   exact accessibility conformance target;
-   exact report/export formats;
-   exact readiness calculation;
-   exact score calculation.

These MUST be resolved in the appropriate technical specification before
production implementation depends on them.

------------------------------------------------------------------------

# 8. Traceability Categories

The following requirement domains are expected to map into later
specifications:

  -----------------------------------------------------------------------
  Domain                              Primary downstream document
  ----------------------------------- -----------------------------------
  Authentication                      `06-security-spec.md`

  Authorization                       `06-security-spec.md` +
                                      `05-data-model.md`

  Profile                             `03-architecture.md` +
                                      `04-api-spec.yaml` +
                                      `05-data-model.md`

  Company                             `03-architecture.md` +
                                      `05-data-model.md`

  Resume                              `03-architecture.md` +
                                      `04-api-spec.yaml` +
                                      `05-data-model.md` +
                                      `06-security-spec.md`

  Skill Gap                           `03-architecture.md` +
                                      `08-ai-spec.md`

  Learning                            `03-architecture.md` +
                                      `08-ai-spec.md` +
                                      `09-integrations-spec.md`

  Interview                           `03-architecture.md` +
                                      `08-ai-spec.md`

  Progress                            `03-architecture.md` +
                                      `05-data-model.md`

  Staff                               `06-security-spec.md` +
                                      `04-api-spec.yaml`

  Super Admin                         `06-security-spec.md` +
                                      `04-api-spec.yaml`

  Testing                             `10-testing-spec.md`

  Operations                          `11-deployment-operations.md`
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 9. Deferred Requirements

The following are deliberately **not converted into detailed
requirements yet** because the product specification identifies them as
unresolved:

1.  Exact company requirement data source.
2.  Company requirement freshness policy.
3.  Skill taxonomy.
4.  Resume scoring formula.
5.  Skill-gap scoring formula.
6.  Learning recommendation ranking.
7.  Interview evaluation rubric.
8.  Progress aggregation rules.
9.  Placement-readiness definition.
10. Staff visibility/scope model.
11. Reporting/export formats.
12. Exact AI provider/model.
13. External integration set.
14. Storage implementation.
15. Deployment targets.

No implementation should invent these decisions merely to satisfy a
requirement placeholder.

------------------------------------------------------------------------

# 10. Requirement Change Control

A requirement change MUST:

1.  identify the affected requirement IDs;
2.  state the reason for the change;
3.  identify affected product behavior;
4.  identify affected technical specifications;
5.  identify affected tests;
6.  update traceability;
7.  create or update an ADR when the change introduces a significant
    architectural decision;
8.  create or update an ExecPlan when implementation is complex,
    security-sensitive, migratory, or breaking.

Requirement identifiers SHOULD remain stable after baseline approval.

------------------------------------------------------------------------

# 11. Definition of Done

A requirement is implementation-complete only when:

-   its behavior is implemented;
-   applicable authorization is enforced;
-   applicable failure states are handled;
-   relevant data integrity rules are satisfied;
-   automated or appropriate verification exists;
-   regression impact has been checked;
-   related specifications are synchronized;
-   traceability is updated;
-   no unsupported behavior has been silently introduced.

------------------------------------------------------------------------

# 12. Standards Basis

This requirements specification uses **ISO/IEC/IEEE 29148:2018** as the
requirements-engineering reference baseline. ISO states that the 2018
edition was reviewed and confirmed in 2024 and remains the current
published edition, while a new third edition is currently under
development. citeturn0search3turn0search10

For quality requirements, the document references **ISO/IEC
25010:2023**, the current published product-quality model. ISO describes
it as a reference model for specifying, measuring, and evaluating
product quality. citeturn0search0

This project does not claim formal certification or conformance to
either standard. They are used as engineering references.

------------------------------------------------------------------------

# 13. Next Document

The next authoritative document is:

> **`03-architecture.md`**

It will define the system structure, boundaries, modules, runtime flows,
technology constraints, and major architectural decisions without
duplicating these requirements.
