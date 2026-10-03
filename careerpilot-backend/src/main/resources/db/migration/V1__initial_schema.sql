-- CareerPilot Flyway Migration V1: Initial Database Schema
-- Baseline tables for Authentication, RBAC, Student Profiles, Audit Logs, and AI Request Logs

-- 1. Roles Table
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed Default Roles
INSERT INTO roles (name) VALUES 
('STUDENT'),
('STAFF'),
('SUPER_ADMIN');

-- 2. Permissions Table
CREATE TABLE permissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed Key System Capabilities
INSERT INTO permissions (name, description) VALUES
('PROFILE.READ', 'View student profile'),
('PROFILE.UPDATE', 'Update student profile'),
('RESUME.READ', 'View uploaded resumes'),
('RESUME.CREATE', 'Upload new resume'),
('RESUME.ANALYZE', 'Trigger AI resume analysis'),
('SKILL_GAP.READ', 'View skill gap analysis'),
('LEARNING_PLAN.READ', 'View learning roadmap'),
('INTERVIEW.START', 'Start mock interview session'),
('INTERVIEW.ANSWER', 'Submit interview response'),
('INTERVIEW.EVALUATE', 'Trigger AI answer evaluation'),
('PROGRESS.READ', 'View placement readiness index'),
('STUDENT.READ', 'Staff view of student profiles'),
('REPORT.READ', 'Staff/Admin view of placement reports'),
('COMPANY.CREATE', 'Manage target company catalog'),
('AI.CONFIGURE', 'Super Admin configuration of AI providers');

-- 3. Role Permissions Mapping
CREATE TABLE role_permissions (
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id BIGINT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 4. Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    role_id BIGINT NOT NULL REFERENCES roles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);

-- 5. Students Table
CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    college VARCHAR(255),
    department VARCHAR(255),
    cgpa NUMERIC(3, 2),
    graduation_year INTEGER,
    phone VARCHAR(20),
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_students_user_id ON students(user_id);

-- 6. Audit Logs Table
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    actor_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(255),
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_user_id, created_at);

-- 7. AI Request Logs Table
CREATE TABLE ai_request_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    feature VARCHAR(100) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    total_tokens INTEGER,
    latency_ms BIGINT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_request_logs_user ON ai_request_logs(user_id, created_at);

