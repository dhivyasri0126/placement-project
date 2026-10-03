# TASK PROMPT: AUTH-002 — JWT Token Provider Service

**Task ID:** `AUTH-002`  
**Phase:** Phase 2 — Authentication & Authorization  
**Target Package:** `com.careerpilot.auth.security`  

---

## 1. Goal & Context
Stateless authentication in CareerPilot uses JWT access tokens and refresh tokens per `docs/06-security-spec.md`.

This task creates:
- `JwtTokenProvider.java` component (`@Component`).
- Secret key initialization using HMAC-SHA256 (`Keys.hmacShaKeyFor`).
- `generateAccessToken(Authentication authentication)`
- `generateRefreshToken(User user)`
- `validateToken(String token)`
- `getUsernameFromToken(String token)`
- `getUserIdFromToken(String token)`

---

## 2. Step-by-Step Instructions
1. Create package `com.careerpilot.auth.security`.
2. Implement `JwtTokenProvider.java` using JJWT 0.12.x API standards.
3. Inject `@Value("${jwt.secret}")`, `@Value("${jwt.expiration-ms}")`, and `@Value("${jwt.refresh-expiration-ms}")`.
4. Compile backend via `./mvnw clean compile`.

---

## 3. Definition of Done
- `JwtTokenProvider.java` created using JJWT 0.12.x.
- Access token and refresh token generation methods implemented.
- Token validation handles expired, malformed, unsupported, or invalid signature tokens cleanly.
- `./mvnw clean compile` passes.
