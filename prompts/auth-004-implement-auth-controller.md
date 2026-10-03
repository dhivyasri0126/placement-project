# TASK PROMPT: AUTH-004 — Authentication Controller & Endpoints

**Task ID:** `AUTH-004`  
**Phase:** Phase 2 — Authentication & Authorization  
**Target Package:** `com.careerpilot.auth`  

---

## 1. Goal & Context
Expose REST APIs for user registration, login, and token refresh per OpenAPI contract (`docs/04-api-spec.yaml`).

Endpoints:
- `POST /api/v1/auth/register` (Registers user, creates default student record if role is STUDENT, returns JWT tokens).
- `POST /api/v1/auth/login` (Authenticates credentials, returns JWT tokens).
- `POST /api/v1/auth/refresh` (Validates refresh token, returns new access token).

This task creates:
- Request/Response DTOs (`RegisterRequest`, `LoginRequest`, `RefreshTokenRequest`, `AuthResponse`).
- `AuthService.java` handling user creation, password encoding (`BCrypt`), authentication, and token generation.
- `AuthController.java` annotated with `@RestController` and `@RequestMapping("/api/v1/auth")`.
- `AuthControllerIntegrationTest.java` testing endpoint contracts with MockMvc.

---

## 2. Step-by-Step Instructions
1. Create `com.careerpilot.auth.dto` package with request/response records/classes.
2. Implement `AuthService.java` in `com.careerpilot.auth.service`.
3. Implement `AuthController.java` in `com.careerpilot.auth.controller`.
4. Create test `AuthControllerTest.java` under `src/test/java/com/careerpilot/auth/controller`.
5. Run `./mvnw clean test` to verify build and test execution.

---

## 3. Definition of Done
- Auth DTOs created with Jakarta validation annotations (`@NotBlank`, `@Email`, `@Size`).
- `POST /register`, `POST /login`, `POST /refresh` endpoints implemented.
- `AuthService` validates duplicate emails and assigns default `ROLE_STUDENT`.
- Integration tests pass via `./mvnw clean test`.
