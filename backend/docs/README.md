# Backend Dev Guide (FastAPI + Postgres)

This is the entry point for anyone working on the backend. It gives the shape of the system and points you to deeper docs for setup and API details.

## What this backend is
- FastAPI app (`app/main.py`) with async SQLAlchemy models and Postgres.
- Auth: email/password, bcrypt hashing, JWT bearer tokens.
- Data: `User` and `Event` models (UUID ids, ownership enforced).
- Schema validation: Pydantic v2 schemas (`app/schemas`).
- Migrations: Alembic (`alembic/`) to keep DB schema in sync.
- Config: env-driven (`app/core/config.py`), CORS enabled via `CORS_ORIGINS`.
- Services: business logic in `app/services` keeps routes thin.

## Quick start (running)
- One-command up/down with cleanup: `./run_compose.sh` (root). Uses Docker Compose, runs migrations, and stops containers on Ctrl+C.
- Standard compose: `docker compose up --build` (rebuild only if Dockerfile/entrypoint/deps changed). Backend at http://localhost:8000.
- Local (no backend container): see [setup.md](setup.md) for exact steps.

## Developing features
- See [workflow.md](workflow.md) for the step-by-step.
- Models: `app/models/*`
- Schemas: `app/schemas/*`
- Services: `app/services/*` (put DB/business logic here)
- Routes: `app/api/routes/*` (keep thin; call services)
- Dependencies: `app/api/deps.py` (e.g., `get_db`, `get_current_user`)
- Migrations: `alembic revision --autogenerate -m "msg"` then `alembic upgrade head`
- Add/update tests for new behavior (integration in `backend/tests`, service/unit as needed).

## Testing
- Commands: `make test-backend` (root) or `cd backend && uv run pytest`.
- Needs Postgres at `TEST_DATABASE_URL` (defaults to `postgresql+asyncpg://postgres:postgres@localhost:5432/countdown_db`). Tests skip if DB is down.

## Deeper docs
- Setup & run instructions: [setup.md](setup.md)
- API reference (endpoints & payloads): [api.md](api.md)
- Dev workflow & what to touch: [workflow.md](workflow.md)
