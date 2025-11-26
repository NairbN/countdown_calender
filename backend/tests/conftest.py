from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.exc import OperationalError

# Ensure the backend package is importable when running tests from the backend dir.
ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.db.base import Base
from app.db.session import get_db
from app.main import app


TEST_DATABASE_URL = os.getenv(
    "TEST_DATABASE_URL",
    "postgresql+asyncpg://postgres:postgres@localhost:5432/countdown_db",
)


@pytest_asyncio.fixture
async def db_session_override():
    """Isolated DB/session per test to avoid loop conflicts and cross-test bleed."""
    engine = create_async_engine(TEST_DATABASE_URL, future=True)
    SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

    async def _get_db():
        async with SessionLocal() as session:
            yield session

    # Fresh schema for this test run. If DB is unreachable, skip tests with a helpful message.
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)
    except (OperationalError, OSError) as exc:  # connection refused / db down
        await engine.dispose()
        pytest.skip(f"Test database not reachable at {TEST_DATABASE_URL}: {exc}")

    app.dependency_overrides[get_db] = _get_db
    try:
        yield
    finally:
        app.dependency_overrides.clear()
        await engine.dispose()


@pytest_asyncio.fixture
async def client(db_session_override):
    """HTTP client against the ASGI app (no network needed)."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as c:
        yield c
