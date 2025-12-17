# Phase 3: Retrospection and Data Insights Implementation Plan

This plan outlines the steps to implement advanced analytics, notifications, and data management features for the Kkobak prototype.

## 1. Habit-specific Statistics and Trend Analysis (Sub-step 3.1)

*   [x] Create a dedicated page (`/habit/[id]`) to display detailed statistics for a single habit.
*   [x] On this page, display summary metrics like total successful checks, average completion rate, and longest streak.
*   [x] Implement a trend line chart using `recharts` to visualize completion rates for the last 7 and 30 days.
*   [x] Create utility functions to process `HabitRecord` data into a suitable JSON format for the charts.

## 2. Kkobagi's Weekly/Monthly Retrospection Message (Sub-step 3.2)

*   [x] Implement a logic to analyze the overall weekly completion rate.
*   [x] Based on the completion rate, generate a personalized retrospective message from Kkobagi (e.g., "Excellent week!", "Don't worry, start again!").
*   [x] Display this message on the main dashboard or a dedicated retrospective section.

## 3. Browser Notifications and Snooze Functionality (Sub-step 3.3)

*   [x] Implement logic to request browser notification permission from the user.
*   [ ] Schedule notifications based on `notification_time` set for habits (using `setTimeout` for browser-only functionality).
*   [ ] Add a "Snooze" option to notifications (e.g., 10 minutes later).
*   [ ] Implement a toggle in habit creation/edit to enable/disable notifications.

## 4. Data Export and Management (Sub-step 3.4)

*   [ ] Install `papaparse` library for CSV conversion.
*   [ ] Create an "Export Data" button on a suitable page (e.g., History or settings).
*   [ ] Implement logic to convert all `HabitRecord` and `Streak` data from LocalStorage to CSV format.
*   [ ] Implement a download trigger for the generated CSV file (e.g., `habit_records_YYYYMMDD.csv`).
*   [ ] Create a "Reset All Data" button with a final confirmation dialog to clear all LocalStorage data related to the app.
