SHELL := /bin/bash

test-backend: init-env
	cd backend && uv run pytest

up: init-env
	@trap "docker compose down; rm -f backend/.env" INT TERM EXIT; docker compose up

init-env:
	@if [ ! -f backend/.env ]; then \
	  cp backend/.env.example backend/.env; \
	  python3 -c "import secrets, pathlib; env_path=pathlib.Path('backend/.env'); key=secrets.token_hex(32); lines=env_path.read_text().splitlines(); new_lines=[('SECRET_KEY='+key if line.startswith('SECRET_KEY=') else line) for line in lines]; env_path.write_text('\n'.join(new_lines)+'\n'); print('Created backend/.env with generated SECRET_KEY')" \
	; else \
	  echo "backend/.env already exists; leaving it untouched"; \
	fi
