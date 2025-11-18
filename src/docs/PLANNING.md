# 📘 Planning Overview

## 🎯 Project Goal

Build a simple, clean, mobile-first **Countdown Calendar App** using React Native + Expo.  
The app lets users create events (birthdays, deadlines, trips, goals) and view **real-time countdowns** until each event.

The goal is to:

- Learn React Native fundamentals
- Practice mobile UI/UX patterns
- Build a project using real software engineering workflows (GitHub Projects, issues, documentation)
- Create a portfolio-ready mobile app

---

## 👤 Personas

### 1. Busy Student Sam

- Tracks homework deadlines, midterms, study milestones.
- Needs quick visibility into "what’s coming up next?"
- Values a clean, minimal UI.

### 2. Everyday Planner Alex

- Tracks personal events: birthdays, appointments, trips.
- Wants low-effort event creation.
- Prefers reliability and persistent data.

---

## 🧩 Problem the App Solves

People have important events coming up, but:

- They forget dates
- They don’t have an easy way to track countdowns
- Calendar apps are too heavy for quick “time remaining” checks

This app solves the “how long until \_\_\_?” problem in the simplest possible way.

---

## 🛠️ Technical Overview

- **Frontend:** React Native + Expo
- **Navigation:** Expo Router
- **State Management:** React Context (lightweight)
- **Storage:** AsyncStorage
- **Date Logic:** Custom utilities + possibly date-fns/dayjs
- **Testing:** Scenario-based manual testing (v1), expanding to unit tests (v2)

---

## 🔄 Development Milestones

1. **Navigation & Screens**
2. **Event List & Data Model**
3. **Create Event Flow**
4. **Countdown Logic**
5. **Local Persistence**
6. **Edit/Delete Functionality**
7. **Polish & UX Improvements**

---

## 📐 Architecture Notes

- Keep logic modular (place utilities inside `lib/`)
- Keep UI reusable (`components/`)
- Keep screens simple by pushing logic into hooks & context providers
- Avoid over-engineering v1 (no Redux, no backend, no heavy libraries)
