# CareerPilot Product Specification

**Document ID:** CP-DOC-01\
**Document:** Product Specification\
**Status:** Baseline Draft\
**Version:** 0.1.0\
**Product:** CareerPilot\
**Product Type:** AI-Powered Placement Preparation Platform\
**Primary Audience:** Students preparing for placements, staff/faculty
monitoring students, platform administrators\
**Authority:** Product-level source of truth\
**Last Updated:** 2026-10-03

------------------------------------------------------------------------

## 1. Purpose

CareerPilot is a placement-preparation and guidance platform that helps
students prepare for campus placements through a continuous,
personalized preparation loop.

The product is designed around:

> **Target Company → Resume Analysis → Skill Gap → Learning Roadmap →
> Practice → AI Mock Interview → Feedback → Progress → Next Action**

CareerPilot is not a placement-outcome predictor and is not intended to
replace institutional placement management systems.

This document defines **what CareerPilot is expected to provide**.
Technical implementation details belong in the architecture, API, data,
security, UX, AI, testing, and operations specifications.

------------------------------------------------------------------------

## 2. Product Problem

Students often prepare for placements using disconnected resources and
without a clear understanding of:

-   what a target company or role expects;
-   which skills they already demonstrate;
-   which skills are missing or weak;
-   what they should learn next;
-   whether their resume communicates their skills effectively;
-   how they are performing in interview practice; and
-   what action they should take after receiving feedback.

Staff also need a consolidated view of student preparation progress
rather than relying only on manual follow-up.

CareerPilot addresses this by connecting preparation activities into one
student-centered workflow and providing staff visibility into relevant
progress.

------------------------------------------------------------------------

## 3. Product Goals

### 3.1 Student goals

CareerPilot shall help a student:

1.  create and maintain a preparation profile;
2.  identify a target company;
3.  upload and analyze a resume;
4.  understand relevant skill gaps;
5.  receive a personalized learning roadmap;
6.  practice through mock interviews;
7.  receive structured feedback;
8.  track preparation progress; and
9.  identify the next useful preparation action.

### 3.2 Staff goals

CareerPilot shall help authorized staff:

1.  view students within their permitted scope;
2.  monitor preparation progress;
3.  review resume-related reports;
4.  review interview performance;
5.  view relevant dashboard metrics; and
6.  generate supported reports.

### 3.3 Super Admin goals

CareerPilot shall help authorized super administrators:

1.  manage staff accounts;
2.  manage companies;
3.  manage learning resources;
4.  manage supported AI configuration; and
5.  view broader platform analytics.

------------------------------------------------------------------------

## 4. Product Scope

### 4.1 In scope

The initial product scope consists of:

-   authentication and account access;
-   role-aware access for Student, Staff, and Super Admin;
-   student profile management;
-   target-company selection;
-   resume upload and processing;
-   AI-assisted resume analysis;
-   skill-gap identification;
-   personalized learning recommendations and roadmap;
-   AI mock interviews;
-   answer evaluation and feedback;
-   student progress tracking;
-   staff monitoring;
-   reporting;
-   company and learning-resource administration;
-   AI configuration controlled by authorized administrators.

### 4.2 Out of scope for the baseline product

The following are not part of the baseline product unless separately
approved:

-   guaranteeing placement outcomes;
-   predicting whether a particular student will get hired;
-   automatically applying to jobs on behalf of students;
-   replacing official college placement processes;
-   making employment decisions on behalf of companies;
-   fabricating resume achievements or student evidence;
-   treating AI output as authoritative without application validation;
-   introducing microservices solely for architectural novelty;
-   introducing integrations that are not required by an approved
    product requirement.

------------------------------------------------------------------------

## 5. Users and Responsibilities

### 5.1 Student

A Student is the primary product user.

The Student can:

-   register and log in;
-   maintain a profile;
-   select a target company;
-   upload a resume;
-   view resume analysis;
-   view skill gaps;
-   view a learning roadmap;
-   attend mock interviews;
-   view scores and feedback;
-   track preparation progress.

### 5.2 Staff

Staff are authorized institutional users responsible for monitoring
students.

Staff can:

-   log in;
-   view students within their permitted scope;
-   monitor progress;
-   view resume reports;
-   view interview scores;
-   view supported dashboard metrics;
-   generate supported reports.

The exact scope of staff visibility is an authorization decision and
must not be inferred from the role name alone.

### 5.3 Super Admin

Super Admin is the platform-management role.

Super Admin can:

-   create and manage staff accounts;
-   manage companies;
-   manage learning resources;
-   manage AI configuration;
-   view platform-level analytics.

Administrative permissions must be enforced by the backend authorization
system.

------------------------------------------------------------------------

## 6. Core Student Experience

The primary student experience is organized around a repeatable
preparation loop.

``` text
Target Company
      ↓
Resume Upload
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
      ↺
```

The system should make the next meaningful preparation action clear
without forcing the student to manually reconstruct their preparation
plan from separate modules.

------------------------------------------------------------------------

## 7. Product Capabilities

### 7.1 Authentication

The product shall support:

-   registration;
-   login;
-   JWT-based authenticated access;
-   forgot-password flow;
-   reset-password flow;
-   role-aware access.

Authentication behavior and security controls are specified separately
in the Security Specification.

### 7.2 Student Profile

The profile shall support the student's relevant preparation
information, including:

-   personal details;
-   college;
-   department;
-   CGPA;
-   skills;
-   target company.

The product must distinguish user-provided facts from AI-generated
analysis.

### 7.3 Target Company

A student shall be able to select a company they are preparing for.

The selected company provides context for downstream preparation
features such as skill-gap analysis and learning recommendations.

A company requirement must have a defined source and freshness policy
before it is treated as authoritative.

### 7.4 Resume

The baseline resume flow is:

``` text
Upload PDF
   ↓
Store Resume
   ↓
Extract Text
   ↓
Persist Extracted Information
   ↓
Analyze
   ↓
Persist Analysis
   ↓
Display Report
```

The product shall allow the student to review the resulting analysis.

AI analysis must not invent:

-   skills;
-   experience;
-   projects;
-   achievements;
-   certifications;
-   employment;
-   education;
-   interview results.

If information cannot be reliably established from the available input,
the product should represent it as unknown, unsupported, or requiring
confirmation rather than presenting it as fact.

### 7.5 Skill Gap

The baseline skill-gap flow is:

``` text
Target Company
      ↓
Relevant Requirements
      ↓
Student Evidence / Resume Skills
      ↓
Comparison
      ↓
Missing or Weak Skills
      ↓
Suggested Development Actions
```

The product shall distinguish, where supported by evidence:

-   demonstrated skills;
-   inferred skills;
-   missing skills;
-   skills requiring verification.

A skill-gap result is guidance, not a hiring decision.

### 7.6 Learning Roadmap

The learning module shall convert relevant skill gaps into learning
actions.

The original requirements identify resources such as:

-   YouTube;
-   NPTEL;
-   Coursera;
-   LinkedIn Learning.

The platform must not imply endorsement or current availability of a
resource unless the corresponding source data is available and current.

A learning recommendation should explain, where supported:

-   the target skill;
-   why the skill matters;
-   the recommended resource or activity;
-   expected learning objective;
-   completion status.

### 7.7 AI Mock Interview

The baseline flow is:

``` text
Student
   ↓
Choose Company
   ↓
Choose Difficulty
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

The interview experience shall preserve the distinction between:

-   question generation;
-   student response;
-   evaluation;
-   score;
-   feedback.

Scores must not be presented as equivalent to an actual employer
interview result.

### 7.8 Progress

The student progress area shall support, at minimum:

-   resume score;
-   mock interview scores;
-   completed skills;
-   progress visualization.

The exact score calculation and aggregation rules are not finalized by
the source requirements and must be defined before implementation of
derived readiness metrics.

### 7.9 Staff Monitoring

The staff experience shall provide authorized visibility into:

-   students;
-   progress;
-   resume reports;
-   interview scores;
-   dashboard metrics;
-   supported reports.

Staff must only see data allowed by the authorization policy.

### 7.10 Super Admin

Super Admin functionality shall cover:

-   staff management;
-   company management;
-   learning-resource management;
-   AI configuration;
-   broader analytics.

Configuration changes that affect AI behavior, authorization, security,
or data integrity require appropriate auditability.

------------------------------------------------------------------------

## 8. Product Information Architecture

The product should be organized around user goals rather than
implementation modules.

### Student

``` text
Dashboard
├── Preparation Overview
├── Target Company
├── Resume
│   └── Analysis
├── Skill Gap
├── Learning Roadmap
├── Mock Interview
├── Progress
└── Profile
```

### Staff

``` text
Dashboard
├── Students
├── Student Progress
├── Resume Reports
├── Interview Performance
└── Reports
```

### Super Admin

``` text
Dashboard
├── Staff
├── Companies
├── Learning Resources
├── AI Configuration
└── Analytics
```

The final route structure belongs to the frontend specification and may
change without changing this product-level information architecture.

------------------------------------------------------------------------

## 9. Product Principles

### 9.1 Evidence over assumption

CareerPilot should distinguish:

-   user-provided information;
-   verified external information;
-   application-calculated information;
-   AI-generated interpretation.

The product must not present uncertain AI output as verified fact.

### 9.2 Guidance over prediction

CareerPilot helps students decide what to prepare next.

It should not present unsupported predictions about whether a student
will be placed.

### 9.3 Actionable feedback

Every analysis should, where possible, lead to a useful action.

Example:

``` text
Gap:
Spring Boot testing

↓
Why it matters:
Relevant to selected preparation target

↓
Action:
Complete selected learning resource

↓
Practice:
Build/test a small REST endpoint

↓
Validate:
Take an assessment or mock interview
```

### 9.4 Student control

Students should be able to review and understand AI-generated
recommendations.

AI-generated recommendations must not silently modify important student
data.

### 9.5 Institutional visibility with least privilege

Staff visibility exists to support student preparation.

It must not become unrestricted access to all student data.

### 9.6 Consistency

The same concept should have one product meaning.

Examples:

-   one definition of a skill;
-   one definition of completed learning;
-   one definition of an interview session;
-   one definition of a resume analysis;
-   one definition of a progress event.

Implementation details may evolve, but the product meaning should remain
stable.

------------------------------------------------------------------------

## 10. AI Product Boundary

AI is an assisting capability inside CareerPilot, not the system of
record.

The application remains authoritative for:

-   identity;
-   authorization;
-   stored student data;
-   completion state;
-   scores produced by deterministic application rules;
-   audit records;
-   resource metadata;
-   company records.

AI may assist with:

-   extracting information;
-   interpreting resume content;
-   identifying candidate skill gaps;
-   generating learning suggestions;
-   generating interview questions;
-   evaluating answers according to an approved rubric.

AI output must be:

1.  constrained by approved context;
2.  structured where practical;
3.  validated before persistence or display;
4.  traceable to its relevant input/source where required;
5.  treated as uncertain when evidence is insufficient.

The product must not rely on the model's general training knowledge as
the project's source of truth.

------------------------------------------------------------------------

## 11. Product Data Trust Levels

CareerPilot should use an explicit trust distinction.

  -----------------------------------------------------------------------
  Trust level             Example                 Product treatment
  ----------------------- ----------------------- -----------------------
  User-provided           CGPA, project, skill    Store as user-provided
                          entered by student      data

  Source-backed           Company requirement     Show source/provenance
                          from an approved source where appropriate

  Application-derived     Progress total          Treat as deterministic
                          calculated from stored  application data
                          events                  

  AI-generated            Resume interpretation,  Mark and validate as
                          recommendation          AI-derived

  Unverified              Information that cannot Do not present as
                          be established          confirmed fact
  -----------------------------------------------------------------------

This classification is a product rule. Detailed provenance and
validation mechanisms belong in the AI and data specifications.

------------------------------------------------------------------------

## 12. Product States

Every major data-dependent feature must account for the relevant
lifecycle states:

``` text
Loading
Empty
Ready / Success
Validation Error
Processing
Failed
Unauthorized
Forbidden
Unavailable
```

Examples:

### Resume

``` text
No resume
   ↓
Uploading
   ↓
Processing
   ↓
Analysis ready
   ↓
Analysis failed
```

### Mock Interview

``` text
Not started
   ↓
In progress
   ↓
Submitting
   ↓
Evaluation processing
   ↓
Completed
   ↓
Evaluation unavailable / failed
```

These states are product requirements. Exact UI presentation belongs in
the UX specification.

------------------------------------------------------------------------

## 13. Accessibility and Usability Baseline

CareerPilot shall be designed for:

-   keyboard operation;
-   readable content hierarchy;
-   clear form labels;
-   understandable validation messages;
-   sufficient contrast;
-   responsive layouts;
-   predictable interaction behavior;
-   accessible status and error communication.

The detailed accessibility acceptance criteria will be defined in the UX
and testing specifications.

------------------------------------------------------------------------

## 14. Product Quality Attributes

The product shall prioritize:

### Security

Student and staff data must be protected through authentication,
authorization, secure data handling, and appropriate auditing.

### Reliability

Important operations should fail predictably and preserve data
integrity.

### Maintainability

The system should favor clear module boundaries, explicit contracts,
supported dependencies, and minimal unnecessary complexity.

### Performance

Common student workflows should provide timely feedback and avoid
unnecessary network or AI calls.

### Accessibility

Core workflows should be usable with keyboard and assistive technologies
where applicable.

### Explainability

AI-assisted recommendations and analyses should provide enough context
for the user to understand what was evaluated and why an action was
suggested.

### Compatibility

Existing approved backend contracts must not be changed silently.

------------------------------------------------------------------------

## 15. Product Non-Goals

CareerPilot will not:

-   guarantee a job or placement;
-   determine a student's employability as an authoritative decision;
-   replace staff judgment;
-   make hiring decisions;
-   fabricate student information;
-   treat an AI score as an employer score;
-   automatically modify student records based solely on an AI response;
-   introduce technology solely because it is fashionable;
-   add features without a documented product reason.

------------------------------------------------------------------------

## 16. Success Criteria

The baseline product should make the following journey demonstrable:

``` text
Student registers
      ↓
Creates profile
      ↓
Selects target company
      ↓
Uploads resume
      ↓
Receives resume analysis
      ↓
Views skill gaps
      ↓
Receives learning roadmap
      ↓
Practices
      ↓
Completes AI mock interview
      ↓
Receives feedback
      ↓
Views progress
      ↓
Identifies next preparation action
```

For staff:

``` text
Staff logs in
      ↓
Views authorized students
      ↓
Reviews preparation progress
      ↓
Reviews resume/interview information
      ↓
Uses supported reports
```

For Super Admin:

``` text
Super Admin logs in
      ↓
Manages staff
      ↓
Manages companies/resources
      ↓
Manages approved AI configuration
      ↓
Views platform analytics
```

These flows are product-level acceptance journeys. Detailed test cases
belong in the testing specification.

------------------------------------------------------------------------

## 17. Requirements Identification Scheme

Product requirements should use stable identifiers.

Format:

``` text
FR-<DOMAIN>-<NUMBER>
NFR-<DOMAIN>-<NUMBER>
```

Examples:

``` text
FR-AUTH-001
FR-PROFILE-001
FR-RESUME-001
FR-SKILLGAP-001
FR-LEARNING-001
FR-INTERVIEW-001
FR-PROGRESS-001
FR-STAFF-001
FR-ADMIN-001

NFR-SEC-001
NFR-PERF-001
NFR-A11Y-001
NFR-REL-001
NFR-MAINT-001
```

Identifiers are stable references. Renaming an identifier should be
treated as a controlled documentation change because downstream API,
test, implementation, and traceability references may depend on it.

------------------------------------------------------------------------

## 18. Source and Authority Rules

### Product source of truth

This document defines product intent and scope.

### Requirements source of truth

`02-requirements.md` defines implementable functional and non-functional
requirements.

### Technical source of truth

`03-architecture.md`, `04-api-spec.yaml`, `05-data-model.md`, and
subsequent technical specifications define implementation contracts.

### Existing-system source

The existing backend remains the compatibility baseline until an
approved migration changes it.

### AI context

AI agents must use the repository's approved specifications,
`AGENTS.md`, `skills/`, source code, tests, and approved runtime data
rather than treating general model knowledge as project truth.

------------------------------------------------------------------------

## 19. Known Open Decisions

The following are intentionally not invented by this document and must
be resolved in later specifications:

1.  Exact company requirement data source.
2.  Company requirement freshness and provenance rules.
3.  Exact skill taxonomy and normalization model.
4.  Exact resume scoring model.
5.  Exact skill-gap scoring model.
6.  Exact learning recommendation ranking.
7.  Exact mock-interview evaluation rubric.
8.  Exact progress aggregation rules.
9.  Whether and how a placement-readiness metric is defined.
10. Exact staff visibility scope.
11. Exact reporting/export requirements.
12. Exact AI provider/model selection.
13. Exact AI agent/tool contracts.
14. Exact external integrations.
15. Exact storage and document-processing strategy.

Until these decisions are formally specified, implementation must not
silently invent them.

------------------------------------------------------------------------

## 20. Change Control

Changes to this document should be made when:

-   product scope changes;
-   user roles change;
-   core user journeys change;
-   a product capability is added or removed;
-   a product-level non-goal changes;
-   a product rule affecting downstream architecture changes.

A change that affects APIs, database structure, security, authorization,
AI contracts, or existing backend behavior must also update the relevant
technical specification and, when required, an ADR or ExecPlan.

------------------------------------------------------------------------

## 21. Definition of Done for this Specification

This document is considered baselined when:

-   product purpose is explicit;
-   target users are explicit;
-   roles are explicit;
-   core capabilities are explicit;
-   core journeys are explicit;
-   scope and non-goals are explicit;
-   AI's product boundary is explicit;
-   trust distinctions are explicit;
-   important product states are explicit;
-   requirements have stable identifiers;
-   unresolved decisions are explicitly listed;
-   no unsupported product behavior has been invented;
-   downstream specifications can reference this document without
    redefining product intent.

------------------------------------------------------------------------

## 22. Standards and Engineering Basis

This specification uses a lightweight requirements-engineering structure
influenced by **ISO/IEC/IEEE 29148:2018**, the current published edition
of the requirements-engineering standard as of this document version.
The standard was reviewed and confirmed in 2024; a newer edition is
currently under development, so this project does not treat the draft as
a normative baseline.

The document intentionally uses only the parts useful to CareerPilot:
explicit purpose, scope, stakeholders/users, requirements
identification, constraints, acceptance-oriented outcomes, traceability,
and controlled change.

This document does not claim certification or formal conformance to the
standard.

------------------------------------------------------------------------

## 23. Next Document

The next authoritative document is:

> **`02-requirements.md`**

It will convert this product specification into precise functional and
non-functional requirements without introducing new product scope.
