from __future__ import annotations

from datetime import datetime, timedelta, timezone
from uuid import uuid4

import pytest

pytestmark = pytest.mark.asyncio


async def register_and_login(client):
    """Helper to register a user and return auth headers."""
    email = f"user-{uuid4().hex[:8]}@example.com"
    password = "testpassword"

    resp = await client.post(
        "/auth/register", json={"email": email, "password": password}
    )
    assert resp.status_code == 201, resp.text

    resp = await client.post(
        "/auth/login", json={"email": email, "password": password}
    )
    assert resp.status_code == 200, resp.text
    token = resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    return headers


async def test_auth_me(client):
    """Happy path: register/login then fetch /auth/me."""
    headers = await register_and_login(client)
    resp = await client.get("/auth/me", headers=headers)
    assert resp.status_code == 200
    body = resp.json()
    assert "email" in body and "id" in body


async def test_event_crud(client):
    """Full CRUD flow for events with auth header."""
    headers = await register_and_login(client)
    start_at = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()

    # Create
    create_payload = {
        "title": "Launch",
        "description": "v1 release",
        "start_at": start_at,
        "duration_minutes": 90,
        "all_day": False,
    }
    resp = await client.post("/events/", json=create_payload, headers=headers)
    assert resp.status_code == 201, resp.text
    event = resp.json()
    event_id = event["id"]
    assert event["title"] == create_payload["title"]

    # List
    resp = await client.get("/events/", headers=headers)
    assert resp.status_code == 200
    events = resp.json()
    assert len(events) == 1

    # Get
    resp = await client.get(f"/events/{event_id}", headers=headers)
    assert resp.status_code == 200
    assert resp.json()["id"] == event_id

    # Update
    resp = await client.patch(
        f"/events/{event_id}",
        json={"title": "Updated Launch"},
        headers=headers,
    )
    assert resp.status_code == 200
    assert resp.json()["title"] == "Updated Launch"

    # Delete
    resp = await client.delete(f"/events/{event_id}", headers=headers)
    assert resp.status_code == 204

    # Verify empty
    resp = await client.get("/events/", headers=headers)
    assert resp.status_code == 200
    assert resp.json() == []
