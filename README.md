# CareerPilot Planning Package

This package contains the linear planning/specification baseline for CareerPilot,
an AI-powered placement preparation platform.

## Execution order

1. Product specification
2. Backend inventory and compatibility baseline
3. System architecture
4. API contract and OpenAPI
5. Database and PostgreSQL RLS
6. Authentication and authorization
7. Frontend architecture
8. Detailed UI/UX
9. Component system
10. Frontend tooling/dependencies
11. Domain specifications
12. AI architecture and agents
13. Company/skill data provenance
14. File storage and asynchronous processing
15. Observability and audit
16. Testing strategy
17. Deployment and CI/CD
18. Privacy and data governance
19. Integrations
20. Reporting and analytics
21. Final security hardening
22. Authorization model reconciliation
23. Final implementation readiness gate

## Operating rule

Inspect -> Understand -> Plan -> Implement -> Validate -> Document

Implementation must not begin for a gate until its source-of-truth
specification and ExecPlan are approved/consistent.

The existing backend is preserved unless a documented migration is required.
No dependency is introduced without a compatibility/support review.

## Development Quick Start

Run both Spring Boot backend (port 8080) and Vite React frontend (port 5173) concurrently from the project root:

```bash
# 1. Start PostgreSQL
pnpm run db:up

# 2. Concurrently run Backend & Frontend
pnpm run dev
# or alternatively via the standalone script:
./scripts/dev.sh
```

Individual service commands:
- `pnpm run dev:frontend` — Run Vite dev server only
- `pnpm run dev:backend` — Run Spring Boot backend only
- `pnpm run build` — Build backend jar and frontend bundle
- `pnpm run db:down` — Stop PostgreSQL container
