# UI/UX plan (web)

Key pages
- Auth: login/register in a compact Card; inline validation, password toggle, links to switch auth flow.
- Dashboard: hero with next event + live countdown, list/grid of upcoming events with filters (All/Upcoming/Past/All-day/Timed) and search, empty state with primary CTA.
- Event detail: rich Card with countdown, local time + UTC offset, description, all-day badge, Edit/Delete actions.
- Create/Edit event: form with title, description, start datetime, duration, all-day toggle; hide time/duration when all-day; inline errors; Save/Cancel.

Layout patterns
- Use `PageShell` for page framing (title/subtitle/actions, max width, padded content).
- Group content in `Card` and `Surface`; stack sections with consistent spacing (tokens.spacing).
- Top bar with app title + “New Event” CTA + user/logout entry; optional sidebar later.
- Responsive: single column on mobile, stacked filters/actions; cards full-width.

Shared UI primitives (current)
- Layout: `PageShell`, `Card`, `Surface`, `Stack`.
- Typography: `Heading`, `Text`.
- Forms: `FormField`, `Input` (error/disabled), `Button` (variants: primary/secondary/ghost/danger; sizes sm/md/lg).
- Tokens: colors (primary/danger/surface), spacing, radius, shadow.

States & feedback
- Loading: skeletons for list/detail (to add), disabled buttons during mutations.
- Empty: friendly message + CTA on dashboard and per-filter.
- Errors: inline form errors via `FormField.error`; banner/toast for global errors (to add).
- Success: lightweight toast/inline confirmation (to add).

Time handling
- Show local time with UTC offset; countdown with both relative (“3d 4h left”) and exact timestamps.
- All-day events: hide time input, set duration conventionally; display as date-only.

Accessibility
- Labels tied to inputs via `FormField`/`htmlFor`, visible focus states, keyboard-friendly buttons, clear error text.

Candidate shared components to add
- `Badge/Tag` for statuses (all-day, upcoming, past).
- `Chip` for filters/pills; `Tabs` or segmented control for All/Upcoming/Past.
- `Skeleton` blocks for loading states.
- `Toast`/`Banner` for success/error messaging.
- `Modal/Dialog` for confirm delete and other confirmations.
- `DateTimeField` wrapper to standardize datetime input UX.
