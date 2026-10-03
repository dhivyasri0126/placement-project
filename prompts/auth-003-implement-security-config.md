# TASK PROMPT: AUTH-003 — Spring Security Configuration & JWT Filter

**Task ID:** `AUTH-003`  
**Phase:** Phase 2 — Authentication & Authorization  
**Target Package:** `com.careerpilot.auth`  

---

## 1. Goal & Context
Spring Security must protect `/api/v1/**` endpoints while permitting unauthenticated access to `/api/v1/auth/**`, `/actuator/health`, and Swagger API docs per `docs/06-security-spec.md`.

This task creates:
- `CustomUserDetailsService.java` loading user details from `UserRepository`.
- `JwtAuthenticationFilter.java` intercepting requests, parsing Bearer tokens via `JwtTokenProvider`, and establishing `SecurityContextHolder` authentication.
- `SecurityConfig.java` configuring `SecurityFilterChain`, `BCryptPasswordEncoder`, stateless session management (`SessionCreationPolicy.STATELESS`), CORS configuration, and RBAC authorization rules.

---

## 2. Step-by-Step Instructions
1. Create `CustomUserDetailsService.java` in `com.careerpilot.auth.security`.
2. Create `JwtAuthenticationFilter.java` in `com.careerpilot.auth.security`.
3. Create `SecurityConfig.java` in `com.careerpilot.auth.config`.
4. Compile backend via `./mvnw clean compile`.

---

## 3. Definition of Done
- Stateless SecurityFilterChain protecting REST API endpoints.
- `/api/v1/auth/**` permitted for unauthenticated requests.
- BCryptPasswordEncoder bean registered.
- `./mvnw clean compile` passes cleanly.
