from app.db.base_class import Base

# Import models so Alembic can autodiscover them via Base.metadata
from app.models.user import User  # noqa: F401,E402
from app.models.event import Event  # noqa: F401,E402
