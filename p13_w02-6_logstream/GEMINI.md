# LogStream Project Overview

## Project Type

This is a React Native mobile application built with Expo, primarily targeting Android for its Minimum Viable Product (MVP). It leverages custom native modules to interact with Android's Logcat for real-time log streaming and analysis.

## Project Purpose

The "LogStream" project aims to provide developers with a specialized tool for debugging Android applications directly from a mobile device. It offers real-time streaming, filtering, searching, and analysis capabilities for Logcat data within a mobile-optimized user interface. The core goal is to enable efficient in-field debugging.

## Key Technologies

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **State Management:** Zustand (`useLogStore`)
- **Navigation:** React Navigation (`@react-navigation/native-stack`)
- **UI Components:** `@shopify/flash-list` for efficient list rendering
- **Native Integration:** Custom Native Module (Java/Kotlin) for Logcat interaction
- **File System Operations:** Expo FileSystem, Expo Sharing

## Core Functionality (MVP)

- **Real-time Log Streaming:** Captures and streams Android Logcat data via a native module to the React Native app.
- **Permission Management:** Guides users through granting the necessary `android.permission.READ_LOGS` via ADB commands.
- **Log Buffer Selection:** Allows users to select log buffers (main, events, radio).
- **Streaming Control:** Start and stop log capturing.
- **Log Filtering:**
  - By log level (Verbose, Debug, Info, Warning, Error, Fatal).
  - By log tag.
  - By text search within log messages.
- **User Interface:**
  - Color-coded log levels for improved readability.
  - Auto-scrolling to the latest log entry, with a pause on manual scroll.
  - Optimized performance for large log lists (max 5,000 lines) using `FlashList`.
- **Data Persistence & Sharing:**
  - Save captured logs to local storage as `.txt` files.
  - Share saved log files via mobile sharing sheets.

## Log Data Structure

Logs are internally represented as JSON objects with the following fields:

- `timestamp`: STRING (Log recording time and date)
- `level`: STRING (Log level: V, D, I, W, E, F)
- `tag`: STRING (Module/class tag that recorded the log)
- `pid`: INTEGER (Process ID)
- `message`: STRING (Actual log content)

## Building and Running

The project uses Expo CLI for development.

- **Install Dependencies:** `npm install` or `yarn install`
- **Start Development Server:** `npm start`
- **Run on Android:** `npm run android`
- **Run on iOS:** `npm run ios` (Note: MVP is Android-focused, but iOS support is present for the React Native part)
- **Run on Web:** `npm run web`

## Development Conventions

- TypeScript is used throughout the project.
- Clear modular structure (hooks, navigation, screens, store, utils).
- Emphasis on performance for displaying large datasets in lists.
- State managed globally using Zustand.
- Native module development for platform-specific functionalities.
