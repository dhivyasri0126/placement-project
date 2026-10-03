# CareerPilot UX Design Specification

**Document ID:** CP-DOC-07  
**Status:** Baseline  
**Version:** 1.0  
**Scope:** Information architecture, user flows, interaction design, visual language, states, accessibility, responsive behavior, and motion

---

## 1. Purpose

This document defines the user experience for CareerPilot.

CareerPilot should help a student move through a clear preparation loop:

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

The interface must make that loop understandable without requiring the student to understand the internal architecture or AI implementation.

The original project specification defines Student, Staff/Admin, and Super Admin experiences and identifies profile, resume, skill gap, learning recommendations, mock interviews, progress, dashboards, staff monitoring, company management, learning-resource management, and AI configuration as the core product areas.

---

# 2. UX Principles

## UX-001: Action before information

Every major screen should answer:

1. Where am I?
2. What is my current state?
3. What should I do next?

A dashboard must not become a collection of unrelated metrics.

## UX-002: One clear primary action

Each major screen has one visually dominant action appropriate to its purpose.

Examples:

- Profile: `Save changes`
- Resume: `Upload resume`
- Skill gap: `View missing skills`
- Learning plan: `Continue learning`
- Mock interview: `Start interview`
- Interview result: `Review feedback`

Secondary actions remain available without competing visually with the primary action.

## UX-003: Explain AI, do not mystify it

AI-generated results must communicate:

- what was analyzed
- what evidence was used
- what the result means
- what the student can do next

Do not present AI output as unquestionable fact.

## UX-004: Preserve user control

Students must be able to:

- review information before submitting
- cancel non-destructive operations
- retry recoverable failures
- re-upload or replace a resume intentionally
- review generated recommendations before acting on them

## UX-005: Progressive disclosure

Show the most useful information first.

Detailed explanations, evidence, metadata, and secondary controls can be progressively disclosed.

## UX-006: Consistency

Equivalent actions must look and behave consistently across Student, Staff, and Super Admin interfaces.

## UX-007: Calm feedback

Success, warning, error, and AI-processing states should be clear without creating unnecessary visual noise.

---

# 3. Product Navigation

## 3.1 Student navigation

Primary navigation:

```text
Dashboard
Profile
Resume
Skill Gap
Learning
Mock Interview
Progress
```

Optional/supporting areas when implemented:

```text
Study Materials
Notifications
Settings
```

The navigation must reflect the core preparation loop rather than exposing internal backend modules.

## 3.2 Staff navigation

```text
Dashboard
Students
Progress
Resume Reports
Interview Reports
Reports
```

## 3.3 Super Admin navigation

```text
Dashboard
Staff
Companies
Learning Resources
AI Configuration
Analytics
```

Administrative navigation must remain visually distinct from the Student preparation workflow.

---

# 4. Route Hierarchy

The final frontend route names must follow the API/frontend implementation conventions, but the conceptual hierarchy is:

```text
/
├── login
├── register
├── forgot-password
├── reset-password
│
├── student
│   ├── dashboard
│   ├── profile
│   ├── resume
│   ├── skill-gap
│   ├── learning
│   ├── mock-interview
│   ├── progress
│   └── settings
│
├── staff
│   ├── dashboard
│   ├── students
│   ├── students/:id
│   ├── resumes
│   ├── interviews
│   └── reports
│
└── admin
    ├── dashboard
    ├── staff
    ├── companies
    ├── learning-resources
    ├── ai-configuration
    └── analytics
```

Route paths are implementation details and must not be treated as finalized API contracts unless documented in the frontend implementation.

---

# 5. Application Shell

## Student shell

```text
┌─────────────────────────────────────────────┐
│ Brand       Page context      Search  User  │
├────────────┬────────────────────────────────┤
│ Navigation  │                                │
│             │        Page content            │
│             │                                │
│             │                                │
└────────────┴────────────────────────────────┘
```

The shell should provide:

- persistent orientation
- clear active navigation
- user identity
- notification access where implemented
- responsive navigation
- consistent content width

## Staff/Admin shell

Use the same structural principles while adapting navigation and information density to monitoring/administrative work.

---

# 6. Visual Language

CareerPilot's visual direction is professional, modern, focused, and approachable.

Previously established semantic palette:

| Token | Base value | Intended use |
|---|---|---|
| Primary | `#00B2DA` | Main actions, active states |
| Secondary | `#2AC0D6` | Supporting emphasis |
| Accent | `#4BC3CB` | Highlights and supporting visuals |
| Background Light | `#C2E4F4` | Soft background surfaces |
| Accent Soft | `#91D7EC` | Secondary backgrounds |

These values are base design references. Components must consume semantic tokens rather than scattering raw hexadecimal values throughout the codebase.

The exact final contrast-adjusted values may change if accessibility validation requires it.

---

# 7. Semantic Colors

Color must communicate meaning, not decoration.

Recommended semantic roles:

```text
primary
primary-hover
primary-active

success
success-subtle

warning
warning-subtle

danger
danger-subtle

info
info-subtle

text-primary
text-secondary
text-muted
text-disabled

surface
surface-raised
surface-elevated
border
border-strong
focus
```

Semantic meaning must remain consistent.

For example:

- green is success/completion
- amber is warning/attention
- red is error/destructive
- blue/teal is primary product interaction

Do not use color as the only indicator of state.

---

# 8. Typography

Typography must prioritize:

1. readability
2. hierarchy
3. scanning
4. predictable sizing

Hierarchy:

```text
Page title
Section heading
Card heading
Body
Supporting text
Caption/metadata
```

Avoid excessive font-weight variation.

Important metrics may use larger type, but large numbers must always have labels and context.

---

# 9. Layout and Spacing

Use a consistent spacing scale.

Recommended conceptual scale:

```text
xs
sm
md
lg
xl
2xl
```

Components should align to a shared grid.

Avoid:

- arbitrary margins
- inconsistent card padding
- nested cards without hierarchy
- excessive empty space
- dense walls of text

The interface should feel spacious enough for scanning while remaining information-efficient.

---

# 10. Surfaces and Cards

Cards are used for grouping related information, not as decoration.

Use cards for:

- summary metrics
- skill groups
- recommendation items
- learning tasks
- interview questions
- reports

Avoid putting every element into a separate card.

Cards should communicate hierarchy through:

- spacing
- typography
- surface elevation
- border
- grouping

rather than heavy shadows.

---

# 11. Authentication UX

## Login

Required elements:

```text
Email
Password
Remember/session option if implemented
Login
Forgot password
Register
```

Behavior:

- inline validation
- disabled submit while submitting
- clear server error
- no account-enumeration messaging
- keyboard-first usability

## Registration

Required:

```text
Name
Email
Password
Confirm password where required
Register
```

Initial account type:

```text
Student
```

The user must not select Staff or Super Admin during public registration.

## Forgot password

Flow:

```text
Email
 ↓
Submit
 ↓
Generic confirmation
```

The confirmation must not reveal whether the account exists.

---

# 12. Student Onboarding

After registration/login, the product should guide the student toward completing the minimum information required for meaningful recommendations.

Conceptual sequence:

```text
Welcome
 ↓
Complete profile
 ↓
Select target company/role
 ↓
Upload resume
 ↓
Analyze
 ↓
Review skill gap
 ↓
Start learning plan
```

Do not force a long multi-step form when information can be collected progressively.

The onboarding state should clearly show what remains incomplete.

---

# 13. Student Dashboard

The dashboard is the student's preparation command center.

Primary structure:

```text
Welcome / context
        ↓
Current preparation summary
        ↓
Next action
        ↓
Progress
        ↓
Tasks
        ↓
Recommendations
```

### Recommended sections

1. Greeting/context
2. Current target company/role
3. Resume status/score where available
4. Learning progress
5. Interview progress
6. Skill progress
7. Today's/recommended next tasks
8. Recent activity

### Important rule

The dashboard should not claim metrics that the backend has not actually calculated.

If a score is unavailable:

```text
Not available yet
```

rather than:

```text
0%
```

---

# 14. Profile UX

Profile contains:

- personal information
- college
- department
- CGPA
- skills
- target company/role

Use grouped sections rather than one long undifferentiated form.

### Form behavior

- field-level validation
- clear required indicators
- preserve valid entered values after validation failure
- show save state
- prevent accidental duplicate submission
- confirm destructive changes when required

---

# 15. Target Company UX

Target selection should communicate why the company/role matters.

Flow:

```text
Choose company
       ↓
Choose role
       ↓
Review selection
       ↓
Set as target
```

If role-specific company data is unavailable, do not fabricate requirements.

Show:

```text
Requirements unavailable
```

and explain what the student can still do.

The UI should distinguish:

```text
Company
Role
Required skills
Preferred skills
Source/freshness
```

where those fields exist.

---

# 16. Resume Upload UX

Resume page states:

```text
No resume
Upload selected
Uploading
Uploaded
Processing
Analysis ready
Analysis failed
```

### Upload interaction

Recommended:

```text
Drop PDF here
or
Choose file
```

Also provide a normal file picker for keyboard/accessibility.

Before upload:

- show filename
- show file size
- show validation errors
- allow cancellation

During upload:

- progress where technically available
- disable conflicting actions
- provide non-blocking status

After upload:

```text
Resume uploaded
Analysis processing
```

Do not imply analysis is complete merely because the upload succeeded.

---

# 17. Resume Analysis UX

Primary layout:

```text
Overall result
     ↓
Key strengths
     ↓
Improvement areas
     ↓
Skill findings
     ↓
Actionable suggestions
     ↓
Next step
```

AI result presentation must distinguish:

```text
Observed from resume
Inferred/AI-generated
Recommendation
```

Where appropriate, provide evidence or explanation.

### No-result state

If analysis has not completed:

```text
Your resume is being analyzed.
You can continue to other preparation activities.
```

### Failure state

Provide:

```text
Analysis could not be completed.
Retry
```

Do not display raw provider errors.

---

# 18. Skill Gap UX

The skill-gap page connects the target role to actionable preparation.

Primary structure:

```text
Target role
     ↓
Current skill coverage
     ↓
Missing / developing skills
     ↓
Priority
     ↓
Recommended action
```

Skills should be grouped clearly.

Possible categories:

```text
Strong
Developing
Missing
```

These labels must only be used if the backend defines their meaning.

Avoid implying certainty from a model similarity score alone.

---

# 19. Learning Roadmap UX

Learning should transform skill gaps into manageable actions.

Structure:

```text
Learning goal
 ↓
Skill
 ↓
Recommended resources
 ↓
Task
 ↓
Progress
```

A roadmap item should communicate:

- skill
- why it matters
- resource
- estimated effort if reliable
- current status
- next action

Statuses should be visually distinct:

```text
Not started
In progress
Completed
Unavailable
```

Completion must be explicit.

---

# 20. Learning Resource UX

Each resource should display:

- title
- provider
- type
- skill
- link
- availability/status where known

External links should clearly indicate that the user is leaving CareerPilot.

If a resource becomes unavailable, show an unavailable state instead of silently presenting a broken action.

---

# 21. Mock Interview UX

The mock interview should feel focused and interruption-free.

Flow:

```text
Select company
      ↓
Select role if available
      ↓
Select difficulty
      ↓
Review interview settings
      ↓
Start
      ↓
Question
      ↓
Answer
      ↓
Submit
      ↓
Next question
      ↓
Complete
      ↓
Evaluation
```

Do not start an interview without explicit user confirmation.

---

# 22. Interview Screen

Primary hierarchy:

```text
Interview progress
Question
Answer input
Submit
```

Secondary information should not distract from answering.

Show:

- question number
- current question
- answer field
- submission state
- remaining questions where applicable

Do not add timers unless the product explicitly requires them.

---

# 23. Interview Answer States

```text
Unanswered
Editing
Submitting
Submitted
Evaluation pending
Evaluated
Failed
```

After submission, prevent accidental duplicate submissions.

If evaluation is asynchronous:

```text
Answer submitted
Evaluation in progress
```

Do not show a fabricated score while waiting.

---

# 24. Interview Results

Result structure:

```text
Overall score
 ↓
Strengths
 ↓
Improvement areas
 ↓
Question-level feedback
 ↓
Recommended next actions
```

Scores must include context.

Avoid presenting:

```text
82
```

without a clear label such as:

```text
Overall interview score
```

The UI must not imply that an AI score is equivalent to an official employer evaluation.

---

# 25. Progress UX

Progress should answer:

```text
What have I improved?
What remains?
What should I do next?
```

Recommended areas:

- resume analysis status
- skill progress
- learning completion
- interview history
- score trends
- recent activity

Charts should support decisions, not exist merely for visual appeal.

If there is insufficient historical data:

```text
Complete more activities to see your progress trend.
```

Do not render misleading flat or zero-value charts.

---

# 26. Staff Dashboard UX

The Staff dashboard is a monitoring interface.

Primary metrics defined by the product specification include:

- total students
- average resume score
- average interview score
- placement readiness
- top/weak student views

The exact readiness formula is not yet finalized and must not be invented in the frontend.

The dashboard should provide:

```text
Overview
 ↓
Students needing attention
 ↓
Progress trends
 ↓
Reports
```

Staff must not see information outside their authorization scope.

---

# 27. Staff Student View

Student monitoring page should include:

- student identity
- profile summary
- target company/role
- resume status
- resume analysis
- skill gap
- learning progress
- interview scores
- progress history

Sensitive information should be shown only when the staff member is authorized to access it.

---

# 28. Staff Reports

Reports should support:

- filtering
- sorting
- pagination
- clear scope
- export where authorized

Exports must:

- show what is being exported
- require explicit action
- indicate processing
- handle failure
- be audited

Do not expose more student information than the selected report requires.

---

# 29. Super Admin UX

Super Admin interfaces manage platform configuration rather than individual student preparation.

Core areas:

```text
Staff
Companies
Learning Resources
AI Configuration
Analytics
```

Administrative actions should use explicit confirmations for destructive or high-impact changes.

---

# 30. Company Management

Company management should support:

- create
- view
- update
- deactivate/archive where defined

Role-specific company information should remain separate from generic company identity.

Where requirements are sourced externally, the interface should preserve:

```text
source
source URL
observed date
```

when those fields are part of the backend model.

---

# 31. Learning Resource Management

Super Admin can manage the learning-resource catalog.

Resource form:

```text
Title
Provider
Type
URL
Description
Associated skills
Status
```

Validate external URLs and required metadata.

Do not represent an AI-generated recommendation as an administrator-verified resource without an explicit verification state.

---

# 32. AI Configuration UX

AI configuration is an administrative/security-sensitive area.

Do not expose provider secrets in the UI.

Configuration may include safe metadata such as:

```text
Provider
Model
Feature
Status
Prompt/configuration version
```

Secrets must be managed through secure server-side configuration.

Changes must be audited.

---

# 33. Loading States

Every data-dependent page must have a deliberate loading state.

Use:

- skeletons for known page structures
- progress indicators for uploads/processing
- button loading states for short operations

Avoid indefinite spinners without context.

Long-running operations should communicate:

```text
what is happening
whether the user can leave
whether retry is available
```

---

# 34. Empty States

Empty states must explain the next useful action.

Bad:

```text
No data.
```

Better:

```text
No resume uploaded yet.
Upload your latest resume to start the analysis.
[Upload Resume]
```

Every empty state should answer:

1. Why is it empty?
2. What can the user do?
3. Is action required?

---

# 35. Error States

Errors should be:

- specific enough to act on
- non-technical
- near the affected operation
- recoverable when possible

Pattern:

```text
What happened
What you can do
Primary recovery action
```

Example:

```text
We couldn't analyze this resume.
Please try again.
[Retry Analysis]
```

Never expose stack traces or provider internals.

---

# 36. Permission States

When access is denied:

```text
You don't have access to this information.
```

Do not reveal sensitive resource existence unnecessarily.

If the user can navigate somewhere useful, provide a safe navigation action.

---

# 37. Offline and Network States

Relevant screens should distinguish:

```text
No connection
Request failed
Server unavailable
Retrying
```

Do not silently discard user input because a request failed.

Forms should preserve recoverable local input where appropriate.

---

# 38. Success Feedback

Success feedback should confirm the actual completed operation.

Examples:

```text
Profile updated
Resume uploaded
Learning item marked complete
Interview submitted
Company updated
```

Do not show success before the server confirms completion.

Use toast/snackbar feedback for small transient confirmations and inline feedback for important state changes.

---

# 39. Destructive Actions

Destructive actions require:

- clear destructive styling
- explicit action label
- confirmation when accidental activation would be costly
- server-side authorization
- successful completion feedback

Avoid generic confirmation text such as:

```text
Are you sure?
```

Prefer:

```text
Deactivate this company?
Students will no longer be able to select it as a new target.
[Cancel] [Deactivate]
```

The confirmation must describe the actual consequence.

---

# 40. Forms

Form standards:

- labels always visible
- inputs have accessible names
- validation close to fields
- server errors mapped to relevant fields where possible
- required fields clearly identified
- no validation that depends only on color
- submit button indicates processing
- prevent duplicate submissions
- preserve user input after recoverable failure

Do not clear a complete form merely because one field failed validation.

---

# 41. Search, Filter, Sort, Pagination

Staff/admin data-heavy views should provide predictable controls.

Rules:

- search fields have labels/placeholders
- filters show active state
- sorting indicates direction
- pagination preserves current filter context
- empty filtered results explain that filters may be responsible
- reset filters is easy to discover

Student interfaces should not introduce enterprise-style filtering unless the data volume requires it.

---

# 42. Tables

Use tables for genuinely tabular data.

Staff student lists may include:

```text
Student
Target
Resume
Progress
Interview
Last activity
```

Avoid overly wide tables on small screens.

On mobile, convert lower-priority columns into a structured card/list representation rather than forcing horizontal scrolling where avoidable.

---

# 43. Charts and Visualization

Charts must:

- have titles
- have labels/context
- use accessible contrast
- provide textual interpretation where useful
- not rely solely on color
- handle insufficient data
- show meaningful time ranges

A chart is not a replacement for the underlying value.

---

# 44. Accessibility

Target baseline:

**WCAG 2.2 AA principles should guide implementation.**

Required practices:

- keyboard access
- visible focus
- logical focus order
- semantic HTML
- accessible labels
- accessible error messages
- sufficient contrast
- text alternatives for meaningful imagery
- no color-only status indication
- reduced-motion support
- accessible dialogs
- accessible menus
- accessible charts/data alternatives

Accessibility testing is required for reusable components and critical flows.

---

# 45. Keyboard Interaction

Keyboard users must be able to:

```text
Navigate
Open menus
Submit forms
Dismiss dialogs
Use controls
Upload files
Complete interviews
Navigate tables
```

Focus must not become trapped accidentally.

Dialogs must return focus to the initiating control when closed.

---

# 46. Responsive Design

The interface must work across:

```text
Desktop
Tablet
Mobile
```

Desktop may use:

```text
persistent sidebar + content
```

Tablet:

```text
compact sidebar/navigation
```

Mobile:

```text
top bar or drawer
single-column content
stacked cards
```

Do not simply shrink the desktop layout.

Information hierarchy must adapt to viewport size.

---

# 47. Mobile Priority

On small screens, prioritize:

1. current task
2. primary action
3. essential status
4. supporting information
5. secondary navigation

Complex staff/admin tables may require a responsive alternative rather than attempting to display every column.

---

# 48. Motion

Motion must communicate:

- state change
- hierarchy
- feedback
- continuity
- progress

Do not add animation merely to make the application appear "AI-like".

Preferred motion characteristics:

- short
- predictable
- interruptible
- subtle
- consistent

Examples:

```text
button → loading
card → expanded details
upload → processing
step → completed
dialog → enter/exit
```

Avoid:

- perpetual decorative animation
- excessive parallax
- bouncing UI
- animations that delay task completion

---

# 49. Reduced Motion

Respect the user's reduced-motion preference.

When reduced motion is enabled:

- remove decorative transitions
- reduce movement
- retain essential state feedback through non-motion cues

The product must remain understandable without animation.

---

# 50. AI Presentation

AI-related UI must follow a consistent visual language.

Recommended pattern:

```text
AI-generated
       ↓
Result
       ↓
Evidence/context
       ↓
Recommended action
```

Use an AI label where needed, but avoid excessive badges.

Do not make every ordinary feature look AI-powered.

---

# 51. AI Processing States

Long-running AI tasks should use explicit states:

```text
Queued
Processing
Completed
Failed
Retry available
```

For the user:

```text
Analyzing your resume...
```

is preferable to:

```text
Calling OpenAI API...
```

unless technical provider information is actually relevant.

---

# 52. AI Confidence and Uncertainty

If an AI feature has meaningful uncertainty, the interface should communicate it.

Do not invent numerical confidence values solely for visual presentation.

Instead use language such as:

```text
Based on the information available
Potential skill gap
Suggested improvement
Requirements could not be verified
```

when appropriate.

---

# 53. Evidence and Provenance

When AI output depends on external/company data, show provenance where useful:

```text
Source
Observed date
Role
Skill
```

This is especially important for company requirements and learning resources.

The UI must never imply that unsupported external claims are official company policy.

---

# 54. Notifications

Notifications should be actionable.

Examples:

```text
Resume analysis completed
Interview evaluation ready
Learning plan updated
```

Notification behavior must distinguish:

```text
Unread
Read
Action required
Informational
```

Do not create notification noise for every small backend event.

---

# 55. Search

Global search, if implemented, should search user-accessible resources only.

Search results must obey backend authorization.

Do not expose:

- another student's name/details
- staff-only reports
- admin configuration
- hidden company data

through autocomplete or search suggestions.

---

# 56. Session Expiration UX

When authentication expires:

```text
Preserve user context where safe
 ↓
Attempt permitted session renewal
 ↓
If successful → continue
 ↓
If not → request login
```

The user should not lose entered form content unnecessarily.

Never display raw JWT/session errors.

---

# 57. Data Privacy in UI

Do not expose sensitive information unnecessarily.

Examples:

- avoid displaying full student resumes in list views
- avoid exposing personal contact information to unauthorized staff
- avoid putting private data into URL query parameters unnecessarily
- avoid copying sensitive data into browser storage
- avoid showing secrets in administrative screens

---

# 58. Content and Language

UI copy should be:

- concise
- direct
- professional
- understandable to students
- action-oriented

Avoid unnecessary technical terminology.

Prefer:

```text
Resume analysis is taking longer than expected.
```

over:

```text
AI inference request timed out.
```

Technical details may be available to administrators/developers through appropriate diagnostics.

---

# 59. Dashboard Metrics

Metrics must have:

- clear label
- value
- time/context where relevant
- meaningful empty state
- source/definition when ambiguity exists

Never display a metric simply because the UI has space for it.

The dashboard must not invent:

- placement probability
- employer ranking
- unsupported readiness score
- fake activity
- fabricated progress

---

# 60. UX State Matrix

Every important feature must consider:

| State | Required UX |
|---|---|
| Initial | Explain what to do |
| Loading | Show progress |
| Empty | Explain why + next action |
| Success | Confirm completed operation |
| Validation error | Identify correction |
| Server error | Explain + retry/recovery |
| Permission denied | Explain safe boundary |
| Offline | Preserve recoverable work |
| Processing | Explain ongoing operation |
| Partial data | Clearly distinguish available/unavailable |
| Stale data | Show freshness where important |

---

# 61. Core Student Journey

The complete intended journey is:

```text
Register/Login
      ↓
Complete Profile
      ↓
Select Target Company/Role
      ↓
Upload Resume
      ↓
Resume Analysis
      ↓
Skill Gap
      ↓
Learning Roadmap
      ↓
Practice
      ↓
Mock Interview
      ↓
Feedback
      ↓
Progress
      ↓
Next Recommended Action
```

A student should always be able to return to the dashboard and understand where they are in this journey.

---

# 62. Primary UX Success Criteria

The UX baseline is successful when:

- a new Student can identify the first required action
- a Student can understand their current target
- resume upload status is unambiguous
- AI analysis is distinguishable from verified facts
- skill gaps lead to actionable learning
- learning progress is understandable
- mock interviews have a clear start/answer/submit/result flow
- progress shows meaningful change rather than decorative charts
- Staff can locate authorized students and their relevant preparation data
- Super Admin can manage configuration without exposing secrets
- all critical flows work with keyboard navigation
- critical flows remain understandable on mobile
- errors provide a recovery path

---

# 63. UX Change Control

UX changes must not be made merely for visual novelty.

Before changing an established flow, identify:

1. current behavior
2. user problem
3. proposed change
4. measurable/user-value reason
5. affected screens/components
6. accessibility impact
7. responsive impact
8. API/data impact
9. migration or compatibility impact if applicable

If the change does not materially improve the user experience or solve a documented problem, retain the existing behavior.

---

# 64. Implementation Rules for AI Agents

AI coding agents must:

- read `AGENTS.md`
- read this specification before changing UX
- use semantic tokens
- reuse existing components
- inspect existing frontend implementation before creating new patterns
- avoid introducing a UI library without an approved decision
- avoid inventing pages not required by product/requirements
- implement all relevant states
- preserve existing contracts
- test keyboard and responsive behavior for affected critical flows
- avoid decorative animations
- never use fake metrics or placeholder AI results as real application data

---

# 65. Open UX Decisions

The following remain intentionally unresolved:

1. Final frontend component library, if any.
2. Final typography/font family.
3. Final dark-mode requirement.
4. Exact responsive breakpoints.
5. Final charting library.
6. Final global search scope.
7. Notification delivery channels.
8. Exact onboarding completion rules.
9. Exact dashboard metric definitions.
10. Final readiness visualization after the readiness formula is approved.
11. Exact AI evidence/provenance presentation for each feature.
12. Final Staff organizational scope UX.
13. Final export formats.

These must be decided before the corresponding implementation work, not guessed by individual components.

---

# 66. UX Definition of Done

A UX implementation is complete when:

- the flow matches the product and requirements specifications
- primary and secondary actions are clear
- loading, empty, success, error, validation, and permission states are implemented where relevant
- responsive behavior is defined
- keyboard accessibility is supported
- reduced motion is respected
- semantic design tokens are used
- no unsupported data is presented
- AI output is clearly distinguished from verified facts where necessary
- API/backend constraints are respected
- existing behavior is preserved unless the change is intentional
- relevant frontend tests/build/lint checks pass
- the UX specification is updated when behavior changes

---

# 67. Reference Basis

This specification is grounded primarily in CareerPilot's approved product requirements, architecture, security rules, existing backend behavior, and the project's existing UI direction.

Accessibility should be validated against the applicable WCAG 2.2 requirements during implementation rather than treated as a visual checklist.

**Next document:** `08-ai-spec.md`
