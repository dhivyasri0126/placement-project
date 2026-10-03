# CareerPilot Integrations Specification

**Document:** `09-integrations-spec.md`  
**Status:** Baseline specification  
**Product:** CareerPilot, AI-Powered Placement Preparation Platform  
**Related documents:** `AGENTS.md`, `03-architecture.md`, `04-api-spec.yaml`, `05-data-model.md`, `06-security-spec.md`, `08-ai-spec.md`

---

## 1. Purpose

This document defines how CareerPilot integrates with external systems and services.

The integration boundary exists to keep external providers replaceable, secure, observable, and isolated from core business logic.

CareerPilot currently has three source-defined integration areas:

1. AI provider
2. Learning-resource providers
3. External communication/storage services required by the approved architecture

The original project source identifies OpenAI API or Gemini API as possible AI providers and names YouTube, NPTEL, Coursera, and LinkedIn Learning as learning-resource sources. It does not define mandatory API contracts for those providers. Therefore, this document defines integration boundaries without inventing unsupported provider APIs or credentials.

---

# 2. Integration Principles

### INT-001 Application-owned boundary

External services are accessed through backend-owned adapters.

```text
CareerPilot Domain
       |
       v
Integration Interface
       |
       v
Provider Adapter
       |
       v
External Service
```

Domain modules must not depend directly on provider SDK classes.

### INT-002 Provider replaceability

Changing an external provider should not require rewriting the core domain model.

### INT-003 Least privilege

Each integration receives only the permissions and data required for its purpose.

### INT-004 Server-side credentials

Provider credentials, API keys, client secrets, and service credentials must never be placed in frontend code.

### INT-005 Explicit failure

External failures must become controlled application states rather than silent success.

### INT-006 Provenance

Externally sourced information used for consequential product behavior should retain source metadata.

### INT-007 No fabricated integration data

If an external provider cannot verify a resource, requirement, URL, or status, CareerPilot must not invent one.

### INT-008 Stable dependencies

External SDKs and libraries follow the repository dependency policy: LTS where available, otherwise stable supported versions. Do not add an SDK when a simple HTTP integration is sufficient without a documented reason.

---

# 3. Integration Inventory

| Integration | Purpose | Status |
|---|---|---|
| AI provider | Resume analysis, skill gap, learning recommendation, mock interview, answer evaluation | Planned |
| YouTube | Learning-resource discovery/reference | Planned |
| NPTEL | Learning-resource discovery/reference | Planned |
| Coursera | Learning-resource discovery/reference | Planned |
| LinkedIn Learning | Learning-resource discovery/reference | Planned |
| Object storage | Resume/document storage | Planned architecture boundary |
| Email/notification service | Account and platform notifications where required | Planned |
| PostgreSQL | Primary application data store | Existing/core infrastructure |

The source project explicitly names the AI and learning-resource providers. The exact API mechanism for each remains an implementation decision.

---

# 4. Integration Architecture

```text
                    CareerPilot Backend
                           |
        +------------------+------------------+
        |                  |                  |
        v                  v                  v
   AI Adapter       Learning Adapter     Notification Adapter
        |                  |                  |
        v                  v                  v
   AI Provider       Resource Sources      Email/Notification
        |
        v
   Structured AI Output
```

File/document handling follows the application-owned storage boundary:

```text
Frontend
   |
   v
CareerPilot API
   |
   +--> File validation
   |
   +--> Object storage
   |
   +--> Database metadata
   |
   +--> Resume processing
```

External systems must not become the CareerPilot system of record.

---

# 5. AI Provider Integration

## 5.1 Purpose

The AI integration supports:

- Resume Analysis
- Skill Gap Analysis
- Learning Recommendation
- Mock Interview
- Answer Evaluation

These capabilities are defined in `08-ai-spec.md` and in the original project source.

## 5.2 Boundary

```text
Resume / Skill Gap / Interview Module
                  |
                  v
              AI Service
                  |
                  v
           Provider Adapter
                  |
                  v
             AI Provider
```

The frontend must never call the AI provider directly.

## 5.3 Provider abstraction

The domain should depend on an application-level contract conceptually equivalent to:

```text
AiProvider
  generateStructured(...)
  evaluate(...)
```

The exact Java interface and package structure are implementation decisions.

Provider-specific details must remain inside adapters.

## 5.4 Request requirements

Every AI request must establish:

- operation type
- authenticated user/resource context
- trusted application instructions
- relevant structured data
- untrusted user/external content
- output schema/version
- correlation identifier

See `08-ai-spec.md` for the complete AI pipeline.

## 5.5 Response requirements

Responses must pass:

1. schema validation
2. business validation
3. provenance capture
4. persistence rules

Raw provider output must not be treated as domain truth.

## 5.6 Provider failure

Handle:

- timeout
- authentication/configuration error
- rate limiting
- provider availability failure
- malformed response
- schema mismatch
- safety/policy refusal
- transient network error

The application must expose a meaningful recoverable state.

---

# 6. Learning Resource Integrations

The source project describes learning recommendations using:

- YouTube
- NPTEL
- Coursera
- LinkedIn Learning

## 6.1 Purpose

These integrations support discovery or linking of learning resources relevant to identified skill gaps.

They do **not** become authoritative sources for student completion unless the platform has an explicitly verified completion integration.

## 6.2 Resource model

A learning resource should conceptually contain:

```text
Resource
├── provider
├── title
├── URL/reference
├── skill/topic
├── description
├── availability/status
├── source metadata
└── verification metadata
```

The exact schema is defined by `05-data-model.md`.

## 6.3 Provider adapter

Each provider should be isolated behind an adapter.

```text
LearningResourceService
       |
       +--> YouTubeAdapter
       +--> NptelAdapter
       +--> CourseraAdapter
       +--> LinkedInLearningAdapter
```

Only providers actually supported by their available interfaces should be implemented.

## 6.4 Resource verification

Before displaying a resource as verified, CareerPilot should establish enough evidence to support:

- resource identity
- provider
- accessible reference/URL
- relevant topic/skill

AI-generated URLs or resource names must not be treated as verified.

## 6.5 Availability failure

If a provider is unavailable:

- preserve existing verified resources
- do not fabricate replacements
- show an appropriate unavailable state
- retry only according to the integration policy

---

# 7. Company and Requirement Data

Company information is a critical integration boundary because it feeds Skill Gap Analysis.

## 7.1 Source hierarchy

Company requirements may originate from:

1. administrator-maintained records
2. verified external sources
3. other approved sources defined by the product

AI-generated requirements are derived information and must not automatically become official company requirements.

## 7.2 Required provenance

Where applicable, requirement records should retain:

- company
- role
- source type
- source reference
- captured date
- verification state
- effective/freshness information

## 7.3 External source failure

If a requirement source is unavailable:

- use previously verified data only when its freshness policy permits
- clearly distinguish current from stale data
- do not silently replace it with model-generated assumptions

Exact freshness rules remain an open decision.

---

# 8. File and Object Storage Integration

Resumes are part of the product's core workflow:

```text
Upload PDF
   ↓
Validate
   ↓
Store file
   ↓
Extract text
   ↓
Persist resume metadata
   ↓
AI analysis
```

The application architecture uses an object-storage boundary for uploaded documents.

## 8.1 Responsibilities

Object storage should handle file bytes.

PostgreSQL remains responsible for application metadata and relationships.

Example metadata:

```text
Resume
├── student_id
├── storage_reference
├── original_filename
├── content_type
├── size
├── checksum
├── created_at
└── processing_status
```

## 8.2 Security

Uploads must follow `06-security-spec.md`.

Controls include:

- authenticated upload
- ownership enforcement
- content-type validation
- file-size limits
- PDF-specific validation
- malware/security scanning where required
- private storage
- controlled download
- no public bucket/object exposure
- safe filenames
- auditability

## 8.3 Download

The frontend should receive an application-authorized file response or controlled/signed access mechanism.

A raw permanent storage URL must not bypass CareerPilot authorization.

---

# 9. Email and Notification Integration

The platform may require notifications for events such as:

- registration/account actions
- password reset
- important platform updates
- AI processing completion
- interview/result availability

The exact notification events are defined by product and requirements specifications.

## 9.1 Boundary

```text
CareerPilot Notification Service
              |
              v
      Notification Adapter
              |
              v
      External Provider
```

The domain should not depend on a specific email vendor.

## 9.2 Security

Notification payloads must not expose unnecessary student information.

Password-reset messages must contain controlled, short-lived recovery mechanisms rather than passwords or secrets.

## 9.3 Failure

Notification failure must not incorrectly roll back unrelated business operations unless the operation explicitly requires transactional notification delivery.

For example, saving a completed interview should not necessarily fail only because an optional notification provider is temporarily unavailable.

---

# 10. Authentication and External Identity

CareerPilot's current authentication is application-owned JWT authentication.

External identity providers are **not** part of the current baseline.

Do not introduce Google/Microsoft/OAuth login merely as a convenience feature without an approved product and security decision.

Existing authentication contracts must be preserved unless a documented migration is approved.

---

# 11. API Integration Rules

All external API calls must use a dedicated integration boundary.

Required concerns:

- timeout
- retry policy
- rate-limit handling
- request validation
- response validation
- error classification
- correlation IDs
- observability
- credential management
- provider version compatibility

Avoid indefinite waits and unbounded retries.

---

# 12. Retry and Idempotency

Retries must be operation-specific.

### Safe candidates

Read-only resource retrieval may generally be retried when the provider contract permits it.

### Potentially unsafe candidates

Operations that:

- create provider-side records
- consume billable resources
- trigger notifications
- generate duplicate application results

require idempotency or explicit duplicate protection where applicable.

The retry policy must be documented per adapter before production use.

---

# 13. Rate Limiting and Resource Protection

External integrations must not allow uncontrolled provider usage.

Controls should exist at appropriate layers:

```text
User request
   ↓
Application rate control
   ↓
Integration policy
   ↓
Provider request
```

Protect against:

- repeated button clicks
- page refresh loops
- automated abuse
- retry storms
- provider outages
- large concurrent AI requests

Exact numeric limits remain unresolved until measured usage and provider constraints are known.

---

# 14. Secrets and Configuration

Integration secrets must come from environment/configuration or an approved secret-management mechanism.

Never commit:

- API keys
- client secrets
- access tokens
- passwords
- provider credentials

Configuration should distinguish:

```text
Non-secret configuration
- provider name
- endpoint
- timeout
- model identifier

Secret configuration
- API key
- client secret
- signing credential
```

Production secrets must not be stored in source control.

---

# 15. External Data Trust

Every integration should classify returned data.

| Data class | Example | Treatment |
|---|---|---|
| Verified external | confirmed resource metadata | May be used with provenance |
| Provider-reported | AI-generated recommendation | Derived, not authoritative |
| User-generated | resume/interview answer | Untrusted input |
| Cached | previously retrieved resource | Must retain retrieval metadata |
| Synthetic/demo | test data | Must be clearly labeled |

This prevents derived or synthetic information from being presented as official.

---

# 16. Caching

Caching may be introduced only where it provides clear value and does not create unacceptable freshness problems.

Potential cache candidates:

- public/verified learning-resource metadata
- non-sensitive provider metadata
- stable company reference data

Do not cache sensitive student data or AI results without an explicit retention/privacy decision.

Every cached resource must have a defined invalidation/freshness strategy.

---

# 17. Webhooks and Callbacks

Webhook-based integrations are not part of the current baseline unless a selected provider requires them.

If introduced later:

1. verify provider signatures
2. authenticate the source
3. validate payload schema
4. make processing idempotent
5. prevent replay attacks
6. record receipt/processing status
7. do not trust webhook fields without validation

Webhook endpoints must be isolated from normal user-facing API assumptions.

---

# 18. Observability

Each integration should produce operational metadata sufficient to diagnose failures without logging secrets or unnecessary personal data.

Recommended fields:

- integration name
- operation
- correlation ID
- provider
- request timestamp
- duration
- status
- retry count
- error category

Do not log:

- API keys
- access tokens
- passwords
- full resume contents
- unnecessary interview answers
- raw provider payloads containing sensitive information

---

# 19. Integration Health

Operational health should distinguish:

- application healthy
- integration configured
- provider reachable
- provider responding correctly

An external provider outage must not automatically be interpreted as a CareerPilot application outage.

Where practical, health checks should avoid expensive AI calls.

---

# 20. Data Synchronization

External data should follow an explicit ownership model.

### CareerPilot owns

- student accounts
- roles
- profiles
- resume records
- skill-gap records
- interview attempts
- scores
- progress
- learning completion records

### External providers own

- their provider-side resources and accounts
- provider-specific metadata
- provider availability

CareerPilot stores only the external information required by the product.

---

# 21. Integration Lifecycle

Every integration follows:

```text
Select
  ↓
Assess
  ↓
Define Contract
  ↓
Implement Adapter
  ↓
Validate
  ↓
Observe
  ↓
Operate
  ↓
Retire / Replace
```

Before adoption, establish:

- business purpose
- data exchanged
- authentication mechanism
- provider support status
- security/privacy implications
- rate limits
- failure behavior
- cost
- compatibility
- exit/replacement strategy

---

# 22. Provider Change

Changing an integration provider is a controlled change.

Before changing:

1. inspect current adapter and consumers
2. inspect provider documentation/release notes
3. compare API/auth/data behavior
4. identify breaking changes
5. update affected specification
6. define migration/rollback
7. test compatibility
8. deploy the smallest safe change

The domain API should remain stable wherever possible.

---

# 23. Integration Testing

Each adapter should have:

### Unit tests

- request construction
- response mapping
- validation
- error classification
- retry behavior

### Integration/contract tests

Where provider test environments or stable contracts exist:

- authentication
- representative successful request
- representative failure
- schema compatibility

### Application tests

Verify that a provider failure does not corrupt domain state.

### Security tests

Verify:

- credentials are not exposed
- unauthorized users cannot trigger protected operations
- malicious external data is treated as untrusted
- webhook validation works where applicable

---

# 24. Local Development

External integrations should be mockable for local development and tests.

Recommended conceptual structure:

```text
Integration interface
       |
       +--> Real provider adapter
       |
       +--> Test/mock adapter
```

Local development must not require production credentials.

No fake integration result should be presented as real provider data.

---

# 25. Environment Separation

At minimum, integration configuration must distinguish:

- local/development
- test
- production

Do not accidentally point development/test environments at production resources.

Provider credentials, storage buckets, notification destinations, and databases must be environment-specific.

---

# 26. Current Baseline vs Future Integrations

The following are intentionally **not committed implementation decisions**:

- exact AI provider
- exact AI SDK
- exact learning-provider APIs
- exact object-storage vendor
- exact email provider
- SMS/push provider
- webhook providers
- external identity providers
- separate vector database
- third-party analytics platforms

The source materials establish integration purposes, not all vendor choices. Vendor selection requires an explicit decision based on current official provider capabilities, security, cost, regional requirements, support, and compatibility.

---

# 27. AI Integration Traceability

| Requirement | Integration |
|---|---|
| Resume analysis | AI provider |
| Skill-gap analysis | AI provider + company requirement data |
| Learning recommendation | AI provider + learning-resource sources |
| Mock interview | AI provider |
| Answer evaluation | AI provider |
| Resume storage | Object storage |
| Password reset/notifications | Email/notification provider |
| Student-facing APIs | CareerPilot backend, not external providers |

Source basis: CareerPilot project description and module specification.

---

# 28. Open Decisions

1. Primary AI provider.
2. AI provider fallback strategy.
3. Exact AI SDK or HTTP integration approach.
4. Learning-resource provider API availability and access method.
5. Company-requirement source hierarchy.
6. Object-storage provider.
7. Email provider.
8. Notification delivery channels.
9. Integration rate limits.
10. Retry policies per provider.
11. Cache policies and freshness periods.
12. External data retention periods.
13. Provider-specific regional/data-transfer requirements.
14. Webhook requirements, if introduced.
15. Integration health/alert thresholds.
16. Provider cost budgets.

These decisions must be resolved before implementing the affected integration.

---

# 29. Implementation Rules for Coding Agents

Before adding an integration:

1. Read `AGENTS.md`.
2. Read this document.
3. Read the relevant feature specification.
4. Inspect existing dependencies and adapter patterns.
5. Verify the provider's current official documentation.
6. Establish why the integration is required.
7. Establish data exchanged and trust level.
8. Define authentication and secret handling.
9. Define failure/retry behavior.
10. Define testing and observability.
11. Use an ExecPlan when the change is complex, security-sensitive, breaking, or multi-file.

Never:

- add an SDK without justification
- put provider credentials in frontend code
- directly couple domain logic to provider classes
- treat AI output as authoritative
- invent unavailable provider data
- assume a provider API exists without verification
- silently replace an integration provider
- create a permanent dependency on a vendor when an abstraction is required

---

# 30. Definition of Done

An integration is complete only when:

- purpose is documented
- provider boundary is defined
- data exchanged is documented
- authentication/secrets are secured
- provider-specific code is isolated
- request/response validation exists
- failure behavior is explicit
- retries are bounded
- rate/resource protection exists where required
- sensitive data is minimized
- observability is implemented
- tests cover success and failure paths
- local/test execution does not require production credentials
- relevant API/data/security documentation is updated
- no unnecessary dependency is introduced
- breaking changes are identified and handled
- required ExecPlan is complete and current

---

## 31. Integration Architecture Invariant

The most important invariant is:

```text
CareerPilot owns the application contract.
External providers implement an integration contract.
```

Provider changes must therefore be isolated behind adapters wherever practical.

The application must remain functional and its core data model coherent even when an optional external provider is temporarily unavailable.
