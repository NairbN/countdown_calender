# 📕 Roadmap (v1 → v3)

This document outlines future development beyond the core MVP.

---

# 🚀 Version 1.0 — Core Experience

✔ Navigation  
✔ Create events  
✔ View a list of events  
✔ Countdown displays  
✔ AsyncStorage persistence  
✔ Edit & delete  
✔ Basic UI/UX polish

---

# 🌟 Version 1.5 — Quality of Life

- Event categories (e.g., Work, School, Personal)
- Optional event notes field
- Improved date/time picker UI
- Color coding for urgency (e.g., red = soon)
- Light/Dark theme support

---

# 🔔 Version 2.0 — Notifications

- Local push notifications:
  - “Event is in 1 day”
  - “Event starts in 1 hour”
- Configurable reminders per event
- Automatic dismissal of reminders after event end

---

# 📆 Version 2.5 — Calendar & Import

- Import birthday contacts
- Import from Google Calendar or Apple Calendar
- Sync upcoming events automatically

---

# 🧩 Version 3.0 — Advanced Features

- Recurring events (weekly/monthly/yearly)
- Widgets / home screen countdown widget
- Cloud sync for multi-device support
- Profile & settings screen
- Animated transitions for list changes

---

# 🛠 Architecture Goals (Long-Term)

- Reduce logic inside screens
- Move toward custom hooks + reusable components
- Add unit tests for:
  - Date/time utilities
  - Storage logic
  - UI components (EventCard/EventForm)

---

# 🧭 Guiding Principles

- Keep the app lightweight
- Avoid unnecessary dependencies
- Prioritize clarity over complexity
- Build iteratively, test manually, then automate
