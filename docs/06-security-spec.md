# CareerPilot Security Specification

**Document ID:** CP-DOC-06  
**Status:** Baseline  
**Version:** 1.0  
**Scope:** Authentication, authorization, session security, application security, data protection, audit, and security validation

---

## 1. Purpose

This document defines the security model for CareerPilot.

CareerPilot handles:

- student identity and profile information
- resumes and extracted resume content
- learning and interview history
- AI-generated analyses and feedback
- staff access to student progress
- administrative configuration

Security must therefore protect confidentiality, integrity, availability, authentication state, authorization boundaries, and the provenance of important AI-derived data.

This document is the security source of truth. Implementation must follow this specification together with `AGENTS.md`, the requirements, API specification, and data model.

---

## 2. Security Objectives

CareerPilot must:

1. Authenticate users reliably.
2. Authorize every protected operation on the server.
3. Prevent one student from accessing another student's private data.
4. Restrict Staff access to their permitted student scope.
5. Restrict Super Admin capabilities to explicitly defined administrative operations.
6. Protect passwords, access tokens, refresh credentials, reset tokens, and secrets.
7. Protect resumes and other sensitive student data.
8. Prevent common web/API attacks.
9. Record important security events without logging secrets or unnecessary personal data.
10. Preserve the integrity and provenance of AI-generated results.
11. Fail closed when authentication or authorization information is missing or invalid.
12. Make security behavior testable.

---

## 3. Security Principles

### 3.1 Server-side authority

The backend is authoritative for authentication and authorization.

Frontend route guards and UI capability checks are usability controls only. They must never be treated as security boundaries.

### 3.2 Least privilege

Every user, service, database account, token, and integration receives only the access required for its function.

### 3.3 Deny by default

Protected resources are denied unless an explicit authentication and authorization decision allows the operation.

### 3.4 Defense in depth

Spring Security authorization, service-layer ownership checks, database constraints, and optional PostgreSQL RLS may provide complementary controls.

RLS must not replace application authorization.

### 3.5 Secure failure

Security failures must not reveal:

- whether a password was correct
- whether a sensitive account exists
- internal stack traces
- database credentials
- JWT signing material
- AI provider credentials
- private resume contents

### 3.6 Evidence over inference

Security-sensitive application facts must come from authenticated identity, database state, validated application data, or trusted external sources.

AI output is not itself an authorization authority.

---

# 4. Threat Model

## 4.1 Protected assets

| Asset | Main concern |
|---|---|
| User credentials | Account takeover |
| Access tokens | Unauthorized API access |
| Refresh credentials | Persistent session compromise |
| Password reset tokens | Account takeover |
| Student profiles | Privacy |
| Resumes | Privacy and intellectual-property exposure |
| Interview answers | Privacy and academic/career information |
| AI analyses | Integrity and privacy |
| Staff reports | Cross-user data exposure |
| Company configuration | Integrity |
| Learning resources | Integrity |
| Audit events | Accountability |
| Application secrets | Platform compromise |
| Database credentials | Full data compromise |

## 4.2 Relevant threat classes

CareerPilot must explicitly consider:

- credential stuffing
- brute-force login attempts
- password reuse
- session/token theft
- JWT validation failures
- token replay
- refresh-token theft
- password-reset abuse
- CSRF where cookie credentials are used
- XSS
- SQL injection
- insecure direct object references
- privilege escalation
- cross-student data access
- malicious file uploads
- malicious resume content
- oversized requests/files
- sensitive data leakage through logs/errors
- compromised external AI/integration responses
- administrator misuse
- dependency vulnerabilities
- accidental secret exposure

---

# 5. Authentication Architecture

The existing application uses Spring Security, JWT authentication, BCrypt password hashing, and stateless API authentication.

These are preserved as the compatibility baseline.

The target authentication model is:

```text
Credential
   ↓
Authentication service
   ↓
Password verification
   ↓
Account status check
   ↓
Short-lived access token
   ↓
Protected API
```

Where refresh sessions are introduced:

```text
Login
  ↓
Access JWT + refresh credential
  ↓
Access JWT expires
  ↓
Refresh session validation
  ↓
Rotated refresh credential
  ↓
New access JWT
```

---

# 6. Registration

## 6.1 Required behavior

Registration must:

1. Validate all required fields.
2. Normalize the login identity according to the approved email policy.
3. Check account uniqueness.
4. Hash the password.
5. Assign the permitted initial role.
6. Create the account atomically.
7. Never store plaintext passwords.
8. Return a response consistent with the current API contract until a deliberate API migration occurs.

## 6.2 Initial role

Public registration creates:

```text
STUDENT
```

Staff and Super Admin accounts must not be created through the public student registration path.

Administrative account creation must require appropriate authorization.

---

# 7. Password Security

Passwords must never be stored in plaintext or reversible encryption.

The existing application uses BCrypt. Existing hashes must remain compatible during migration.

For new password-storage decisions, the project should follow the selected password-hashing guidance and document any algorithm change as a deliberate compatibility migration.

Password policy must define:

- minimum length
- maximum accepted length
- handling of whitespace
- breached/common-password policy if adopted
- password-change behavior
- reset behavior

Do not impose arbitrary complexity rules unless they provide a documented security benefit.

Password verification must use the framework's secure password comparison mechanism.

Reference: OWASP Password Storage Cheat Sheet.

---

# 8. Login Security

## 8.1 Login flow

```text
POST /api/auth/login
        ↓
Validate request
        ↓
Find account
        ↓
Verify password
        ↓
Check account status
        ↓
Issue authentication credentials
        ↓
Audit successful login
```

Failed login attempts must use a generic authentication failure response.

Do not reveal whether:

- the email exists
- the password was correct
- the account was created recently

unless the product/security design explicitly requires a different authenticated flow.

## 8.2 Rate limiting

Login and authentication endpoints must be rate limited.

Controls should consider:

- source/IP characteristics
- account identity
- repeated failures
- distributed attempts

Rate limiting must not create an easy denial-of-service mechanism against legitimate users.

Exact thresholds are an operational decision and must be configurable rather than hardcoded into business logic.

---

# 9. Access JWT

The access token remains a short-lived bearer credential.

Target design:

- short lifetime
- signed
- explicit issuer
- explicit audience
- subject identifying the authenticated user
- issued-at timestamp
- expiration timestamp
- unique token identifier where required
- minimal claims

Recommended claims:

```text
iss
sub
aud
iat
exp
jti
```

Role may remain available for compatibility, but authorization must not depend on a large embedded permission list.

The backend must validate:

1. signature
2. allowed algorithm
3. issuer
4. audience
5. expiration
6. not-before if used
7. token type/context where applicable
8. subject
9. account state where required

JWT verification must use an explicit allowed algorithm configuration. Algorithm selection must not be inferred blindly from attacker-controlled token metadata.

Reference: RFC 8725, JSON Web Token Best Current Practices.

---

# 10. JWT Secret and Key Management

The current hardcoded JWT secret is not acceptable for production.

Signing material must be externalized.

It must never be:

- committed to Git
- placed in frontend code
- returned by an API
- written to ordinary logs
- included in test fixtures that represent production credentials

The project must define a controlled key rotation strategy before production.

If asymmetric signing is adopted later, the change requires an explicit migration plan because token validation and deployment configuration are affected.

Do not change the existing signing mechanism solely because another mechanism exists. Treat it as a security/compatibility migration.

---

# 11. Refresh Sessions

A refresh-token/session mechanism is required when long-lived login sessions are introduced.

Design:

```text
Client
  ↓
opaque random refresh credential
  ↓
server stores only token hash
  ↓
refresh request
  ↓
hash lookup + session validation
  ↓
rotate credential
  ↓
issue new access JWT
```

## Rules

- Store only a cryptographic hash of the refresh credential.
- Never store the raw refresh credential.
- Give each session a unique database record.
- Support revocation.
- Support expiration.
- Rotate refresh credentials after successful use.
- Detect reuse of an already-rotated credential.
- Revoke the affected session chain when reuse indicates possible theft.
- Record security-relevant refresh events.

For a browser application, refresh credentials should not be exposed to JavaScript storage.

OWASP's current session guidance specifically advises against storing authentication tokens, session IDs, JWTs, or refresh tokens in `localStorage` or `sessionStorage`. Prefer protected cookies or an equivalent architecture.

---

# 12. Browser Credential Storage

Do not store long-lived authentication credentials in:

```text
localStorage
sessionStorage
```

For a browser refresh session, the preferred design is an:

```text
HttpOnly
Secure
SameSite
```

cookie with an explicit domain/path policy.

If authentication credentials are sent automatically by the browser, CSRF protection must be designed together with the credential mechanism.

The access-token transport must remain consistent with the selected frontend architecture and API contract.

---

# 13. CSRF

CSRF protection depends on how credentials are transported.

### Bearer token in Authorization header

A token that must be explicitly attached by application code is not automatically sent by the browser in the same way as a cookie, so classic cookie-based CSRF exposure is different.

### Cookie-based refresh/session operations

Requests authenticated by cookies require CSRF protection for state-changing operations.

The exact mechanism must be selected during frontend/security implementation.

Do not disable CSRF globally merely because the API is stateless if browser cookies are subsequently introduced.

---

# 14. Logout

Logout must invalidate the server-side refresh session where refresh sessions exist.

Expected flow:

```text
Logout
 ↓
Identify refresh session
 ↓
Revoke session
 ↓
Clear browser credential
 ↓
Audit event
```

Short-lived access JWTs may remain cryptographically valid until expiry unless a server-side revocation mechanism is introduced.

High-risk account events such as password reset or administrator disablement should invalidate applicable active sessions.

---

# 15. Forgot Password

The forgot-password flow must not reveal account existence.

Example:

```text
POST /api/auth/forgot-password
        ↓
Accept email
        ↓
Return generic response
        ↓
If account exists:
    generate random single-use token
    store only token hash
    set expiry
    deliver reset link
```

The reset token must:

- be cryptographically random
- be single use
- expire
- be stored only as a hash
- be invalidated after successful use
- not appear in logs

Reset requests must be rate limited.

After a successful password reset, applicable active sessions should be invalidated.

---

# 16. Role Model

CareerPilot has three initial roles:

```text
STUDENT
STAFF
SUPER_ADMIN
```

Role assignment is server-controlled.

A client must never be allowed to choose its own privileged role through registration or profile update.

Role changes require an authorized administrative operation and must be audited.

---

# 17. Authorization Model

CareerPilot uses layered authorization:

```text
Authentication
      ↓
Role/capability authorization
      ↓
Resource ownership/scope
      ↓
Business-state rules
      ↓
Database defense in depth
```

## 17.1 RBAC

Roles provide broad capability bundles.

Example conceptual scope:

| Role | Primary scope |
|---|---|
| Student | Own preparation data |
| Staff | Authorized student monitoring/reporting scope |
| Super Admin | Platform administration |

This table is descriptive, not a complete permission matrix.

## 17.2 Fine-grained permissions

Permissions are represented as atomic capabilities.

Examples:

```text
RESUME.READ
RESUME.CREATE
RESUME.UPDATE
RESUME.ANALYZE

PROFILE.READ
PROFILE.UPDATE

SKILL_GAP.READ
SKILL_GAP.GENERATE

INTERVIEW.READ
INTERVIEW.START
INTERVIEW.ANSWER
INTERVIEW.EVALUATE

STUDENT.READ
REPORT.READ
REPORT.EXPORT

COMPANY.READ
COMPANY.CREATE
COMPANY.UPDATE
COMPANY.DELETE
```

The complete permission catalog belongs in implementation and must remain aligned with the API and data model.

---

# 18. Resource Authorization

Role checks alone are insufficient.

For a Student resource, the backend must verify ownership:

```text
authenticated user
        ↓
requested resource
        ↓
resource owner
        ↓
allow/deny
```

Example:

```text
Student A requests Student B's resume
        ↓
ownership check fails
        ↓
403 Forbidden
```

Do not rely on an ID being difficult to guess as an authorization mechanism.

Staff access must additionally verify the staff member's authorized student scope.

---

# 19. Authorization Decision Location

Authorization must be enforced server-side.

Recommended responsibility:

```text
Controller
  ↓
Authentication established
  ↓
Authorization / permission check
  ↓
Service ownership/scope check
  ↓
Repository/data access
```

Do not place security-critical authorization only in controllers or frontend route logic.

Business services must protect against internal callers accidentally bypassing resource ownership rules.

---

# 20. JWT Claims and Authorization

Do not place the entire permission graph in JWT claims.

Reasons:

- permissions can change while a token remains valid
- role changes require invalidation considerations
- large tokens increase request size
- resource ownership cannot safely be represented as static claims

JWT identity establishes who is making the request.

The backend evaluates current authorization state for sensitive operations.

---

# 21. Staff Access

Staff access is more sensitive than ordinary Student access because it exposes multiple student records.

Every staff data request must evaluate:

1. authenticated staff identity
2. staff role/capability
3. permitted student scope
4. requested resource
5. requested action

Bulk endpoints must apply the same scope rules as individual endpoints.

Export/report operations require explicit permission and must be audited.

---

# 22. Super Admin Access

Super Admin operations include administrative capabilities defined by the product requirements.

Examples:

- staff management
- company management
- learning-resource management
- AI configuration

Administrative endpoints must not use a generic "is authenticated" rule.

Sensitive administrative changes require:

- explicit permission
- server-side validation
- audit event
- appropriate confirmation/re-authentication where required

---

# 23. PostgreSQL RLS

PostgreSQL Row-Level Security is a defense-in-depth mechanism.

It may be introduced for highly sensitive student-owned data after the application transaction identity context is reliable.

The intended model is:

```sql
SELECT set_config('app.user_id', :user_id, true);
SELECT set_config('app.role', :role, true);
```

Policies may then use trusted database functions to evaluate application identity.

## RLS requirements

- Application roles must not bypass policies through excessive database privileges.
- Database owners/superusers must not be used as the normal application identity.
- Background jobs need an explicit service identity.
- Policies require positive and negative integration tests.
- RLS must not be enabled partially in a way that creates unpredictable access behavior.

---

# 24. Password and Credential Logging

Never log:

- passwords
- password hashes
- access tokens
- refresh tokens
- reset tokens
- JWT signing secrets
- API keys
- database passwords
- authorization headers
- complete resume contents

Logs may contain a non-sensitive event identifier and sanitized account/resource identifiers when operationally necessary.

---

# 25. Sensitive Data Protection

Sensitive student data includes:

- email
- phone
- academic information
- resumes
- interview answers
- staff observations
- AI analyses containing student information

Protect it through:

- TLS in transit
- database access control
- object-storage access control
- least-privilege service accounts
- restricted API responses
- secure logs
- retention rules
- controlled exports

The frontend should receive only fields required for the current screen.

---

# 26. Resume Upload Security

Resume upload is an untrusted file-input boundary.

The backend must validate:

- authenticated owner
- allowed content type
- file size
- file signature/magic bytes where appropriate
- filename safety
- storage key generation
- checksum where required

Do not trust a client-supplied filename or MIME type as the only validation.

Uploaded files must not become executable application content.

Store resumes outside the application executable directory.

Prefer generated object-storage keys instead of user-controlled paths.

---

# 27. Resume Processing Security

Resume processing may involve:

```text
upload
 ↓
object storage
 ↓
text extraction
 ↓
sanitization/validation
 ↓
AI analysis
 ↓
validated application result
```

Resume content must be treated as untrusted input.

Prompt injection contained inside a resume must not override system instructions, authorization rules, or application policies.

AI extraction must not automatically change verified student facts.

---

# 28. AI Security Boundary

AI is not an authority for:

- authentication
- authorization
- role assignment
- ownership
- account status
- staff scope
- official company requirements without evidence
- student achievements without evidence
- learning completion
- interview scores without the defined evaluation flow

AI output must be:

1. generated from permitted inputs
2. validated against an expected structure
3. associated with provenance
4. stored with provider/model/version metadata where required
5. prevented from directly executing privileged actions

---

# 29. Prompt Injection

External/user-controlled content may contain instructions intended to manipulate the AI.

Examples include text inside:

- resumes
- job descriptions
- student answers
- imported learning content

Treat such content as data, not instructions.

The AI orchestration boundary must clearly separate:

```text
system/application instructions
trusted project context
trusted runtime data
untrusted user/external content
```

The model must not be allowed to reinterpret untrusted content as higher-priority instructions.

---

# 30. External AI Providers

AI provider credentials must remain server-side.

The frontend must never call a provider directly using a platform secret.

Provider integrations must use:

```text
Application
   ↓
AI service boundary
   ↓
Provider adapter
   ↓
External provider
```

The application must control:

- allowed models
- request size
- timeout
- retry policy
- response validation
- cost limits where configured
- data minimization
- provider-specific privacy settings

Provider failures must fail safely without exposing internal credentials or raw provider errors.

---

# 31. API Security

Every protected endpoint must define:

- authentication requirement
- authorization requirement
- input validation
- resource ownership/scope
- expected errors
- rate-limit sensitivity where relevant

API endpoints must reject unexpected or malformed input.

Never construct SQL from raw user input.

JPA/repository parameterization must be used for database queries.

---

# 32. Error Handling

Production errors must use the project's standardized error representation.

The API specification defines `ProblemDetails` as the target error representation.

Security errors should distinguish only what the client needs:

```text
401 Unauthorized
```

when authentication is missing/invalid.

```text
403 Forbidden
```

when the identity is authenticated but not permitted.

```text
404 Not Found
```

may be used where resource non-existence should not disclose authorization-sensitive information.

Do not return stack traces or internal exception details.

---

# 33. CORS

CORS must use an explicit allowlist.

Production must not use:

```text
Access-Control-Allow-Origin: *
```

together with credentialed browser authentication.

Allowed origins must be environment configuration, not hardcoded into frontend business logic.

Development and production origins must be separately configurable.

---

# 34. HTTP Security

Production traffic must use HTTPS.

Security headers should be configured according to the deployed architecture, including appropriate controls for:

- content type sniffing
- framing
- referrer policy
- browser feature permissions
- content security policy where applicable

Do not introduce headers blindly if they conflict with the actual frontend deployment model. Validate them in the deployed environment.

---

# 35. Request Limits

Protect API endpoints against oversized requests.

Limits should exist for:

- JSON body size
- multipart upload size
- resume size
- query parameter size
- pagination bounds
- AI input size

Exact values are configuration decisions and must be based on product requirements and measured operational behavior.

---

# 36. Rate Limiting

Rate limiting should protect high-risk or expensive operations:

```text
login
forgot-password
password-reset
resume-analysis
AI mock interview generation
AI evaluation
report export
```

Rate limiting must be applied at an appropriate boundary and must not depend solely on client-provided identity fields.

AI operations should additionally have cost/usage controls.

---

# 37. Database Security

Production application database access must use a least-privileged runtime account.

Conceptual roles:

```text
careerpilot_owner
careerpilot_migrator
careerpilot_app
careerpilot_readonly
```

The runtime application account must not be a PostgreSQL superuser.

Migration credentials must be separate from runtime credentials.

Database credentials must be supplied through deployment secret management.

---

# 38. Secrets Management

Secrets include:

- JWT signing keys
- database passwords
- AI provider keys
- email credentials
- object-storage credentials
- refresh/session secrets
- encryption keys

Rules:

- never commit secrets
- never place secrets in frontend bundles
- never place production secrets in documentation
- never log secrets
- use environment/secret-management mechanisms
- rotate credentials according to operational policy
- revoke exposed credentials immediately

`.env` files containing real secrets must not be committed.

---

# 39. Audit Events

Important events must be auditable.

Examples:

```text
LOGIN_SUCCESS
LOGIN_FAILURE
LOGOUT
PASSWORD_RESET_REQUESTED
PASSWORD_RESET_COMPLETED
PASSWORD_CHANGED
ROLE_CHANGED
ACCOUNT_DISABLED
RESUME_UPLOADED
RESUME_ANALYSIS_COMPLETED
STAFF_ACCESS
REPORT_EXPORTED
COMPANY_CHANGED
AI_CONFIGURATION_CHANGED
```

Audit records should contain enough information to investigate the event without storing unnecessary sensitive content.

Audit data should be append-oriented and protected from ordinary modification.

---

# 40. Account Lifecycle

Account states must be explicit.

At minimum, the security model must distinguish:

```text
active
disabled
```

Additional states such as pending verification must only be introduced when required.

A disabled account must not successfully authenticate or refresh a session.

Administrative account changes must be audited.

---

# 41. Re-authentication

Require recent authentication or current credential verification for particularly sensitive operations, such as:

- password change
- email identity change
- privileged account changes
- security-setting changes
- other high-impact actions identified during implementation

This is a security control in addition to ordinary session authentication.

---

# 42. Dependency Security

Dependencies must follow the project's dependency policy.

Before adding or upgrading a security-sensitive dependency:

1. inspect current version and usage
2. check official release/security information
3. determine compatibility impact
4. identify migration requirements
5. update the relevant plan/specification
6. test the affected security behavior

Do not perform unrelated dependency upgrades while implementing a security feature.

---

# 43. Security Testing

Security testing is part of Definition of Done.

## Authentication tests

- valid registration
- duplicate registration
- invalid registration
- valid login
- invalid credentials
- disabled account
- malformed token
- expired token
- wrong signature
- wrong issuer
- wrong audience
- disallowed algorithm
- logout/session revocation
- password reset
- reset-token reuse
- refresh-token rotation/reuse detection

## Authorization tests

- Student accesses own resource
- Student cannot access another student's resource
- Staff accesses permitted student
- Staff cannot access out-of-scope student
- Student cannot access staff endpoints
- Staff cannot access Super Admin operations
- Super Admin access follows explicit permissions
- direct object identifiers cannot bypass ownership

## Input/security tests

- SQL injection payloads
- XSS payloads
- malformed JSON
- oversized request
- oversized resume
- invalid file type
- path traversal attempt
- malicious filename
- invalid pagination
- unexpected fields where rejected

## AI security tests

- prompt injection in resume
- prompt injection in job description
- prompt injection in interview answer
- malformed AI output
- unsupported claims
- provider timeout
- provider error
- provider credential failure
- excessive input size

## RLS tests

If RLS is enabled:

- owner allow case
- non-owner deny case
- staff scope allow/deny
- admin policy
- background service identity
- direct SQL access under application role

---

# 44. Security Observability

Security monitoring should surface:

- repeated failed logins
- unusual password-reset volume
- refresh-token reuse
- repeated authorization failures
- unexpected administrative activity
- abnormal AI usage
- repeated upload failures
- suspicious report exports

Monitoring must avoid collecting unnecessary sensitive content.

Security alerts should contain an investigation identifier and enough metadata to correlate with audit events.

---

# 45. Security Configuration

Security-sensitive configuration must be environment-specific.

Examples:

```text
JWT issuer
JWT audience
JWT signing configuration
access-token lifetime
refresh-session lifetime
CORS allowed origins
upload limits
rate limits
AI provider configuration
database credentials
object-storage credentials
```

Defaults used for local development must not silently become production credentials or permissive production settings.

---

# 46. Existing Security Gaps Requiring Planned Remediation

The inspected existing backend has the following security-relevant gaps:

1. JWT signing secret is hardcoded.
2. JWT lifetime is hardcoded.
3. Role-specific authorization is incomplete.
4. Forgot-password/reset-password is absent.
5. Refresh-session support is absent.
6. Error response security contract is incomplete.
7. CORS strategy is not explicitly defined.
8. Security integration coverage is limited.
9. The temporary protected test endpoint remains in the codebase.
10. Database schema management currently relies on Hibernate update behavior.
11. Security logging configuration requires production review.

These are remediation items, not reasons to rewrite the authentication foundation.

---

# 47. Compatibility and Migration Rules

Security changes must preserve the current authentication contract unless an explicit migration is approved.

Current compatibility requirements:

```text
POST /api/auth/register
POST /api/auth/login
```

The existing login response fields remain:

```json
{
  "token": "...",
  "email": "...",
  "role": "STUDENT"
}
```

Role names remain:

```text
STUDENT
STAFF
SUPER_ADMIN
```

Any transition to:

- short-lived access tokens
- refresh sessions
- asymmetric JWT signing
- changed cookie strategy
- new API error contracts
- new permission evaluation

must define compatibility, rollout, migration, rollback, and test coverage before implementation.

---

# 48. Security Change Process

For security-sensitive changes:

```text
Inspect
  ↓
Threat/model impact
  ↓
ExecPlan
  ↓
Specification update
  ↓
Implementation
  ↓
Security tests
  ↓
Integration validation
  ↓
Migration validation
  ↓
Review
  ↓
Documentation
```

No security-sensitive migration should be performed as an ad-hoc code change.

---

# 49. Open Security Decisions

The following values are intentionally unresolved:

1. Exact access-token lifetime.
2. Exact refresh-session lifetime.
3. Refresh-token reuse-response policy.
4. Exact password policy.
5. Password-hashing algorithm migration plan from existing BCrypt.
6. Email verification requirement.
7. Exact rate limits.
8. Exact upload-size limit.
9. Exact AI request/cost limits.
10. Exact CORS production origins.
11. Exact security-header policy for deployment.
12. Exact audit-retention period.
13. Exact student/staff organizational scope model.
14. Whether RLS is required for the first production release.
15. Exact key-rotation mechanism.
16. Whether an external identity provider will be introduced later.

These values must not be guessed during implementation.

---

# 50. Security Definition of Done

A security change is complete only when:

- authentication behavior is tested
- authorization behavior is tested
- ownership/scope checks are tested
- secrets are externalized
- sensitive values are absent from logs
- input validation is present
- error responses do not leak internals
- relevant rate limits are applied
- file uploads are validated
- AI inputs/outputs respect the security boundary
- migrations are tested if the schema changes
- existing authentication compatibility is verified
- relevant API contracts are updated
- security documentation is updated
- the required ExecPlan is current
- no unnecessary dependency or architecture change was introduced

---

# 51. Reference Standards and Guidance

This specification uses the following authoritative references:

- OWASP Authentication Cheat Sheet
- OWASP Password Storage Cheat Sheet
- OWASP Session Management Cheat Sheet
- RFC 8725, JSON Web Token Best Current Practices
- RFC 6750, OAuth 2.0 Bearer Token Usage
- Spring Security reference documentation for bearer-token/JWT resource-server behavior
- PostgreSQL Row-Level Security documentation

These references provide security guidance; the repository's specifications remain authoritative for CareerPilot-specific behavior.

---

# 52. Next Specification

The next planned document is:

`07-ux-design-spec.md`

Security implementation must remain aligned with the API, data model, UX flows, and AI boundaries defined by the other project specifications.
