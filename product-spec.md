---
date: 2026-10-03
status: Baseline Product Specification
subtitle: Product Specification
title: AI-Powered Placement Preparation Platform
version: 1.0.0
---

# 1. Document Purpose

This document is the product-level source of truth for the AI-Powered
Placement Preparation Platform.

It defines:

-   the product problem and purpose
-   users and roles
-   core capabilities
-   end-to-end user journeys
-   functional scope
-   product behavior
-   UX principles
-   information architecture
-   key states
-   success criteria
-   non-goals
-   boundaries for future implementation

This document describes **what the product must do**. Technical
implementation details belong in the architecture, API, database, AI,
UI, security, and testing specifications.

The existing project backend is retained as the implementation starting
point. This specification does not authorize replacing working backend
behavior.

------------------------------------------------------------------------

# 2. Product Summary

## 2.1 Product Name

**AI-Powered Placement Preparation Platform**

Working product identity for the interface may use **PlacementAI** if
approved separately as the product brand.

## 2.2 Product Purpose

The platform helps college students prepare for campus placements
through personalized preparation based on the company they are
targeting.

The core product loop is:

**Target Company → Resume Analysis → Skill Gap → Learning Roadmap →
Practice → AI Mock Interview → Feedback → Progress → Next Action**

The platform is intended to reduce random or disconnected preparation by
giving students a structured view of what they have, what they are
missing, and what they should work on next.

The source project description identifies the core capabilities as AI
Resume Analysis, Skill Gap Identification, Personalized Learning
Roadmap, AI Mock Interviews, Progress Tracking, and a Faculty Monitoring
Dashboard.

------------------------------------------------------------------------

# 3. Problem Statement

Students preparing for placements may have difficulty connecting their
current skills and resume with the requirements of a particular company.

The platform addresses this by providing a unified preparation
experience in which a student can:

1.  create a profile
2.  choose a target company
3.  upload a resume
4.  receive resume analysis
5.  identify skill gaps
6.  receive learning recommendations
7.  practice through mock interviews
8.  receive feedback
9.  track preparation progress

The product is therefore a **placement preparation and guidance
platform**, not merely a placement-management or job-listing system.

------------------------------------------------------------------------

# 4. Product Vision

Build a focused placement preparation experience in which every major
student action contributes to a clear preparation journey.

The product should help the student answer three questions at any point:

1.  **Where am I now?**
2.  **What do I need to improve?**
3.  **What should I do next?**

The platform should feel like a structured AI placement coach supported
by measurable progress, rather than a collection of unrelated tools.

------------------------------------------------------------------------

# 5. Product Principles

## 5.1 Preparation Before Prediction

The platform's primary purpose is to help the student prepare.

It should not present placement outcomes as guaranteed predictions.

## 5.2 Personalization

Recommendations should use the student's relevant profile, resume,
target company, skills, learning progress, and interview history where
those data are available.

## 5.3 Actionable Guidance

Where the product identifies a gap, it should provide a meaningful next
action whenever the required data and resources are available.

## 5.4 Evidence Over Decoration

Scores, progress indicators, recommendations, and reports should be
connected to actual application data or clearly identified as
AI-generated guidance.

## 5.5 One Continuous Journey

Resume, skill gap, learning, interview, and progress should feel
connected.

## 5.6 Simplicity

The interface should prioritize the student's next useful action rather
than displaying every available feature at once.

## 5.7 Trust

The product must clearly distinguish:

-   stored user data
-   calculated metrics
-   AI-generated analysis
-   recommendations
-   system status

------------------------------------------------------------------------

# 6. Users and Roles

The product has three roles.

## 6.1 Student

The Student is the primary product user.

The source requirements give the Student access to registration, login,
profile updates, resume upload, dream/target company selection, skill
gap reports, learning roadmap, mock interviews, scores, and progress
tracking.

### Student capabilities

-   Register
-   Login
-   Update profile
-   Select target company
-   Manage skills
-   Upload resume
-   View resume analysis
-   View skill gap
-   View learning roadmap
-   Access recommended learning resources
-   Attend AI mock interviews
-   Submit interview answers
-   View interview scores and feedback
-   Track completed skills
-   Track preparation progress
-   View placement-readiness information when supported by the
    implemented metric

------------------------------------------------------------------------

## 6.2 Staff/Admin

Staff/Admin is responsible for monitoring student preparation.

The source requirements define access to student records, progress
monitoring, resume reports, interview scores, dashboard information, and
report generation.

### Staff/Admin capabilities

-   Login
-   View students
-   View student preparation information
-   Monitor progress
-   View resume reports
-   View interview scores
-   View dashboard metrics
-   Generate reports
-   View weak/common skill areas
-   View placement-readiness information when available

------------------------------------------------------------------------

## 6.3 Super Admin

Super Admin manages platform-level information and administration.

The source requirements define staff-account creation, staff management,
company management, learning-resource management, complete analytics,
and AI configuration.

### Super Admin capabilities

-   Create staff accounts
-   Manage staff
-   Manage companies
-   Manage learning resources
-   Manage approved AI configuration
-   View complete analytics

------------------------------------------------------------------------

# 7. Product Scope

## 7.1 Authentication

Authentication must support:

-   registration
-   login
-   JWT authentication
-   role-based access
-   forgot password
-   reset password

These are part of the defined functional requirements.

The product must not allow normal public registration to self-assign
privileged roles.

------------------------------------------------------------------------

# 8. Student Product

## 8.1 Student Profile

The profile must support the information defined in the requirements:

-   personal details
-   college
-   department
-   CGPA
-   skills
-   target company

The profile should be editable by the student.

### UX goal

The profile should feel like a preparation profile rather than a generic
account settings page.

------------------------------------------------------------------------

## 8.2 Target Company

The student selects a company they want to prepare for.

Example:

**Target Company: Zoho**

The selected company becomes relevant context for:

-   skill-gap analysis
-   learning recommendations
-   mock interview setup
-   preparation progress

The source system design explicitly describes a student selecting a
target company and the AI comparing resume skills with required skills.

### Product rule

Changing the target company must not silently erase the student's
previous preparation history.

The product should clearly distinguish:

-   current target company
-   historical preparation
-   company-specific recommendations

The exact persistence model for multiple target companies is an
implementation decision and must be documented before development if it
is introduced.

------------------------------------------------------------------------

# 9. Resume Module

## 9.1 Purpose

Allow the student to upload a PDF resume and receive an analysis.

The defined flow is:

**Upload PDF → Extract Text → Store Resume → Send to AI → Receive
Analysis → Display Skill Report**.

## 9.2 Student experience

The Resume page should support:

1.  upload
2.  processing state
3.  analysis result
4.  readable report
5.  actionable suggestions

### Result areas

The product may present the available analysis as:

-   resume score, if implemented
-   detected skills
-   skill gaps
-   strengths
-   improvement suggestions
-   relevant extracted information

The exact scoring formula must not be invented in the UI until defined
in the product/AI specification.

------------------------------------------------------------------------

# 10. Skill Gap Module

## 10.1 Purpose

Identify differences between the student's current skills and the skills
required for the selected target company.

The defined source flow is:

**Student selects target company → AI compares resume skills versus
required skills → Missing Skills → Suggestions.**

## 10.2 Product output

The Skill Gap page should clearly communicate:

-   skills already matched
-   missing skills
-   current preparation state
-   recommended next action

The product should avoid presenting unsupported company requirements as
facts.

Where requirements come from an external or maintained company dataset,
the source and freshness of those requirements should be identifiable in
the underlying system.

------------------------------------------------------------------------

# 11. Learning Recommendation Module

## 11.1 Purpose

Turn identified missing skills into a practical learning path.

The defined concept is:

**Missing Skill → Recommendations**

The source requirements identify resources such as:

-   YouTube
-   NPTEL
-   Coursera
-   LinkedIn Learning

## 11.2 Personalized Roadmap

The roadmap should organize recommended learning into an understandable
sequence.

Each roadmap item should be able to communicate, where data exists:

-   skill/topic
-   why it matters
-   current progress
-   recommended resource
-   learning status
-   next action

The roadmap should not claim a resource is officially endorsed by a
company unless the product has evidence for that claim.

------------------------------------------------------------------------

# 12. AI Mock Interview Module

## 12.1 Purpose

Give students an interactive practice interview.

The defined flow is:

**Student chooses company → chooses difficulty → AI asks question →
student types answer → AI evaluates → score → feedback.**

## 12.2 Interview setup

The product should support, where the backend provides the data:

-   company
-   difficulty
-   interview type if implemented

## 12.3 Interview session

The interface should clearly show:

-   current question
-   progress through the interview
-   answer input
-   submit action
-   session state

## 12.4 Evaluation

After an answer is evaluated, the product may show:

-   score
-   feedback
-   strengths
-   improvement areas
-   recommended topics

The evaluation must be presented as AI feedback, not as an
unquestionable human assessment.

------------------------------------------------------------------------

# 13. Progress Module

The Progress module must allow the student to view preparation progress.

The source requirements identify:

-   resume score
-   mock interview scores
-   completed skills
-   progress graph

## 13.1 Progress dashboard

The student should be able to understand:

-   what has been completed
-   what remains
-   whether scores are improving
-   what the next recommended action is

Charts should only display metrics that are actually available from the
backend.

------------------------------------------------------------------------

# 14. Placement Readiness

Placement readiness is a product-level summary concept used by the
student/admin experience.

It may combine relevant preparation signals such as:

-   resume preparation
-   skill completion
-   interview performance
-   learning progress

However, the current project specification does **not define the exact
formula**.

Therefore:

**No readiness formula is considered finalized by this document.**

Before implementation of a calculated readiness score, define:

-   inputs
-   weighting
-   normalization
-   minimum data requirements
-   handling of missing data
-   update frequency
-   explanation shown to the student

The UI must not imply that the score predicts whether a student will be
placed.

------------------------------------------------------------------------

# 15. Staff/Admin Product

## 15.1 Admin Dashboard

The defined dashboard contains:

-   total students
-   resume scores
-   interview scores
-   weak areas
-   placement readiness

The detailed requirements also identify:

-   total students
-   average resume score
-   average interview score
-   placement readiness
-   top performers
-   students requiring attention

## 15.2 Student monitoring

Admin should be able to inspect relevant student preparation information
without exposing data outside the role's authorized scope.

## 15.3 Reports

Admin should be able to generate reports supported by the backend.

The exact report formats are not finalized in the current product
specification and must be specified before implementation.

------------------------------------------------------------------------

# 16. Super Admin Product

The Super Admin area manages platform-level configuration.

Defined areas:

-   staff management
-   company management
-   learning resources
-   AI configuration
-   analytics

The Super Admin experience should be operational and management-focused
rather than student-coaching focused.

------------------------------------------------------------------------

# 17. Core User Journeys

## 17.1 New Student Journey

**Landing → Register → Login → Profile Setup → Select Target Company →
Dashboard**

## 17.2 Resume Journey

**Dashboard → Resume → Upload → Processing → AI Analysis → Skill Report
→ Skill Gap**

## 17.3 Skill-to-Learning Journey

**Skill Gap → Missing Skill → Recommendation → Learning Resource →
Progress**

## 17.4 Mock Interview Journey

**Dashboard → Mock Interview → Select Company/Difficulty → Question →
Answer → AI Evaluation → Feedback → Progress**

## 17.5 Continuous Preparation Loop

**Analyze → Identify → Learn → Practice → Evaluate → Track → Recommend
Next Action**

This loop is the central product experience.

------------------------------------------------------------------------

# 18. Information Architecture

## Public

-   Landing
-   Login
-   Register
-   Forgot Password
-   Reset Password

## Student

-   Dashboard
-   Profile
-   Resume
-   Skill Gap
-   Learning Roadmap
-   Mock Interview
-   Progress

## Staff/Admin

-   Dashboard
-   Students
-   Resume Reports
-   Interview Reports
-   Weak Areas
-   Reports

## Super Admin

-   Dashboard
-   Staff Management
-   Company Management
-   Learning Resources
-   AI Configuration
-   Analytics

This is the baseline information architecture. New pages should not be
introduced without a product reason.

------------------------------------------------------------------------

# 19. Dashboard UX Principle

The Student Dashboard must answer, immediately:

### Where am I?

Current preparation state.

### What am I missing?

Skill gaps and incomplete preparation.

### What should I do next?

One or more prioritized next actions.

The dashboard should not become a collection of every possible metric.

------------------------------------------------------------------------

# 20. UI/UX Direction

The visual direction is inspired by the clean, modern SaaS quality of
the provided Placify reference, while remaining an original product
design.

The product should feel:

-   professional
-   modern
-   calm
-   focused
-   approachable
-   intelligent
-   spacious
-   trustworthy

It should not look like a traditional college administration portal.

## 20.1 Approved palette

Primary:

`#00B2DA`

Secondary:

`#2AC0D6`

Accent:

`#4BC3CB`

Light background:

`#C2E4F4`

Soft accent:

`#91D7EC`

White and dark neutral colors may be used for surfaces and readable
text.

The palette must be converted into semantic design tokens rather than
scattered raw hex values.

## 20.2 Semantic color intent

  Semantic role    Intended use
  ---------------- ------------------------------------------------
  Primary          Main CTA, active navigation, important actions
  Secondary        Secondary actions and supporting emphasis
  Accent           Progress, highlights, selected states
  Success          Completed/positive states
  Warning          Attention-required states
  Error            Failed/invalid states
  Surface          Cards and content areas
  Background       Page background
  Text Primary     Main content
  Text Secondary   Supporting content
  Border           Structural separation

Exact success, warning, error, and neutral colors are to be finalized in
the UI design specification.

------------------------------------------------------------------------

# 21. Motion and Interaction Principles

Motion is functional, not decorative.

Use motion to communicate:

-   navigation state
-   loading
-   progress
-   completion
-   hierarchy
-   interaction feedback

Avoid:

-   unnecessary page animation
-   excessive parallax
-   decorative movement
-   animations that delay user actions
-   animation-heavy dashboards

Every significant animation should have a documented purpose and
reduced-motion behavior.

The detailed motion specification belongs in `docs/ui/motion.md`.

------------------------------------------------------------------------

# 22. Required UI States

Every data-dependent feature should define:

-   initial state
-   loading state
-   success state
-   empty state
-   error state
-   validation state
-   permission/unauthorized state
-   processing state where applicable

Examples:

### Resume

**No resume → Upload**

**Uploading → Processing**

**Analysis complete → Report**

**Failure → Retry**

### Skill Gap

**No target company → Select company**

**Analysis unavailable → Explain why**

**Results available → Show gaps and next actions**

### Mock Interview

**Not started → Setup**

**In progress → Question**

**Submitting → Evaluation**

**Completed → Feedback**

------------------------------------------------------------------------

# 23. Accessibility and Usability

The product should provide:

-   semantic HTML
-   keyboard-accessible interactions
-   visible focus states
-   readable contrast
-   meaningful labels
-   accessible form validation
-   non-color-only status indicators
-   responsive layouts
-   reduced-motion support

Accessibility should be considered during component design, not added
after implementation.

------------------------------------------------------------------------

# 24. AI Product Rules

AI is an application capability, not the product's source of truth.

AI-generated information must be distinguishable from system-recorded
information.

The AI should use approved product context and user-specific application
data relevant to the task.

AI should not invent:

-   company requirements
-   student achievements
-   resume facts
-   learning completion
-   interview results
-   official company policies
-   unsupported recommendations presented as facts

When required information is unavailable, the product should say that
the information is unavailable rather than fabricate it.

------------------------------------------------------------------------

# 25. AI Context Policy

AI-assisted development of this repository must use:

1.  `AGENTS.md` for repository-level agent instructions
2.  `docs/` specifications for product and system context
3.  `skills/` for approved programming context
4.  existing source code and API contracts for implementation context

General model knowledge must not override repository-specific
documentation.

The same principle applies to runtime AI features: the AI receives only
the context appropriate to the task and user.

------------------------------------------------------------------------

# 26. Product Data Trust

The interface must distinguish between:

### System data

Examples:

-   profile information
-   uploaded resume
-   completed skill
-   interview score stored by the application

### Calculated data

Examples:

-   aggregated progress
-   averages
-   readiness metric, once formally defined

### AI-generated data

Examples:

-   resume suggestions
-   learning recommendations
-   interview feedback

The UI should not visually imply that an AI-generated recommendation is
a verified fact.

------------------------------------------------------------------------

# 27. Backend Compatibility

The product specification defines product behavior, not permission to
rewrite the existing backend.

The current implementation should be reused wherever it already
satisfies the product requirement.

Frontend work must adapt to the existing backend contracts.

A backend change should be made only when:

1.  the product requirement cannot be implemented otherwise
2.  the existing behavior is incorrect or insecure
3.  the change is necessary for a clearly defined feature
4.  the impact is documented

Existing authentication, JWT behavior, role model, API contracts, and
working business logic should not be replaced merely for stylistic
reasons.

------------------------------------------------------------------------

# 28. Technology Baseline

The source project identifies:

### Frontend

-   React.js
-   Axios
-   React Router
-   CSS / Bootstrap

### Backend

-   Java
-   Spring Boot
-   Spring Security
-   JWT
-   REST API
-   Hibernate/JPA
-   Maven

### Database

-   PostgreSQL

### AI

-   OpenAI API or Gemini API

The current project will retain the existing implementation as the
baseline.

Exact dependency versions will be finalized separately in the project
version policy, with LTS releases preferred wherever an LTS release
exists.

------------------------------------------------------------------------

# 29. High-Level System Relationship

The source architecture describes:

**React Frontend → Axios REST Calls → Spring Boot REST API →
Authentication / Student / Resume / AI / Admin modules → PostgreSQL**,
with OpenAI/Gemini represented as the AI service.

The product therefore follows this conceptual relationship:

``` text
Student / Staff / Super Admin
              ↓
        React Frontend
              ↓
        REST API Layer
              ↓
        Spring Boot
              ↓
   ┌──────────┼───────────┐
   ↓          ↓           ↓
Auth      Business      AI Service
          Logic
              ↓
         PostgreSQL
```

This is a product-level relationship. Detailed architecture belongs in
the architecture specification.

------------------------------------------------------------------------

# 30. Product Non-Goals

The following are not part of the finalized baseline scope unless
explicitly added through a future specification change:

-   automatic job application
-   automatic placement prediction
-   guaranteed placement outcome
-   social networking
-   recruiter marketplace
-   live coding platform
-   automatic GitHub scoring
-   automatic LinkedIn scoring
-   attendance management
-   college ERP functionality
-   payroll or HR management
-   unrelated chatbot functionality

These may be considered later only through a documented product
decision.

------------------------------------------------------------------------

# 31. Success Criteria

The baseline product should allow a student to complete this meaningful
journey:

**Register → create profile → select target company → upload resume →
receive analysis → identify skill gaps → view learning recommendations →
attend mock interview → receive feedback → track progress.**

The product should allow Staff/Admin to:

**Login → view students → monitor preparation → inspect resume/interview
information → view dashboard metrics → generate supported reports.**

The product should allow Super Admin to:

**Manage staff → manage companies → manage learning resources → manage
approved AI configuration → view analytics.**

------------------------------------------------------------------------

# 32. Product Acceptance Criteria

A feature is product-complete only when:

-   its purpose is defined
-   its user is defined
-   its entry point is defined
-   its primary flow is defined
-   its successful outcome is defined
-   its loading behavior is defined
-   its empty behavior is defined
-   its error behavior is defined
-   its permission behavior is defined
-   its responsive behavior is defined
-   its accessibility requirements are considered
-   its API/data dependencies are documented
-   its UI states are documented
-   its AI behavior is documented if applicable
-   it does not break an existing approved flow

------------------------------------------------------------------------

# 33. Change Control

The baseline product specification should be treated as controlled
project documentation.

A proposed change must explain:

1.  What is changing?
2.  Why is it necessary?
3.  Which requirement does it support?
4.  What user value does it add?
5.  What existing behavior does it affect?
6.  What documentation must change?
7.  What implementation and testing impact exists?

Do not introduce a feature simply because it is common in another
product.

Do not change a visual behavior simply because a newer design trend
exists.

Do not introduce a dependency merely to solve a problem that can be
solved cleanly with the existing stack.

Changes should be accepted only when they are necessary, correct, or
provide clear value in the context of this product.

------------------------------------------------------------------------

# 34. Future Specification Documents

This product specification is the baseline. The following documents
should be created before their respective implementation phases:

``` text
docs/
├── product/
│   ├── product-spec.md              ← this document
│   ├── user-personas.md
│   ├── user-journeys.md
│   └── feature-spec.md
│
├── architecture/
│   ├── system-architecture.md
│   ├── frontend-architecture.md
│   └── backend-architecture.md
│
├── ux/
│   ├── navigation.md
│   ├── interaction-model.md
│   └── accessibility.md
│
├── ui/
│   ├── design-system.md
│   ├── colors.md
│   ├── typography.md
│   ├── components.md
│   └── motion.md
│
├── api/
│   ├── api-contract.md
│   └── endpoint-map.md
│
├── database/
│   └── data-model.md
│
├── ai/
│   ├── ai-architecture.md
│   ├── ai-agents.md
│   ├── ai-context.md
│   └── ai-safety.md
│
├── security/
│   └── security-spec.md
│
└── testing/
    ├── testing-strategy.md
    └── acceptance-criteria.md
```

------------------------------------------------------------------------

# 35. Baseline Status

**Product specification status:** Baseline finalized

**Scope status:** Defined

**Primary user:** Student

**Secondary users:** Staff/Admin and Super Admin

**Core product loop:** Defined

**Visual direction:** Defined

**Color palette:** Defined

**AI development context policy:** Defined

**LTS-first dependency policy:** Defined at principle level; exact
versions are a separate controlled decision

**Detailed architecture:** Pending architecture specification

**Detailed API contracts:** Pending API specification

**Database schema:** Pending database specification

**AI agent contracts:** Pending AI specification

**Detailed UI component system:** Pending UI specification

**Exact placement-readiness formula:** Not yet defined

**Exact company-requirement data source:** Not yet defined

**Exact report formats:** Not yet defined

These unresolved items must be explicitly decided before implementation
of the affected features.
