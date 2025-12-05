# QuickLine Project Overview

This document provides a comprehensive overview of the "QuickLine" project, an Expo React Native application designed for personal safety and emergency response.

## 1. Project Purpose and Main Technologies

**Purpose:** QuickLine is a mobile application aimed at providing users with a fast and efficient way to handle emergency situations. It allows users to quickly trigger emergency actions such as sending their location via SMS to pre-configured emergency contacts and initiating emergency calls. It also facilitates the storage and management of In Case of Emergency (ICE) contacts and a medical profile, with sensitive data being encrypted.

**Main Technologies:**

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation (`@react-navigation/stack`)
- **State Management:** Zustand
- **Local Storage:**
  - `expo-sqlite`: For structured data storage (e.g., ICE contacts, medical profile).
  - `@react-native-async-storage/async-storage`: For simple key-value pair storage (e.g., `hasLaunched` flag).
- **Location Services:** `expo-location`
- **Security:** `expo-crypto` (for medical profile encryption)
- **UI/UX:** Utilizes custom theming (`src/constants/theme.ts`) and a structured component architecture.

## 2. Architecture and Key Features

The application follows a standard React Native architecture, leveraging components, hooks, and a dedicated store for state management.

**Key Features Implemented:**

- **Emergency Button:** A prominent button on the main screen to initiate emergency actions.
- **Location Tracking:** Gathers the user's current location to share with emergency contacts.
- **SMS Sending:** Sends pre-defined emergency messages including location details to ICE contacts.
- **Emergency Calls:** Direct linking to emergency services (e.g., 112/119).
- **Onboarding Flow:** Guides new users through initial setup, including permissions.
- **ICE Contact Management:** Allows users to add, edit, and delete emergency contacts, stored securely using SQLite.
- **Medical Profile:** Stores critical medical information, which is encrypted using `expo-crypto` and persisted in SQLite.
- **User Interface:** Intuitive UI with screens for Main operations, Contacts management, Medical Profile setup, and Onboarding.

## 3. Building and Running

This project uses Expo, simplifying the build and run process.

**Prerequisites:**

- Node.js and npm/yarn
- Expo CLI (`npm install -g expo-cli` or `yarn global add expo-cli`)

**Commands:**

- **Install Dependencies:**

  ```bash
  npm install
  # or
  yarn install
  ```

- **Start the development server:**

  ```bash
  npm start
  # or
  yarn start
  ```

  This will open Expo Developer Tools in your browser, from which you can:

  - Run on Android emulator/device (`a`)
  - Run on iOS simulator/device (`i`)
  - Run in web browser (`w`)

- **Run on Android:**

  ```bash
  npm run android
  # or
  yarn android
  ```

- **Run on iOS:**

  ```bash
  npm run ios
  # or
  yarn ios
  ```

- **Run in Web Browser:**

  ```bash
  npm run web
  # or
  yarn web
  ```

## 4. Development Conventions

- **Code Style:** Follows standard TypeScript and React Native best practices.
- **Folder Structure:**
  - `src/components`: Reusable UI components.
  - `src/constants`: Application-wide constants (e.g., `theme.ts`).
  - `src/hooks`: Custom React hooks (e.g., `useLocation.ts`).
  - `src/screens`: Top-level screen components used in navigation.
  - `src/store`: Zustand store for global state.
  - `src/utils`: Utility functions (e.g., `communication.ts`, `db.ts`).
- **Documentation:** Project documentation is maintained in the `doc/` directory, including `task.md` for development tasks and `implementation_plan.md` for detailed planning.
- **Static Analysis:** TypeScript is used for type checking. Ensure no TypeScript errors are present (`npx tsc --noEmit`).

## 5. Next Steps / TODO

- While `doc/task.md` indicates all tasks are completed, always ensure that static analysis (`npx tsc --noEmit`) returns 0 errors before considering the project fully verified.
- Review `src/screens/MainScreen.tsx` for potential re-rendering issues with `EmergencyButton` and apply `React.memo` if necessary for performance optimization.
- Ensure `src/hooks/useLocation.ts` has proper cleanup for location subscriptions.
- Verify the comprehensive `walkthrough.md` is up-to-date and covers all aspects of the application.
