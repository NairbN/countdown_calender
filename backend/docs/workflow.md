# Dev Workflow & What to Touch

Use this as a checklist when adding a backend feature.

## Per-feature workflow
- Plan data and API changes: what models/fields and endpoints are needed.
- Models: update/create SQLAlchemy models in `app/models/*`.
- Schemas: update/create Pydantic schemas in `app/schemas/*` for requests/responses.
- Services: put DB/business logic in `app/services/*` (keep routes thin).
- Routes: add/adjust routers in `app/api/routes/*`, calling services and using deps.
- Migrations: if models change, run `alembic revision --autogenerate -m "msg"` then `alembic upgrade head`.
- Tests: add/extend tests (required). Integration tests go in `backend/tests/` (HTTP flow); service/unit tests can live alongside services.

## Running & testing
- Run stack with cleanup: `./run_compose.sh` (from repo root) or `docker compose up` (rebuild only if needed).
- Apply migrations inside running backend: `docker compose exec backend alembic upgrade head`.
- Tests (with Postgres running): `make test-backend` (root) or `cd backend && uv run pytest`.

## When to rebuild Docker
Rebuild only if image-level inputs change:
- `backend/Dockerfile`
- `backend/entrypoint.sh`
- Dependencies: `backend/pyproject.toml` or `backend/uv.lock`
- Compose build settings

Commands:
```bash
# Rebuild (from repo root)
docker compose up --build

# No rebuild (code/config/env changes only)
docker compose up
```
Note: app code under `backend/app` is volume-mounted; code changes do not need a rebuild.

## Reminders
- Always add/update tests for new behavior.
- Keep routes thin; push logic into services.
- Keep migrations in sync with model changes.
- If you add new env vars, document them in `.env.example` and the docs.
