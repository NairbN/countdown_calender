# Setup

Prereqs: Node 18+, pnpm, backend at `http://localhost:8000` (CORS allows dev ports).

1) Install deps after app creation:
   ```bash
   cd frontend
   pnpm install
   ```
2) Create the Next.js app (if not already):
   ```bash
   cd frontend
   pnpm create next-app apps/web -- --ts --eslint --src-dir --app
   ```
3) Path aliases (`apps/web/tsconfig.json`):
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@countdown-calender/api-client/*": ["../../packages/api-client/*"],
         "@countdown-calender/state/*": ["../../packages/state/*"],
         "@countdown-calender/domain/*": ["../../packages/domain/*"],
         "@countdown-calender/ui/*": ["../../packages/ui/*"]
       }
     }
   }
   ```
4) Env: create `apps/web/.env.local`
   ```
   NEXT_PUBLIC_API_BASE=http://localhost:8000
   ```
5) Dev server: `pnpm --dir apps/web dev`
6) Providers: `apps/web/src/app/layout.tsx` wraps children with `Providers` (`AppStateProvider` → Auth + React Query), so hooks are ready to use in pages.
7) Tests: run package tests with `pnpm test` from `frontend/` (Vitest, jsdom, jest-dom matchers; exits automatically). Use `pnpm test:watch` to stay in watch mode.
8) UI primitives: import shared components from `@countdown-calender/ui` (e.g., `PageShell`, `Card`, `Button`, `Input`, `Surface`, `Text`, `Heading`, `Stack`, `FormField`, `Badge`, `Chip`, `SegmentedControl`, `Skeleton`, `Spinner`, `Banner`, `Modal`, `EmptyState`, `Toolbar`, `Grid`) and `tokens` when building pages.

Backend reference: `../backend/docs/api.md`.
