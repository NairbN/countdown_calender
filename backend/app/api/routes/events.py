from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.event import EventCreate, EventRead, EventUpdate
from app.services import event_service

router = APIRouter()


@router.get("/", response_model=list[EventRead])
async def list_events(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[Event]:
    return await event_service.list_events_for_user(db, current_user.id)


@router.post("/", response_model=EventRead, status_code=status.HTTP_201_CREATED)
async def create_event(
    event_in: EventCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Event:
    return await event_service.create_event(
        db=db,
        user_id=current_user.id,
        title=event_in.title,
        description=event_in.description,
        start_at=event_in.start_at,
        duration_minutes=event_in.duration_minutes,
        all_day=event_in.all_day,
    )


@router.get("/{event_id}", response_model=EventRead)
async def get_event(
    event_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Event:
    return await event_service.get_event_for_user(db, event_id, current_user.id)


@router.patch("/{event_id}", response_model=EventRead)
async def update_event(
    event_id: UUID,
    event_in: EventUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Event:
    event = await event_service.get_event_for_user(db, event_id, current_user.id)
    return await event_service.update_event(
        db,
        event,
        title=event_in.title,
        description=event_in.description,
        start_at=event_in.start_at,
        duration_minutes=event_in.duration_minutes,
        all_day=event_in.all_day,
    )


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(
    event_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> None:
    event = await event_service.get_event_for_user(db, event_id, current_user.id)
    await event_service.delete_event(db, event)
    return None
