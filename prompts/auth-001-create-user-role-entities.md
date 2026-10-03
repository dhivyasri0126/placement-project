# TASK PROMPT: AUTH-001 — User, Role, Permission JPA Entities & Repositories

**Task ID:** `AUTH-001`  
**Phase:** Phase 2 — Authentication & Authorization  
**Target Package:** `com.careerpilot.auth`  

---

## 1. Goal & Context
To support user registration, authentication, and RBAC authorization, domain JPA entities and repositories matching the `V1__initial_schema.sql` database schema must be implemented.

This task creates:
- `Role` entity (`@Entity`, `@Table(name = "roles")`, `id`, `name`).
- `Permission` entity (`@Entity`, `@Table(name = "permissions")`, `id`, `name`, `description`).
- `User` entity (`@Entity`, `@Table(name = "users")`, `id`, `name`, `email`, `password`, `active`, `Role`).
- `UserRepository` (`JpaRepository<User, Long>`, `findByEmail(String email)`, `existsByEmail(String email)`).
- `RoleRepository` (`JpaRepository<Role, Long>`, `findByName(String name)`).

---

## 2. Step-by-Step Instructions
1. Create package `com.careerpilot.auth.entity` under `careerpilot-backend/src/main/java`.
2. Implement `Role.java`, `Permission.java`, and `User.java` entities using Lombok annotations (`@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@Builder`).
3. Create package `com.careerpilot.auth.repository` and implement `UserRepository.java` and `RoleRepository.java`.
4. Compile backend via `./mvnw clean compile` to verify JPA entity mappings.

---

## 3. Definition of Done
- Entities `Role`, `Permission`, `User` match Flyway V1 schema.
- Repositories `UserRepository` and `RoleRepository` created with required query methods.
- `./mvnw clean compile` passes with zero errors.
