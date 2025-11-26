from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class EventBase(BaseModel):
    # Core event fields shared across create/read/update.
    title: str
    description: str | None = None
    start_at: datetime
    duration_minutes: int = Field(ge=0)
    all_day: bool = False


class EventCreate(EventBase):
    """Payload for creating an event."""


class EventUpdate(BaseModel):
    # All fields optional; apply only provided updates.
    title: str | None = None
    description: str | None = None
    start_at: datetime | None = None
    duration_minutes: int | None = Field(default=None, ge=0)
    all_day: bool | None = None


class EventRead(EventBase):
    # Data returned to clients.
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
