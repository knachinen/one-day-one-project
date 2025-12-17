# Phase 2: Visual Growth and Enhanced Tracking Implementation Plan

This plan outlines the steps to implement the visual feedback and history tracking features for the Kkobak prototype.

## 1. Streak System and Visual Effects (Sub-step 2.1)

*   [x] Refine the streak calculation logic in `useStreak` hook for accuracy.
*   [x] Add a `Streak` entity to the `useHabitStore` to store the current and longest streaks.
*   [x] Implement a visual effect (e.g., a "sparkle" or "shake" animation) using Framer Motion on a fire icon next to the streak when it's updated.
*   [x] Update the `HabitCard` component to display the longest streak.

## 2. Habit Tree Visualization (Sub-step 2.2)

*   [x] Create a `HabitTree` component to display the habit tree graphic.
*   [x] Implement the growth algorithm based on daily completion percentage.
*   [x] Add an animation for leaves growing on the tree when a habit is checked.
*   [x] Implement a special "flowering" animation for 7-day completion streaks.

## 3. History Calendar and Record Editing (Sub-step 2.3)

*   [ ] Install and configure a calendar library (e.g., `react-day-picker`).
*   [ ] Create a `HistoryCalendar` component to display the habit records for a selected month.
*   [ ] Implement color-coded indicators on the calendar for success, failure, and no record.
*   [ ] Add functionality to click a date on the calendar to edit past records (up to 30 days).
*   [ ] Ensure that editing past records recalculates and updates the current streak and habit tree.

## 4. Weekly Donut Chart and Habit Editing (Sub-step 2.4)

*   [ ] Install and configure a chart library (e.g., `recharts`).
*   [ ] Create a `WeeklyChart` component to display the weekly completion rate as a donut chart.
*   [ ] Implement the logic to calculate the weekly completion rate.
*   [ ] Add a "delete" button to the `HabitCard` component with a confirmation dialog.
*   [ ] Implement the logic to "soft delete" a habit (mark as inactive) in the store.
*   [ ] Create a new page or modal for editing habit details (name, icon, etc.).
