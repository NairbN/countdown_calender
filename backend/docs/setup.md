# Backend Setup Guide (Dev)

Quick steps to get the backend running for local development.

## Prereqs
- Docker + Docker Compose (for Postgres and optional backend container)
- Python 3.11+ and `uv` (if running backend locally)

## Environment
1) Copy env template:
   ```bash
   cd backend
   cp .env.example .env
   ```
2) Set values:
   - `DATABASE_URL` → for Docker Compose use `postgresql+asyncpg://postgres:postgres@db:5432/countdown_db`; for local Postgres use `@localhost:5432`.
   - `SECRET_KEY` → set a non-default value.
   - `CORS_ORIGINS` → comma-separated frontend origins (e.g., `http://localhost:3000,http://localhost:5173`).

## One-command up/down with Docker Compose
- From project root: `./run_compose.sh` (starts `docker compose up` and runs `docker compose down` automatically on Ctrl+C/exit).
- Standard start: `docker compose up --build` (rebuild only if Dockerfile/entrypoint/deps changed).

## Run backend locally (using Docker DB)
```bash
cd backend
uv venv
source .venv/bin/activate
uv sync
alembic upgrade head
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Ensure `DATABASE_URL` points to the running Postgres (e.g., `@localhost:5432` if you started the compose db).

## Migrations
- New migration: `alembic revision --autogenerate -m "message"`
- Apply: `alembic upgrade head`

## Tests
```bash
make test-backend
```
or
```bash
cd backend
uv run pytest  # or .venv/bin/pytest
```
Default test DB: `postgresql+asyncpg://postgres:postgres@localhost:5432/countdown_db` (override with `TEST_DATABASE_URL`). Make sure Postgres is running and reachable; tests will skip if the DB is down.

## Run/stop stack with cleanup
- From project root: `./run_compose.sh` (starts `docker compose up` and runs `docker compose down` automatically on Ctrl+C/exit).

## API quick smoke
- Health: `GET /health`
- Register: `POST /auth/register` with `{"email":"user@example.com","password":"secret"}`
- Login: `POST /auth/login` → get `access_token`
- Events (with `Authorization: Bearer <token>`):
  - `POST /events/` with event payload
  - `GET /events/` to list

## Where things live
- Routes: `app/api/routes/*` (`auth`, `events`)
- Dependencies: `app/api/deps.py` (JWT/current user)
- Models: `app/models/*`
- Schemas: `app/schemas/*`
- Settings: `app/core/config.py`
- Logging/security: `app/core/logging.py`, `app/core/security.py`
- DB/session: `app/db/session.py`, `app/db/base_class.py`
- Docs: `backend/docs/api.md` (endpoint reference), this file for setup
