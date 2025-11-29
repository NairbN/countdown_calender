# Web App Development Guide (Next.js)

This covers how the Next.js web app is structured, how to run it, and how to use mock vs live backend modes. It assumes minimal frontend experience.

## Overview
- Location: `frontend/apps/web`
- Tech: Next.js (App Router), TypeScript, Tailwind CSS
- Shared code: imports UI/logic from `frontend/packages/*` (`@countdown-calender/ui`, `@countdown-calender/state`, `@countdown-calender/api-client`, `@countdown-calender/domain`).
- Pages:
  - `/` → redirects to `/events`
  - `/login`, `/register` (auth)
  - `/events` (list), `/events/new`, `/events/[id]` (detail), `/events/[id]/edit`
  - `/ui-playground` (shows shared UI components)

## Running the web app
From repo root:
1) Install deps (once): `cd frontend && pnpm install`
2) Dev server: `pnpm --dir apps/web dev`
3) Open: http://localhost:3000
   - UI playground: http://localhost:3000/ui-playground
   - Events list: http://localhost:3000/events

## Mock vs live backend
- Env flag in `frontend/apps/web/.env.local`:
  - `NEXT_PUBLIC_USE_MOCK=true` → mock mode (no backend required; data stored in `localStorage`)
  - `NEXT_PUBLIC_USE_MOCK=false` or unset → live mode (calls FastAPI at `NEXT_PUBLIC_API_BASE`, set in the same env file)
- Badge in bottom-right shows “Mock mode” or “Live mode”.
- Mock mode: supports auth (returns a mock token/user) and events CRUD locally.

## Shared components/hooks
- UI components: `@countdown-calender/ui` (buttons, cards, forms, layout shells, etc.).
- Data/hooks: `@countdown-calender/state` (auth/events React Query hooks).
- API client: `@countdown-calender/api-client` (typed HTTP calls) used under the hooks.

## File structure (web)
- `src/app/layout.tsx` — global layout, fonts, providers, mock badge
- `src/app/page.tsx` — redirects to `/events`
- `src/app/(auth)/login|register` — auth pages
- `src/app/events/*` — list/detail/create/edit pages and shared `EventForm`
- `src/app/ui-playground` — showcase for UI components
- `src/mocks/mockApi.ts` — fetch interceptor for mock mode

## If you’re new to frontend
- Start the dev server (`pnpm --dir apps/web dev`) and open `/ui-playground` to see components.
- Use mock mode to test flows without running the backend.
- When ready for live data, set `NEXT_PUBLIC_API_BASE` (e.g., `http://localhost:8000`) and `NEXT_PUBLIC_USE_MOCK=false`.
- The shared hooks handle data fetching and state; pages mostly compose UI components and call those hooks.
