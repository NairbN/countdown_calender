# 📗 Scenario-Based Testing

This file uses behavior-driven development (BDD) style scenarios:
**Given / When / Then**

---

## 🧭 Milestone 1 — Navigation

### Scenario: Navigate to New Event Screen

Given I am on the home screen  
When I tap “Add Event”  
Then I should be navigated to the new event screen

---

## 🗂 Milestone 2 — Event List

### Scenario: Empty State

Given I have no events  
When I open the home screen  
Then I should see “No events yet”  
And I should see a button to add a new event

### Scenario: Display Events

Given I have multiple events  
When I open the home screen  
Then I should see each event displayed as a card  
And they should be sorted by date

---

## 📝 Milestone 3 — Create Event

### Scenario: Successful Creation

Given I fill in the title and date  
When I tap “Save”  
Then I should return to the home screen  
And my new event should be visible

### Scenario: Validation Error

Given I leave the title empty  
When I tap “Save”  
Then I should see an error  
And the event should not be created

---

## ⏳ Milestone 4 — Countdown

### Scenario: Correct Time Remaining

Given today is June 1, 10:00  
And the event is June 3, 10:00  
When I open the app  
Then I should see “2 days left”

### Scenario: Live Update

Given an event occurs in 2 minutes  
When the app stays open  
Then the countdown should decrease over time

---

## 💾 Milestone 5 — Persistence

### Scenario: Persistence Across Sessions

Given I create events  
When I close and reopen the app  
Then all events should still be there

### Scenario: First Launch

Given I have no stored data  
When I launch the app  
Then an empty list should appear without errors

---

## ✏️ Milestone 6 — Edit/Delete

### Scenario: Edit Event

Given an event exists  
When I change its date or title  
Then the updated event should appear correctly on the home screen

### Scenario: Delete Event

Given multiple events exist  
When I delete one  
Then only the remaining events should appear
