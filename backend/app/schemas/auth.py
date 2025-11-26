from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: uuid.UUID
    exp: datetime


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
