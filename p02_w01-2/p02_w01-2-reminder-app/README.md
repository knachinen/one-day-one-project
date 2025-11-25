# Reminder App (p02_w01-2)

A user-friendly reminder application built with React Native and Expo. This app allows users to create, manage, and receive notifications for their reminders.

## Features

- **Reminder Management (CRUD):**
  - Create, view, edit, and delete reminders.
  - Set title, optional content, date, and time for each reminder.
- **Notification Scheduling:**
  - Schedule single and recurring notifications (daily, weekly, monthly).
  - Snooze reminders for 5, 10, or 30 minutes.
- **User Interface:**
  - Intuitive list view of all reminders with filtering options (All, Pending, Completed).
  - Dedicated screen for completed reminders (archive).
  - Visual feedback for completed reminders.
  - Detail screen for editing and managing individual reminders.
- **Local Data Storage:**
  - Utilizes Expo SQLite for persistent local storage of reminders.

## Technical Stack

- **Platform:** Android (primarily targeted)
- **Framework:** React Native
- **Development Environment:** Expo (Managed Workflow)
- **Navigation:** Expo Router (built on React Navigation)
- **Database:** Expo SQLite
- **Notifications:** Expo Notifications
- **Date/Time Picker:** `@react-native-community/datetimepicker`
- **Repeat Pattern Picker:** `@react-native-picker/picker`
- **UI Animations:** `react-native-reanimated`

## Setup and Running the Project

### Prerequisites

Make sure you have Node.js and npm/yarn installed.
You also need to have Expo CLI installed globally:
`npm install -g expo-cli` (or `yarn global add expo-cli`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd p02_w01-2/p02_w01-2-reminder-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Start the Expo development server:**
    ```bash
    npx expo start
    # or
    yarn start
    ```
    This will open a new tab in your browser with Expo Dev Tools. You can then:
    -   Run on an Android emulator/device.
    -   Run on an iOS simulator/device (requires macOS).
    -   Run in a web browser.

### Project Structure

```
p02_w01-2-reminder-app/
├── app/                  # Expo Router based routes (e.g., index.tsx, create.tsx, detail/[id].tsx)
├── src/
│   ├── data/             # Data models and interfaces
│   │   └── ReminderModel.ts
│   ├── services/         # Database and Notification service logic
│   │   ├── DatabaseService.ts
│   │   └── NotificationService.ts
│   └── screens/          # Main screen components
│       ├── CreateReminderScreen.tsx
│       ├── CompletedRemindersScreen.tsx
│       └── ReminderListScreen.tsx
├── assets/               # Static assets (images, fonts, etc.)
├── .gitignore
├── app.json              # Expo application configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project README
```

## How to Use

1.  **Create a Reminder:** Tap the "Create New Reminder" button on the main screen. Fill in the details (title, content, date, time, repeat pattern) and tap "Done" in the header to save.
2.  **View Reminders:** Reminders are listed on the main screen. You can filter them by "All", "Pending", or "Completed".
3.  **Edit/Delete/Snooze:** Tap on a reminder item to go to its detail screen. Here you can update its information, mark it as complete/pending, delete it, or snooze it for a set duration.
4.  **Completed Reminders:** Access the "Completed Reminders" screen to view all archived tasks.

---

This README provides a comprehensive overview of the Reminder App.