# Countdown Calendar

This project has a FastAPI backend with Postgres. For backend setup, development, and API details, start with:

- [Backend Dev Guide](backend/docs/README.md)
- [Setup instructions](backend/docs/setup.md)
- [API reference](backend/docs/api.md)

## Prereqs
- Docker and Docker Compose
- Python 3.11+ and `uv` (if running backend locally)

## Root scripts
- `make up` — start Docker Compose (backend + db) and auto-stop on Ctrl+C.
- `make test-backend` — run backend tests (needs Postgres running or just make sure you ran make up without terminating it).

## Ports
- DB: host port 5432. Ensure no other Postgres is bound (stop old containers/services or change the mapping in `docker-compose.yml`).
- Backend: host port 8000. Free it if another service is using it.

Frontend setup/docs: (add links when available).
