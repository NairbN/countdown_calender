# Roadmap (frontend)

Phase 1 — scaffold
- Workspace files, shared package stubs, Next.js app created, React Query wired with Auth provider.

Phase 2 — auth + events core
- Screens: login/register, protected layout, events list/detail/create/edit.
- Use backend schemas (`title`, `description`, `start_at`, `duration_minutes`, `all_day`).
- Store JWT in memory + localStorage; redirect to login on 401. Shared hooks (`useLogin`, `useRegister`, `useCurrentUser`, `useEvents`, `useCreate/Update/DeleteEvent`) in `packages/state`.
- Countdown: compute from `start_at` + `duration_minutes`; treat all-day as date-only.

Phase 3 — polish
- Empty/error states, loading skeletons, form validation.
- Timezone display formatting.
- Tests: time math unit tests; MSW integration for auth/events hooks; later Playwright e2e. Run `pnpm test` (one-shot) or `pnpm test:watch` for watch mode.

Phase 4 — mobile prep
- Add `apps/mobile` (Expo) reusing `packages/*`.
- Swap storage adapter to SecureStore; map navigation to mobile stack/tabs.
- Consider push notifications/offline as needed.
