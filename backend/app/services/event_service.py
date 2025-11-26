from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.event import Event


async def list_events_for_user(db: AsyncSession, user_id: UUID) -> list[Event]:
    result = await db.execute(
        select(Event).where(Event.user_id == user_id).order_by(Event.start_at)
    )
    return list(result.scalars().all())


async def create_event(
    db: AsyncSession,
    user_id: UUID,
    title: str,
    description: str | None,
    start_at,
    duration_minutes: int,
    all_day: bool,
) -> Event:
    event = Event(
        user_id=user_id,
        title=title,
        description=description,
        start_at=start_at,
        duration_minutes=duration_minutes,
        all_day=all_day,
    )
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event


async def get_event_for_user(db: AsyncSession, event_id: UUID, user_id: UUID) -> Event:
    result = await db.execute(
        select(Event).where(Event.id == event_id, Event.user_id == user_id)
    )
    event = result.scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return event


async def update_event(
    db: AsyncSession,
    event: Event,
    *,
    title: str | None = None,
    description: str | None = None,
    start_at=None,
    duration_minutes: int | None = None,
    all_day: bool | None = None,
) -> Event:
    if title is not None:
        event.title = title
    if description is not None:
        event.description = description
    if start_at is not None:
        event.start_at = start_at
    if duration_minutes is not None:
        event.duration_minutes = duration_minutes
    if all_day is not None:
        event.all_day = all_day

    await db.commit()
    await db.refresh(event)
    return event


async def delete_event(db: AsyncSession, event: Event) -> None:
    await db.delete(event)
    await db.commit()
