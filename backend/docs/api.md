# API Reference (Backend)

Base URL (dev): `http://localhost:8000`

Auth: Bearer JWT. Obtain via `POST /auth/login` (after `POST /auth/register`). Include header `Authorization: Bearer <token>` on protected routes.

## Health
- `GET /health` → `200 {"status":"ok"}`

## Auth
- `POST /auth/register`  
  Body: `{"email": "user@example.com", "password": "secret"}`  
  Returns: `UserRead` (`id`, `email`, `is_active`, `created_at`, `updated_at`)
- `POST /auth/login`  
  Body: `{"email": "user@example.com", "password": "secret"}`  
  Returns: `{"access_token": "...", "token_type": "bearer"}`
- `GET /auth/me` (auth required)  
  Returns current user (`UserRead`).

## Events (auth required)
Schema:
- `EventCreate`: `title: str`, `description: str|null`, `start_at: datetime (ISO, tz-aware)`, `duration_minutes: int >= 0`, `all_day: bool`
- `EventRead`: `EventCreate` + `id: uuid`, `user_id: uuid`, `created_at`, `updated_at`

Endpoints:
- `GET /events` → list `[EventRead]` for current user, ordered by `start_at`.
- `POST /events` → create event. Body: `EventCreate`. Returns `EventRead`.
- `GET /events/{event_id}` → single `EventRead`.
- `PATCH /events/{event_id}` → partial update. Body: any subset of create fields (all optional, `duration_minutes` still `>=0`). Returns `EventRead`.
- `DELETE /events/{event_id}` → `204` on success.

Auth header for events:
```
Authorization: Bearer <access_token>
```

## Frontend integration tips
- CORS: backend allows origins from `CORS_ORIGINS` (comma-separated env var). Default allows localhost dev ports (3000, 5173).
- Token storage: keep the bearer token from `/auth/login`, send it on all protected calls. Handle 401s by redirecting to login/refreshing token when you add refresh support.
- Datetimes: backend expects timezone-aware ISO strings (e.g., `"2025-01-01T12:00:00Z"`). Countdown math can be done client-side from `start_at` and `duration_minutes`.
- All-day: treat `all_day=true` as a date-only event; `duration_minutes` may be `0` or a full-day length depending on your UX choice.
- Errors: standard FastAPI errors (422 validation, 400/401/404 as defined). Surface messages to users where helpful.
- CORS: if calling from a separate frontend origin, set appropriate CORS config in the backend (add `CORSMiddleware`) to allow your dev/prod frontend URLs.

## Sample flow
1) Register: `POST /auth/register`
2) Login: `POST /auth/login` → get `access_token`
3) List events: `GET /events` with bearer token
4) Create: `POST /events` with body:
   ```json
   {
     "title": "Launch party",
     "description": "Celebrate v1",
     "start_at": "2025-02-15T18:00:00Z",
     "duration_minutes": 120,
     "all_day": false
   }
   ```
