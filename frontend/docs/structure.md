# Frontend structure

Monorepo inside `frontend/`:

- `apps/web` — Next.js app (App Router). Web routing/layout/SEO.
- `apps/mobile` — Expo app (later). Shares logic, not web-only UI.
- `packages/api-client` — HTTP client for FastAPI (auth/events), typed responses (zod), error handling.
- `packages/state` — React Query setup/hooks (auth/events) built on the API client; exports shared query keys.
- `packages/domain` — Pure countdown/time utilities (timezone-safe formatting, all-day handling).
- `packages/ui` — Optional shared UI primitives or design tokens (start web-only; expand to RN). Includes `PageShell`, `Card`, `Surface`, `Button`, `Input`, `Text`, `Heading`, `Stack`, `FormField`, `Badge`, `Chip`, `SegmentedControl`, `Skeleton`, `Spinner`, `Banner`, `Modal`, `EmptyState`, `Toolbar`, `Grid`, and `tokens`. Components live in PascalCase files.

Module layout notes:
- `api-client` separates `schemas.ts` and `client.ts`; `index.ts` is a barrel export.
- `domain` keeps utilities per file (e.g., `countdown.ts`) and re-exports via `index.ts`.
- `ui` splits primitives into their own files with a barrel `index.tsx` (PascalCase file names for components).
Tests:
- Vitest with jsdom and Testing Library for UI; package tests run via `pnpm test`.
Paths:
- Root `tsconfig.json` defines aliases for `@countdown-calender/*` pointing at `packages/*/src` (with and without trailing `/*`).
- Each package has its own `tsconfig.json` extending the root for editor tooling (paths/composite builds).

Rules:
- Keep platform specifics in `apps/*`. Shared packages avoid DOM/native APIs.
- Add path aliases in app tsconfigs to import `@countdown-calender/*`.
- Keep providers (Auth + Query) at app-shell level (`apps/web/src/app/layout.tsx` via `providers.tsx`) so all pages share cache/auth state.
- Package metadata (`main`, `types`) points to `src` for smooth imports.
