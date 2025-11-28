# Frontend structure

Monorepo inside `frontend/`:

- `apps/web` — Next.js app (App Router). Web routing/layout/SEO.
- `apps/mobile` — Expo app (later). Shares logic, not web-only UI.
- `packages/api-client` — HTTP client for FastAPI (auth/events), typed responses (zod), error handling.
- `packages/state` — React Query setup/hooks (auth/events) built on the API client; no UI.
- `packages/domain` — Pure countdown/time utilities (timezone-safe formatting, all-day handling).
- `packages/ui` — Optional shared UI primitives or design tokens (start web-only; expand to RN).

Rules:
- Keep platform specifics in `apps/*`. Shared packages avoid DOM/native APIs.
- Add path aliases in app tsconfigs to import `@countdown-calender/*`.
- Keep providers (Auth + Query) at app-shell level (`apps/web/src/app/layout.tsx` via `providers.tsx`) so all pages share cache/auth state.
