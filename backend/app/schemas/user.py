from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    # Data required to create/register a user.
    email: EmailStr
    password: str


class UserRead(BaseModel):
    # Data exposed to clients.
    id: uuid.UUID
    email: EmailStr
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
