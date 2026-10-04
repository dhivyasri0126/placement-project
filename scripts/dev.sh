#!/usr/bin/env bash
# ==============================================================================
# CareerPilot - Local Development Environment Launcher
# Concurrently runs Spring Boot Backend and Vite React Frontend
# ==============================================================================

set -eo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="${ROOT_DIR}/careerpilot-backend"
FRONTEND_DIR="${ROOT_DIR}/careerpilot-frontend"

# Colors for terminal output
BOLD="\033[1m"
GREEN="\033[0;32m"
CYAN="\033[0;36m"
MAGENTA="\033[0;35m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
RESET="\033[0m"

log_info()  { echo -e "${BOLD}${CYAN}[CareerPilot]${RESET} $1"; }
log_succ()  { echo -e "${BOLD}${GREEN}[CareerPilot]${RESET} $1"; }
log_warn()  { echo -e "${BOLD}${YELLOW}[CareerPilot]${RESET} $1"; }
log_error() { echo -e "${BOLD}${RED}[CareerPilot]${RESET} $1"; }

# Process IDs
BACKEND_PID=""
FRONTEND_PID=""

# Cleanup handler on exit or Ctrl+C
cleanup() {
  echo ""
  log_info "Shutting down services..."

  if [ -n "${BACKEND_PID}" ] && kill -0 "${BACKEND_PID}" 2>/dev/null; then
    log_info "Stopping backend process (${BACKEND_PID})..."
    kill -TERM "${BACKEND_PID}" 2>/dev/null || true
  fi

  if [ -n "${FRONTEND_PID}" ] && kill -0 "${FRONTEND_PID}" 2>/dev/null; then
    log_info "Stopping frontend process (${FRONTEND_PID})..."
    kill -TERM "${FRONTEND_PID}" 2>/dev/null || true
  fi

  wait 2>/dev/null || true
  log_succ "All services stopped cleanly."
}

trap cleanup SIGINT SIGTERM EXIT

# 1. Environment & Preflight checks
if [ -f "${ROOT_DIR}/.env" ]; then
  log_info "Loading environment variables from .env..."
  set -a
  source "${ROOT_DIR}/.env"
  set +a
fi

log_info "Checking prerequisites..."

# Check mvnw permissions
if [ -f "${BACKEND_DIR}/mvnw" ] && [ ! -x "${BACKEND_DIR}/mvnw" ]; then
  chmod +x "${BACKEND_DIR}/mvnw"
fi

# Check Docker / PostgreSQL availability
if command -v docker >/dev/null 2>&1; then
  if docker info >/dev/null 2>&1; then
    log_info "Ensuring PostgreSQL container is up..."
    docker compose -f "${ROOT_DIR}/docker-compose.yml" up -d postgres >/dev/null 2>&1 || log_warn "Could not start postgres container automatically. Ensure your database is running on port 5432."
  else
    log_warn "Docker daemon is not running. Please ensure PostgreSQL is reachable at port 5432."
  fi
else
  log_warn "Docker command not found. Ensure PostgreSQL is running locally on port 5432."
fi

# 2. Check preferred runner
# If pnpm and concurrently are available, prefer pnpm run dev for unified colored logging
if [ "$1" != "--no-concurrently" ] && command -v pnpm >/dev/null 2>&1 && [ -f "${ROOT_DIR}/node_modules/.bin/concurrently" ]; then
  log_succ "Launching via pnpm and concurrently..."
  # Hand over execution to pnpm run dev
  trap - SIGINT SIGTERM EXIT
  exec pnpm --prefix "${ROOT_DIR}" run dev
fi

# 3. Fallback: native bash concurrent job execution
log_info "Starting backend on http://localhost:8080..."
(
  cd "${BACKEND_DIR}"
  ./mvnw spring-boot:run
) 2>&1 | sed -e "s/^/${MAGENTA}[backend]${RESET} /" &
BACKEND_PID=$!

log_info "Starting frontend on http://localhost:5173..."
(
  cd "${FRONTEND_DIR}"
  if command -v pnpm >/dev/null 2>&1; then
    pnpm run dev
  else
    npm run dev
  fi
) 2>&1 | sed -e "s/^/${CYAN}[frontend]${RESET} /" &
FRONTEND_PID=$!

log_succ "Both services launched in background jobs."
log_info "Press Ctrl+C to terminate both services simultaneously."

# Wait for both background jobs
wait
