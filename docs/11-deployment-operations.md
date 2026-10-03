# CareerPilot Deployment and Operations Specification

**Document:** `11-deployment-operations.md`  
**Status:** Baseline specification  
**Product:** CareerPilot, AI-Powered Placement Preparation Platform  
**Related documents:** `AGENTS.md`, `01-product-spec.md`, `02-requirements.md`, `03-architecture.md`, `04-api-spec.yaml`, `05-data-model.md`, `06-security-spec.md`, `08-ai-spec.md`, `09-integrations-spec.md`, `10-testing-spec.md`

---

## 1. Purpose

This document defines how CareerPilot is configured, built, deployed, operated, monitored, backed up, recovered, and changed across environments.

The goal is to make deployments:

- repeatable
- secure
- observable
- reversible where practical
- compatible with the approved architecture
- independent of developer-machine configuration

The source project defines a React frontend, Spring Boot backend, PostgreSQL database, JWT/Spring Security authentication, and an AI service boundary.

This document intentionally does not lock the project to a particular cloud vendor, AI provider, object-storage vendor, email provider, or CI/CD platform where the source material has not made that decision.

---

# 2. Operational Principles

### OPS-001 Reproducible deployment

The same source revision and approved configuration must produce the same application artifact.

### OPS-002 Environment separation

Development, test, staging, and production must have separate configuration and data boundaries.

### OPS-003 Configuration outside code

Environment-specific values and secrets must not be hardcoded.

### OPS-004 Database is protected infrastructure

PostgreSQL is the primary application system of record. Database changes require controlled migrations and backup/recovery planning.

### OPS-005 Fail safely

A dependency failure must not silently produce false success or corrupted application state.

### OPS-006 Observe before optimizing

Performance and scaling changes should be driven by measured behavior.

### OPS-007 Small operational changes

Do not introduce Kubernetes, service meshes, distributed infrastructure, or additional platforms without an approved architectural reason.

### OPS-008 LTS/stable dependencies

Follow `AGENTS.md`: use LTS releases where available, otherwise stable supported releases. Never upgrade merely because a newer version exists.

---

# 3. Deployment Architecture

The baseline architecture is a modular monolith:

```text
                    Users
                      |
                      v
               Web Application
                 React Frontend
                      |
                      v
              Spring Boot API
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
    PostgreSQL    Object Storage   AI Provider
        |
        v
   Application Data
```

Optional external integrations are accessed through backend-owned adapters.

The frontend must not directly access:

- PostgreSQL
- object-storage credentials
- AI provider credentials
- email provider credentials
- internal administrative services

---

# 4. Deployable Components

The deployment should keep these logical components distinct even when initially hosted on a small number of machines/services.

## 4.1 Frontend

Responsibilities:

- React application
- static assets
- API interaction
- authentication/session UI
- student/staff/admin interfaces

The frontend must contain only public configuration required by the browser.

## 4.2 Backend

Responsibilities:

- REST API
- authentication
- authorization
- business logic
- database access
- file orchestration
- AI orchestration
- integration adapters
- audit/operational behavior

## 4.3 PostgreSQL

Responsibilities:

- system-of-record application data
- relationships
- transactional state
- AI analysis metadata/results
- progress/interview data

## 4.4 Object Storage

Responsibilities:

- resume/document bytes
- other approved uploaded artifacts

PostgreSQL stores metadata and ownership relationships.

## 4.5 External AI Provider

Responsibilities:

- approved AI operations defined by `08-ai-spec.md`

The provider remains outside the application trust boundary.

---

# 5. Environment Model

CareerPilot should distinguish at least:

```text
local
test
staging
production
```

## Local

Purpose:

- developer implementation
- debugging
- isolated experimentation

Properties:

- local or development database
- mocked external services where practical
- no production secrets
- no production student data

## Test

Purpose:

- automated tests
- integration tests
- migration tests
- E2E validation

Properties:

- deterministic test data
- isolated database
- controlled external-service mocks/stubs
- no production credentials

## Staging

Purpose:

- release-candidate validation
- integration verification
- deployment rehearsal
- representative E2E testing

Properties:

- production-like configuration
- non-production data
- separate credentials
- controlled external integrations

## Production

Purpose:

- real users and approved operational workloads

Properties:

- protected secrets
- production database
- private file storage
- monitoring/alerting
- backup/recovery capability
- controlled deployment permissions

---

# 6. Configuration Management

Configuration must be classified.

### Non-secret

Examples:

- application environment
- API base URL
- database host/name
- storage endpoint
- provider identifier
- timeout
- feature configuration

### Secret

Examples:

- database password
- JWT signing secret/key
- AI API key
- storage credentials
- email credentials
- encryption keys

Secrets must be supplied through an approved secret/configuration mechanism.

Never commit:

```text
.env
production credentials
API keys
private certificates
database passwords
JWT secrets
provider tokens
```

unless the repository explicitly contains safe non-secret templates such as `.env.example`.

---

# 7. Secret Management

Production secrets must:

- exist outside source control
- have restricted access
- be rotated according to an approved policy
- not appear in logs
- not be returned through APIs
- not be embedded in frontend bundles

Secret rotation must be tested before it is required operationally.

JWT signing-key changes require special compatibility planning because active tokens may depend on the existing key.

---

# 8. Build Strategy

A release build should be created from a known source revision.

Conceptually:

```text
Git revision
    ↓
Dependency resolution
    ↓
Build
    ↓
Unit tests
    ↓
Integration/API tests
    ↓
Security checks
    ↓
Frontend build
    ↓
Artifact creation
    ↓
Artifact validation
    ↓
Deployment
```

The exact CI platform remains an open decision.

Build artifacts should be identifiable by:

- application version
- source revision
- build timestamp/metadata where appropriate

---

# 9. Backend Build and Runtime

The current backend is a Maven-based Spring Boot application using Java and PostgreSQL. The source project identifies Java, Spring Boot, Spring Security, JWT, REST, Hibernate/JPA, Maven, and PostgreSQL as the baseline technology stack.

The runtime must:

- use the repository-approved Java version
- use the repository-approved Spring Boot version
- load configuration externally
- connect to the correct environment database
- expose only required network interfaces
- run without development/debug settings in production

Do not upgrade Java/Spring Boot solely as part of deployment work.

A runtime/framework upgrade is a separate compatibility-controlled change.

---

# 10. Frontend Build and Runtime

The frontend should produce a deployable static build where the selected architecture permits it.

Build-time configuration must distinguish:

- API base URL
- public application configuration
- environment-specific flags

Never inject:

- AI keys
- database credentials
- JWT signing secrets
- private storage credentials
- admin secrets

into the browser bundle.

---

# 11. Database Operations

PostgreSQL is the primary system of record.

Database operations must use controlled migrations.

Target lifecycle:

```text
Application release
       |
       v
Migration validation
       |
       v
Backup / recovery checkpoint
       |
       v
Database migration
       |
       v
Application deployment
       |
       v
Smoke tests
```

The database specification defines migration control and the target of schema validation rather than relying on automatic production schema mutation.

---

# 12. Database Migration Policy

Every schema change must:

1. identify affected tables
2. identify existing data impact
3. identify application compatibility
4. define migration order
5. test against a clean database
6. test against an existing compatible database
7. define rollback/recovery
8. validate post-migration data
9. update `05-data-model.md` where the model changes

Potentially breaking migrations require an ExecPlan.

Do not manually edit production schema to bypass the migration system.

---

# 13. Deployment Ordering

For a backward-compatible release:

```text
1. Build release
2. Run automated tests
3. Validate migration
4. Apply compatible database migration
5. Deploy backend
6. Deploy frontend
7. Run smoke tests
8. Monitor
```

If a change is not backward compatible, use an explicit migration strategy instead of deploying database and application changes blindly.

---

# 14. Expand-and-Contract Migrations

For high-risk schema/API changes, prefer:

```text
Expand
  ↓
Deploy compatibility code
  ↓
Migrate/backfill
  ↓
Switch consumers
  ↓
Validate
  ↓
Contract/remove old structure
```

Do not remove a field/table/API contract in the same deployment that first introduces its replacement when existing consumers may still depend on it.

---

# 15. Health Checks

The deployment must distinguish basic application health from dependency health.

Conceptual states:

```text
Application process
      ↓
Application health
      ↓
Database readiness
      ↓
Required integration readiness
```

Health endpoints must not expose:

- secrets
- credentials
- internal stack traces
- sensitive configuration

Health checks should be inexpensive.

AI providers should not be called on every ordinary health check merely to prove availability.

---

# 16. Startup Validation

On startup, validate required configuration such as:

- database configuration
- JWT/security configuration
- required storage configuration
- required AI configuration when AI features are enabled

Fail clearly when a mandatory production configuration is missing.

Do not silently use development defaults in production.

---

# 17. Logging

Production logs should be:

- structured
- timestamped
- correlated where practical
- useful for diagnosis
- free of secrets

Log appropriate operational events such as:

- application startup
- shutdown
- request correlation
- authentication failure category
- authorization denial category
- integration failure category
- background processing failure
- migration result
- important administrative events

Do not log:

- passwords
- JWTs
- API keys
- refresh tokens
- full resume contents by default
- unnecessary interview answers
- raw AI payloads containing personal information

---

# 18. Audit Logging

Audit events should be used for security- and administration-relevant actions.

Potential events include:

- staff creation
- role/permission changes
- company changes
- learning-resource changes
- AI configuration changes
- sensitive administrative actions
- security events
- relevant account lifecycle actions

Audit records should identify the actor, action, resource/context, timestamp, and outcome where appropriate.

Audit logging must not become a mechanism for storing unnecessary sensitive content.

---

# 19. Monitoring

Operational monitoring should cover:

### Application

- uptime
- startup failures
- request errors
- latency
- throughput

### Database

- connectivity
- connection usage
- errors
- slow queries where observable
- storage capacity
- migration failures

### File processing

- upload failures
- extraction failures
- processing duration
- queue/backlog if asynchronous processing is introduced

### AI

- provider failures
- latency
- invalid outputs
- retry volume
- usage/cost metadata where available

### External integrations

- provider failures
- rate limits
- timeouts
- authentication/configuration failures

---

# 20. Alerting

Alerts should represent actionable operational conditions.

Potential alert classes:

- application unavailable
- database unavailable
- repeated startup failure
- high API error rate
- sustained latency degradation
- storage capacity risk
- repeated AI provider failure
- failed database migration
- backup failure
- security-critical events

Exact thresholds remain open decisions and should be established from measured behavior and the deployment environment.

Do not create noisy alerts for every isolated user error.

---

# 21. Performance Operations

Performance optimization must be evidence-driven.

Monitor:

- API latency
- database query latency
- frontend load behavior
- resume-processing time
- AI request latency
- concurrent usage
- resource utilization

The requirements document intentionally leaves exact performance thresholds unresolved.

Do not invent arbitrary production SLAs inside the implementation.

Once approved, those thresholds become operational release criteria.

---

# 22. Scaling Strategy

The baseline is a modular monolith.

Scale in this order:

```text
Measure
  ↓
Optimize obvious bottleneck
  ↓
Increase application capacity
  ↓
Separate expensive asynchronous work if required
  ↓
Scale database/storage appropriately
```

Do not introduce microservices merely because the system contains multiple modules.

The architecture explicitly favors a modular monolith and controlled boundaries.

---

# 23. Background Processing

Resume extraction, AI analysis, and other expensive operations may eventually require asynchronous processing.

If introduced:

```text
Request
  ↓
Create processing record
  ↓
Queue/job
  ↓
Worker
  ↓
Process
  ↓
Persist result
  ↓
Update status
```

Requirements:

- idempotent processing
- bounded retries
- failure state
- observable job status
- no duplicate domain results
- safe cancellation/recovery where supported

The exact queue/worker technology is an open decision.

---

# 24. File Storage Operations

Resume/document storage must use private access controls.

Operational requirements:

- separate environment storage
- controlled access
- retention policy
- storage capacity monitoring
- deletion policy
- backup/recovery strategy where required
- integrity metadata such as checksum where defined

Do not expose permanent public URLs for private student documents.

---

# 25. Database Backup

Production PostgreSQL must have an approved backup strategy before production use.

Backups should address:

- scheduled backup
- backup integrity verification
- retention
- secure storage
- access control
- restore testing

A backup that has never been restored/tested must not be treated as proven recovery capability.

Exact:

- frequency
- retention
- storage provider
- encryption method
- recovery point objective
- recovery time objective

remain open decisions.

---

# 26. Disaster Recovery

Recovery planning must cover:

```text
Application failure
Database failure
Storage failure
Provider outage
Credential compromise
Deployment regression
Data corruption
```

Recovery procedures should define:

1. detection
2. containment
3. recovery source
4. restoration order
5. validation
6. communication/ownership
7. post-recovery review

Exact RPO/RTO targets require an explicit operational decision.

---

# 27. Rollback

Every release should have a rollback strategy appropriate to the change.

### Application-only rollback

Deploy the previous validated artifact.

### Database-compatible rollback

Restore previous application version when schema remains compatible.

### Irreversible migration

Do not assume application rollback is safe.

Use:

- backup
- forward-fix
- compatibility migration
- documented recovery

as appropriate.

Before a breaking database change, the rollback/recovery path must be tested.

---

# 28. Deployment Strategies

The default deployment should favor simplicity and reliability.

Possible strategies:

- rolling deployment
- blue/green deployment
- controlled replacement deployment

The exact strategy depends on the hosting environment.

Do not introduce sophisticated deployment infrastructure without operational benefit.

For schema changes, deployment strategy must respect database compatibility.

---

# 29. CI/CD Quality Gate

A production deployment pipeline should conceptually enforce:

```text
Source revision
     ↓
Dependency/build validation
     ↓
Unit tests
     ↓
Integration/API tests
     ↓
Security checks
     ↓
Database migration checks
     ↓
Frontend build/tests
     ↓
AI evaluation where affected
     ↓
Artifact creation
     ↓
Staging deployment
     ↓
Smoke/E2E validation
     ↓
Production approval/deployment
     ↓
Post-deployment validation
```

The exact CI/CD platform is intentionally unresolved.

---

# 30. Release Versioning

Every deployable release should be identifiable.

A release should record:

- application version
- source revision
- build artifact
- database migration state
- relevant dependency versions
- AI provider/model/prompt versions where applicable

Historical AI results must retain their original AI version metadata.

---

# 31. Feature Flags

Feature flags may be used for controlled rollout of high-risk features.

Appropriate uses include:

- unfinished AI capabilities
- new integration providers
- staged UI changes
- operational fallback

Do not create flags for every minor code path.

Every production flag must have:

- owner
- purpose
- default state
- rollout plan
- removal plan

---

# 32. Maintenance Windows

Routine maintenance should be planned for:

- database maintenance
- dependency updates
- security patches
- certificate/key rotation
- infrastructure changes

Emergency security changes may follow an expedited process, but must still be documented and validated.

---

# 33. Dependency Operations

Dependency updates must follow `AGENTS.md`.

Before updating:

1. inspect current version
2. identify usage
3. check official release notes
4. check migration guidance
5. identify breaking changes
6. update relevant plan/spec
7. run compatibility tests
8. deploy deliberately

Never combine unrelated dependency upgrades with feature work unless there is a documented reason.

---

# 34. Security Operations

Operational security must include:

- secret protection
- access control
- credential rotation
- dependency/security updates
- audit review
- backup protection
- private storage
- environment separation
- least-privilege infrastructure access

A production incident involving authentication, authorization, secrets, or sensitive student data requires explicit incident handling.

---

# 35. Incident Response

At minimum:

```text
Detect
  ↓
Classify
  ↓
Contain
  ↓
Investigate
  ↓
Recover
  ↓
Validate
  ↓
Document
  ↓
Prevent recurrence
```

Incident records should capture:

- time
- affected component
- impact
- detection method
- actions taken
- recovery
- root/contributing causes
- corrective actions

Do not expose internal incident details through user-facing error responses.

---

# 36. Operational Data Protection

Production data must be protected during:

- deployment
- backups
- debugging
- migration
- exports
- incident response

Avoid copying real student data into development environments.

If production data is required for diagnosis, use the minimum necessary subset and apply appropriate controls.

---

# 37. Environment Drift

Production should not depend on undocumented manual changes.

Track:

- application version
- configuration
- migration version
- runtime version
- integration configuration
- infrastructure changes

Manual production changes must be documented.

---

# 38. Operational Documentation

The project should maintain only the operational knowledge needed to operate the system.

Important procedures include:

- local startup
- test environment setup
- deployment
- rollback
- migration
- backup
- restore
- secret rotation
- incident response
- health verification

These procedures belong in implementation/operations skills or deployment runbooks as appropriate. Do not duplicate the full procedure across multiple documents.

---

# 39. Production Readiness Checklist

Before production launch:

### Application

- [ ] production configuration is externalized
- [ ] development/debug settings are disabled
- [ ] health checks work
- [ ] logging is safe
- [ ] error responses do not expose internals

### Security

- [ ] secrets are outside source control
- [ ] authentication is validated
- [ ] authorization is validated
- [ ] private files are protected
- [ ] security tests pass

### Database

- [ ] migrations are validated
- [ ] backup strategy exists
- [ ] restore procedure is tested
- [ ] database credentials are protected
- [ ] connection configuration is production-specific

### AI

- [ ] provider configuration is explicit
- [ ] AI output validation is enabled
- [ ] provenance is persisted
- [ ] provider credentials are protected
- [ ] AI evaluation passes for enabled features
- [ ] usage/cost controls exist

### Integrations

- [ ] provider configuration is environment-specific
- [ ] failure behavior is tested
- [ ] retries are bounded
- [ ] sensitive data handling is verified

### Testing

- [ ] required automated tests pass
- [ ] critical E2E journeys pass
- [ ] migration tests pass
- [ ] deployment smoke test passes

### Operations

- [ ] monitoring exists
- [ ] actionable alerts exist
- [ ] rollback/recovery procedure exists
- [ ] ownership is clear
- [ ] release is identifiable

---

# 40. Post-Deployment Validation

Immediately after deployment, validate:

```text
Application starts
      ↓
Health check
      ↓
Database readiness
      ↓
Authentication
      ↓
Protected endpoint
      ↓
Frontend loads
      ↓
Critical student flow
      ↓
Relevant staff/admin flow
      ↓
Monitoring/alerts
```

If a critical smoke test fails:

- stop rollout where possible
- investigate
- rollback or forward-fix according to the release plan
- do not declare the deployment successful

---

# 41. Operational SLO / SLA Decisions

The current project sources do not define final:

- uptime target
- API latency target
- concurrency target
- RPO
- RTO
- AI response-time target
- backup retention
- alert thresholds

These must be explicitly decided before they are used as production acceptance criteria.

Do not manufacture these numbers.

---

# 42. Open Decisions

1. Hosting/cloud provider.
2. Container deployment strategy.
3. CI/CD platform.
4. Container registry.
5. Object-storage provider.
6. Production PostgreSQL hosting model.
7. Backup frequency and retention.
8. RPO/RTO.
9. Monitoring platform.
10. Logging platform.
11. Alerting platform.
12. Email/notification provider.
13. AI provider/model.
14. Background-job technology.
15. Production scaling thresholds.
16. Supported deployment regions.
17. Production domain/TLS setup.
18. Exact staging environment topology.

These decisions should be resolved in the implementation/deployment plan before production infrastructure is finalized.

---

# 43. Implementation Rules for Coding Agents

Before making deployment or infrastructure changes:

1. Read `AGENTS.md`.
2. Read this document.
3. Read `03-architecture.md`.
4. Read `06-security-spec.md`.
5. Read `09-integrations-spec.md`.
6. Inspect existing build/configuration files.
7. Determine whether the change is breaking.
8. Use an ExecPlan for infrastructure, security, migration, dependency, or multi-file changes.
9. Validate locally before changing deployment configuration.
10. Document operational impact.

Never:

- commit secrets
- hardcode production credentials
- use production databases for local development
- silently change deployment/runtime versions
- introduce Kubernetes or microservices without architectural approval
- skip database migration validation
- assume rollback is safe after a schema change
- expose private storage
- disable security controls to make deployment work
- hide deployment failures

---

# 44. Definition of Done

A deployment/operations change is complete only when:

- configuration is documented
- environment boundaries are preserved
- secrets are handled securely
- build is reproducible
- affected tests pass
- migrations are validated where relevant
- health checks work
- logs are safe
- monitoring/alerting impact is considered
- rollback/recovery is defined for material changes
- compatibility impact is assessed
- no unnecessary infrastructure/dependency is introduced
- relevant specifications are updated
- required ExecPlan is current

---

# 45. Operational Traceability

| Concern | Primary source |
|---|---|
| Architecture | `03-architecture.md` |
| API | `04-api-spec.yaml` |
| Database | `05-data-model.md` |
| Security | `06-security-spec.md` |
| AI | `08-ai-spec.md` |
| Integrations | `09-integrations-spec.md` |
| Testing | `10-testing-spec.md` |
| Deployment/operations | This document |
| Agent behavior | `AGENTS.md` |

The source project establishes the React → Spring Boot → PostgreSQL architecture and the AI/integration boundaries.

---

## 46. Final Operational Gate

Before production deployment:

```text
Approved specification
        ↓
Implementation
        ↓
Automated validation
        ↓
Security validation
        ↓
Migration validation
        ↓
Build artifact
        ↓
Staging deployment
        ↓
Smoke + critical E2E
        ↓
Operational readiness
        ↓
Production deployment
        ↓
Post-deployment validation
        ↓
Monitoring
```

The objective is a deployment that is **repeatable, secure, observable, recoverable, and consistent with the approved CareerPilot architecture**, without adding infrastructure complexity that the product does not yet require.
