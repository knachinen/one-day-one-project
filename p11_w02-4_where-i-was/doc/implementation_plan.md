# Implementation Plan - Where I Was (MVP)

## Goal Description
Initialize the "Where I Was" project, a privacy-focused location journal app. The goal is to set up the Expo environment, configure necessary permissions for background location tracking, and establish the local database schema for storing location history.

## User Review Required
> [!IMPORTANT]
> **Background Location Permissions**: This app requires "Always Allow" location permissions to function correctly in the background. We need to ensure the configuration in `app.json` is correct for both iOS and Android to request these permissions.

> [!NOTE]
> **Database Choice**: I plan to use `expo-sqlite` for simplicity and good integration with Expo, as suggested in the feasibility doc.

## Proposed Changes

### Project Initialization
- Initialize a new Expo project using TypeScript.
- Install dependencies:
    - `react-native-maps`
    - `expo-location`
    - `expo-task-manager`
    - `expo-sqlite`
    - `@react-navigation/native` & related stacks

### Directory Structure
Create the following structure under `src/`:
- `components/`: Reusable UI components
- `screens/`: Main screens (Map, List, Settings)
- `db/`: Database initialization and helpers
- `services/`: Background tasks and Location logic
- `utils/`: Helper functions (Date formatting, etc.)
- `types/`: TypeScript definitions

### Database Schema (`src/db/schema.ts`)
Define the `LOCATIONS` table:
```sql
CREATE TABLE IF NOT EXISTS locations (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    duration INTEGER, -- seconds
    startTime REAL NOT NULL, -- timestamp
    userNote TEXT
);
```

### Background Task Configuration
- Define a task name in `src/constants/tasks.ts`.
- Register the task using `TaskManager.defineTask` in `src/services/LocationTask.ts`.
- Configure `app.json` to include `UIBackgroundModes` (location) for iOS and permissions for Android.

## Verification Plan

### Automated Tests
- None for initial setup.

### Manual Verification
1.  **Project Run**: Verify `npm start` runs without errors.
2.  **Permissions**:
    - Run on Simulator/Device.
    - Trigger a location request.
    - Verify the OS permission dialog appears and allows "Always" (or "While Using" initially, then upgradeable).
3.  **Database**:
    - Create a temporary button to insert a dummy record.
    - Restart app.
    - Verify the record persists and can be queried.
