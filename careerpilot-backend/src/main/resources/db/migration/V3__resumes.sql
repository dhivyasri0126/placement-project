-- CareerPilot Flyway Migration V3: Resumes and Resume AI Analysis Tables

-- 1. Resumes Table
CREATE TABLE resumes (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    object_key VARCHAR(255) NOT NULL UNIQUE,
    original_filename VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    checksum VARCHAR(64),
    extracted_text TEXT,
    extracted_text_status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING, COMPLETED, FAILED
    analysis_status VARCHAR(50) NOT NULL DEFAULT 'NOT_ANALYZED', -- NOT_ANALYZED, IN_PROGRESS, COMPLETED, FAILED
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resumes_student ON resumes(student_id);

-- 2. Resume AI Analyses Table
CREATE TABLE resume_analyses (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL UNIQUE REFERENCES resumes(id) ON DELETE CASCADE,
    overall_score NUMERIC(5, 2),
    skills_detected TEXT, -- Comma-separated or JSON list of detected skills
    missing_critical_skills TEXT, -- Missing target skills
    summary TEXT,
    feedback TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resume_analyses_resume ON resume_analyses(resume_id);
