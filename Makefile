test-backend:
	cd backend && uv run pytest

up:
	@trap "docker compose down" INT TERM EXIT; docker compose up
