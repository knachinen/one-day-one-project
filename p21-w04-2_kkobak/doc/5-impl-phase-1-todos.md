# Phase 1: Core Interaction Prototype Implementation Plan

This plan outlines the steps to develop the core features of the Kkobak prototype, focusing on habit creation, daily tracking, and interactive feedback.

## 1. Project Setup and Initial Configuration

*   [ ] Initialize a new Next.js project using `create-next-app`.
*   [ ] Install and configure Tailwind CSS for styling.
*   [ ] Install `zustand` for state management and `framer-motion` for animations.
*   [ ] Set up project structure: create directories for components, stores, and hooks.
*   [ ] Configure ESLint and Prettier for code quality.

## 2. Data Persistence and State Management (Sub-step 1.1)

*   [ ] Define the `Habit` and `HabitRecord` types based on the data model.
*   [ ] Create a Zustand store for managing habits and records.
*   [ ] Implement a middleware for the Zustand store to persist data to LocalStorage.
*   [ ] Implement logic to load data from LocalStorage when the app initializes.

## 3. Habit Creation (Sub-step 1.1)

*   [ ] Create the "New Habit" page/modal UI based on the design specification (`doc/3-design-2__gemini.md`).
*   [ ] Implement the form for adding a new habit, including name, icon, and repetition days.
*   [ ] Add validation for the habit name (required, max 30 characters).
*   [ ] Connect the form to the Zustand store to add new habits.

## 4. Main Dashboard UI (Sub-step 1.2)

*   [ ] Create the main dashboard layout based on the design specification (`doc/3-design-1__gemini.md`).
*   [ ] Implement the header component with the logo and profile icon.
*   [ ] Create the "Kkobagi" character component area.
*   [ ] Implement the "Today's Habits" section to display the list of habits for the current day.
*   [ ] Create the habit card component, including the habit name, icon, and check button.

## 5. Daily Check-in Functionality (Sub-step 1.2 & 1.3)

*   [ ] Implement the logic for the daily check-in button.
*   [ ] On check-in, create a `HabitRecord` and update the state.
*   [ ] Implement the ability to un-check a habit for the current day.
*   [ ] Add animations for the check-in action using Framer Motion (spring effect).
*   [ ] Add a sound effect on check-in (optional, with a toggle).
*   [ ] Change the visual state of a habit card when it's completed.

## 6. Kkobagi Character Interaction (Sub-step 1.3 & 1.4)

*   [ ] Calculate the daily habit completion percentage.
*   [ ] Implement the logic to change the Kkobagi character's animation/expression based on the completion percentage.
*   [ ] Implement the logic to display different encouragement messages based on the completion percentage.
*   [ ] Add a "cheer" or "jump" animation for the Kkobagi character upon habit completion.

## 7. Streak Calculation (Sub-step 1.4)

*   [ ] Implement the logic to calculate the current streak for each habit.
*   [ ] Display the current streak on the habit card.
*   [ ] Ensure the streak resets if a day is missed.

## 8. Final Touches and Review

*   [ ] Review the implementation against the Phase 1 requirements.
*   [ ] Test the application in different browsers (Chrome, Safari, Firefox).
*   [ ] Ensure the application is responsive and works well on mobile devices.
