#!/bin/sh
set -e

# Ensure project venv is on PATH for alembic/uvicorn
export PATH="/app/.venv/bin:${PATH}"

# Wait for Postgres to be reachable
until nc -z db 5432; do
  echo "Waiting for database at db:5432..."
  sleep 1
done

# Run migrations
uv run python -m alembic upgrade head

# Start the app
exec uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
