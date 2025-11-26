FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PATH="/root/.local/bin:/root/.cargo/bin:${PATH}"

# System deps for building wheels and installing uv
RUN apt-get update && apt-get install -y curl build-essential netcat-openbsd && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies via uv using the lockfile for reproducibility
COPY pyproject.toml uv.lock ./
RUN curl -LsSf https://astral.sh/uv/install.sh | sh \
    && uv sync --frozen --no-dev --python python3.11

# Copy application code and Alembic migrations
COPY app ./app
COPY alembic ./alembic
COPY alembic.ini .
COPY entrypoint.sh .
RUN chmod +x /app/entrypoint.sh

# Default command runs via entrypoint (alembic then uvicorn)
ENTRYPOINT ["/app/entrypoint.sh"]
