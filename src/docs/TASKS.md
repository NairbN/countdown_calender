# Countdown Calendar Tasks

Guidance derived from `src/docs/USER_STORIES.md`. Work through milestones sequentially to ensure each user-facing story is met.

## Milestone 1 – Navigation & Screens

1. Build Expo Router navigation between `Home` (`app/index.jsx`) and `New Event` (`app/new-event.jsx`) with titles that match the storyboard.
2. Implement a styled placeholder event list on the home screen so new users see the intended purpose immediately.

## Milestone 2 – Event List & Data Model

3. Extend the event model in `src/models/event.js` to include countdown metadata (normalized date objects, optional description) and ensure IDs are stable.
4. Update the `EventsContext` list rendering logic to sort events ascending by date and memoize derived lists to avoid re-renders.

## Milestone 3 – Create Event Flow

5. Replace the hard-coded event in `app/new-event.jsx` with a controlled form (TextInput, DateTimePicker) bound to context.
6. Add client-side validation + inline errors for title/date/time before calling `addEvent`.

## Milestone 4 – Countdown Logic

7. Write a reusable `useCountdown(eventDate)` hook that returns `{ days, hours, minutes, seconds }`, updating every second.
8. Display the countdown on each event card with clear formatting and degrade gracefully when the event is past due.

## Milestone 5 – Local Persistence

9. Integrate Expo's `SecureStore` or `AsyncStorage` to save events when they change and hydrate state on app launch.
10. Add hydration and persistence tests (e.g., Jest or React Native Testing Library) to verify serialization and ordering.

## Milestone 6 – Edit/Delete

11. Implement swipe actions or contextual menus on the event list for edit/delete; confirm deletes and reuse the form for editing.
12. Ensure edits update the countdown hook inputs and that the list re-sorts automatically after changes.

## Milestone 7 – Polish & UX

13. Improve layout spacing, typography, and theming to match the product vision; handle light/dark mode.
14. Provide meaningful empty states, loading indicators during persistence, and accessibility labels for controls.
