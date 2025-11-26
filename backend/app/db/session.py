from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import settings

# Create one async engine for the whole app; it manages connections to Postgres.
engine = create_async_engine(
    settings.database_url,
    echo=False,  # flip to True to see SQL in logs during debugging
    future=True,
)

# Factory that gives out AsyncSession instances; shared across requests.
AsyncSessionLocal = async_sessionmaker(
    engine,
    expire_on_commit=False,  # keep attributes accessible after commit
)


async def get_db() -> AsyncSession:
    """
    FastAPI dependency that provides a session and cleans it up after the request.
    Usage: depends=get_db in routes/services.
    """
    async with AsyncSessionLocal() as session:
        yield session
