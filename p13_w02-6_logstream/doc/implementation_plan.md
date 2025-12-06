# LogStream Implementation Plan

This document outlines the step-by-step plan to implement the LogStream Android application.

## Goal Description
Build a high-performance Android utility app that streams system logs (`logcat`) in real-time, filters them, and saves them to files. The app requires a custom native module and must be built using **Expo Prebuild** (Development Build).

## User Review Required
> [!IMPORTANT]
> **Expo Prebuild Required**: This project cannot be run in Expo Go. It requires a local development build (`npx expo run:android`) or EAS Build.
> **ADB Permission**: Testing the core functionality (`READ_LOGS`) requires granting permissions via ADB.

## Proposed Changes

### Phase 1: Project Setup & Native Foundations
Initialize the Expo project and establish the bridge to Android's `logcat`.

#### [NEW] [Native Module Setup]
- **Initialize Project**: `npx create-expo-app@latest LogStream --template blank-typescript`
- **Prebuild Configuration**: Configure `app.json` for Android package name (`com.logstream.app`) and permissions (`android.permission.READ_LOGS`).
- **Native Module**: Create `android/app/src/main/java/com/logstream/LogcatModule.kt` (or Java).
    - Function: `startLogcat()` - Spawns `logcat` process, reads stdout.
    - Function: `stopLogcat()` - Kills the process.
    - Event Emitter: Sends log lines to JS side via React Native Bridge/JSI.

### Phase 2: Core Logic & State Management
Handle high-frequency data streams efficiently in JavaScript.

#### [NEW] [State Management]
- **Zustand Store**: `src/store/useLogStore.ts`.
    - Buffered State: Store logs in chunks to minimize re-renders.
    - Filtering Logic: Selectors for filtering by Level and Tag.
- **Log Parser**: `src/utils/logParser.ts`.
    - Regex to parse standard `logcat` format: `timestamp`, `pid`, `tid`, `level`, `tag`, `message`.

### Phase 3: UI Implementation
Build the screens defined in the Design Document.

#### [NEW] [Screens & Components]
- **Navigation**: Stack Navigator (`@react-navigation/native`).
- **Permission Screen**: `src/screens/PermissionScreen.tsx` - Checks permission on mount.
- **Main Screen**: `src/screens/MainScreen.tsx`.
    - **FlashList**: `@shopify/flash-list` for rendering 5000+ log lines smoothly.
    - **Controls**: Stop/Start, Buffer selection tabs.
- **Detail Screen**: `src/screens/LogDetailScreen.tsx` - Full text view.
- **Settings Modal**: `src/screens/SettingsScreen.tsx` - File saving logic using `expo-file-system`.

### Phase 4: Polish & Performance
Ensure the app is usable in a professional context.

#### [MODIFY] [Optimization]
- **Memoization**: extensively use `React.memo` for log list items.
- **Batching**: Update state in batches (e.g., every 500ms or 100 logs) to prevent UI thread lock.

## Verification Plan

### Automated Tests
- **Unit Tests**: Test `logParser.ts` with various log string formats.
- **Snapshot Tests**: Basic UI snapshots for screens.

### Manual Verification
1. **Permission Flow**: Install app -> Verify "No Permission" screen -> Run `adb shell pm grant` -> Verify auto-transition to Main Screen.
2. **Streaming**: Verify logs are appearing in real-time.
3. **Filtering**: Select "Error" level -> Verify only red logs appear.
4. **Performance**: Generate spam logs (`adb shell logcat -s Test:V`) -> Verify UI responsiveness.
