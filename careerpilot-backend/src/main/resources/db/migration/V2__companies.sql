-- CareerPilot Flyway Migration V2: Target Companies and Job Role Requirements

-- 1. Companies Table
CREATE TABLE companies (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    normalized_name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    website VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_companies_normalized ON companies(normalized_name);

-- Seed Initial Target Companies
INSERT INTO companies (name, normalized_name, description, website) VALUES
('Google', 'google', 'Global technology company specializing in internet-related services and AI.', 'https://google.com'),
('Amazon', 'amazon', 'Multinational technology company focusing on e-commerce, cloud computing, and AI.', 'https://amazon.com'),
('Microsoft', 'microsoft', 'Global leader in software, cloud computing, and enterprise services.', 'https://microsoft.com'),
('TCS', 'tcs', 'Leading global IT services, consulting, and business solutions organization.', 'https://tcs.com');

-- 2. Company Roles Table
CREATE TABLE company_roles (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_company_roles_company ON company_roles(company_id);

-- 3. Company Role Skill Requirements Table
CREATE TABLE company_role_skill_requirements (
    id BIGSERIAL PRIMARY KEY,
    company_role_id BIGINT NOT NULL REFERENCES company_roles(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    requirement_type VARCHAR(50) NOT NULL DEFAULT 'REQUIRED', -- REQUIRED, PREFERRED
    importance INTEGER NOT NULL DEFAULT 1,
    source VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_company_skill_req_role ON company_role_skill_requirements(company_role_id);

-- 4. Target Company Selection for Students
ALTER TABLE students ADD COLUMN target_company_id BIGINT REFERENCES companies(id) ON DELETE SET NULL;
ALTER TABLE students ADD COLUMN target_company_role_id BIGINT REFERENCES company_roles(id) ON DELETE SET NULL;

