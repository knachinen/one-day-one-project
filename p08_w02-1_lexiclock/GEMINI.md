# LexiClock Project Overview

LexiClock is a minimalist clock application built with React Native and Expo. Its primary feature is a unique time display system that converts hours, minutes, and seconds into a custom alphanumeric representation.

## Key Features:
- **Unique Time Display:** Hours are represented by single uppercase letters (A-X), while minutes and seconds are converted into a two-character base-26 system using lowercase letters (e.g., 00 -> "aa", 59 -> "ch").
- **Minimalist UI:** Features a dark theme with neon-style visual effects.
- **Decoding Functionality:** Users can reveal the standard digital time temporarily through a double-tap gesture or a dedicated button.
- **Customization:** Allows toggling between 12-hour and 24-hour formats.

## Technologies Used:
- **React Native:** Framework for building mobile applications.
- **Expo:** A framework and platform for universal React applications, simplifying development.
- **TypeScript:** For type-safe JavaScript.
- **Zustand:** A small, fast, and scalable bearbones state-management solution for React.
- **`react-native-reanimated` and `expo-linear-gradient`:** For smooth animations and UI effects.

## Project Structure:
The project follows a standard Expo Managed Workflow structure with TypeScript, as outlined in the `doc/implementation_plan.md`:
- `/src/assets`: Fonts, Images
- `/src/components`: Reusable UI components (e.g., `AnimatedClockChar`, `ClockText`, `SettingsModal`)
- `/src/constants`: Colors, Themes, Fonts
- `/src/hooks`: Custom hooks (e.g., `useTime`)
- `/src/screens`: Main application screens (e.g., `MainScreen`)
- `/src/store`: Zustand store for application state (e.g., `useStore`)
- `/src/utils`: Utility functions, including time conversion logic (e.g., `time.ts`)

## Building and Running the Project

To run the LexiClock application, use the following `npm` scripts:

- **`npm start`**: Starts the Expo development server.
- **`npm run android`**: Opens the project in a new Expo Go app on an Android device or emulator.
- **`npm run ios`**: Opens the project in a new Expo Go app on an iOS device or simulator.
- **`npm run web`**: Opens the project in a web browser.

## Development Conventions

- **Language:** TypeScript is strictly used for all JavaScript code.
- **State Management:** Zustand is used for managing application state, with persistence handled by `AsyncStorage`.
- **Styling:** `StyleSheet` from `react-native` is used for component-specific styling, often incorporating `expo-linear-gradient` for background effects.
- **Testing:** Jest is configured for unit testing, particularly for the core time conversion logic in `src/utils/time.ts`.
- **Code Formatting:** While not explicitly defined by a separate config file, standard TypeScript and React Native best practices are followed.

## Core Logic: Time Conversion (`src/utils/time.ts`)

The `src/utils/time.ts` file contains the core logic for converting standard time into the LexiClock's unique format:

-   `getHourChar(hour: number)`: Converts an hour (0-23) into a single uppercase character (A-X).
-   `getBase26(val: number)`: Converts a number (0-59) into a two-character base-26 string using lowercase letters.
-   `formatTime(date: Date, is24Hour: boolean)`: Orchestrates the above functions to provide the full LexiClock display for a given `Date` object, respecting the `is24Hour` setting.

This document serves as a comprehensive guide for understanding, developing, and maintaining the LexiClock project.
