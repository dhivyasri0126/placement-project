# TASK PROMPT: AUTH-005 — Secure In-Memory Access Token & HttpOnly Cookie Refresh Architecture

**Task ID:** `AUTH-005`  
**Phase:** Security & Authentication Hardening  
**Target Areas:** `com.careerpilot.auth` (Backend) & `careerpilot-frontend/src` (Frontend)

---

## 1. Goal & Context
Refactor the authentication architecture from insecure `localStorage` token storage to a secure lightweight pattern suitable for production:
- **Short-lived Access Token:** Kept strictly in-memory (React Context state) to prevent persistence and XSS theft.
- **Long-lived Refresh Token:** Transmitted and stored strictly inside an `HttpOnly`, `Secure`, `SameSite=Lax` cookie scoped to `/api/v1/auth`.
- **Endpoints Supported:**
  - `POST /api/v1/auth/login`: Authenticates, returns Access Token + expiration in JSON body, attaches Refresh Token cookie.
  - `POST /api/v1/auth/register`: Creates user, returns Access Token + expiration in JSON body, attaches Refresh Token cookie.
  - `POST /api/v1/auth/refresh`: Reads Refresh Token from HttpOnly cookie, rotates refresh token, returns fresh Access Token + expiration, sets updated cookie.
  - `POST /api/v1/auth/logout`: Clears and invalidates the HttpOnly Refresh Token cookie (`maxAge = 0`).
- **Frontend Interceptor & Silent Refresh:**
  - Axios configured with `withCredentials: true`.
  - In-memory token injected via request interceptor.
  - 401 response interceptor with token refresh queue.
  - Silent refresh initialized on app mount (to recover session after page reload).
  - Proactive silent refresh timer calculated using `expiresIn - buffer` before expiration.

---

## 2. Step-by-Step Instructions

### Backend:
1. Update `JwtTokenProvider.java` to expose accessor for `jwtExpirationMs` and `jwtRefreshExpirationMs`.
2. Update `AuthResponse.java` to include `expiresIn` (milliseconds) and mark `refreshToken` as `@JsonInclude(JsonInclude.Include.NON_NULL)`.
3. Add cookie configuration helper in `AuthController.java` or `AuthCookieService.java` for creating/clearing `ResponseCookie`.
4. Update `AuthController.java`:
   - `/login` and `/register`: Set `Set-Cookie` with `refreshToken` and return JSON with `accessToken`, `expiresIn`, and user details.
   - `/refresh`: Read `@CookieValue(name = "refreshToken", required = false)`, validate, rotate token, return fresh `accessToken` + `expiresIn`, set new cookie.
   - `/logout`: Clear `refreshToken` cookie (`maxAge(0)`).
5. Update `AuthControllerTest.java` and any related tests.

### Frontend:
1. Update `types/auth.ts` to include `expiresIn?: number` and make `refreshToken` optional.
2. Update `api/client.ts` to set `withCredentials: true`, read access token from in-memory accessor, and queue/retry 401s during refresh.
3. Update `context/AuthContext.tsx`:
   - Keep `accessToken` strictly in React state (no `localStorage`).
   - Remove `localStorage.setItem('careerpilot_token')` and `localStorage.setItem('careerpilot_refresh_token')`.
   - Implement `isInitializing` state for initial load.
   - Implement silent refresh on mount (`/auth/refresh`) and pre-expiration timer.
   - Implement `logout` calling `/api/v1/auth/logout` to clear server cookie.
4. Update `ProtectedRoute.tsx` and `App.tsx` to handle `isInitializing` loading state cleanly.
5. Verify build and tests pass for both backend and frontend.

---

## 3. Definition of Done
- No JWT tokens stored in `localStorage` or `sessionStorage`.
- Refresh token transmitted only via secure HttpOnly cookie.
- Backend `/login`, `/register`, `/refresh`, `/logout` handle cookie headers properly.
- Silent refresh keeps sessions active on page refresh and before token expiry.
- Frontend builds cleanly (`npm run build`).
- Backend unit and integration tests pass (`mvn test`).
