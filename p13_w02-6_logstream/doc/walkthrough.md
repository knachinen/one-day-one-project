# LogStream Implementation Walkthrough

This document summarizes the implementation of the **LogStream** application, a high-performance Android system log viewer built with Expo Prebuild.

## Implemented Features

### 1. Native Logcat Module
- **File**: `android/app/src/main/java/com/logstream/app/LogcatModule.kt`
- **Functionality**: Accesses Android's `logcat` process using `Runtime.exec` and streams logs via `DeviceEventEmitter`.
- **Permissions**: Requires manual grant of `android.permission.READ_LOGS`.

### 2. High-Performance Log List
- **Component**: `MainScreen.tsx`
- **Optimization**: Uses `@shopify/flash-list` for rendering thousands of log lines at 60fps.
- **State Management**: `zustand` store limits buffer to 5000 lines to prevent memory overflows.

### 3. File Management
- **Screen**: `SettingsScreen.tsx`
- **Features**:
    - Save current log buffer to device storage (`DocumentDirectory`).
    - List saved files.
    - Share files via system share sheet (`expo-sharing`).

### 4. Permission Handling
- **Screen**: `PermissionScreen.tsx`
- **Logic**: Automatically checks for `READ_LOGS` permission on launch. If missing, guides the user to run the ADB command.

## Verification Steps

### Prerequisites
- Android Device connected via USB.
- ADB installed on PC.
- App installed via Development Build (`npx expo run:android`).

### Test Plan

#### 1. Permission Grant
1. Launch the app. You should see "ADB Permission Required" screen.
2. Run command:
   ```bash
   adb shell pm grant com.logstream.app android.permission.READ_LOGS
   ```
3. Tap "Check Permission". App should navigate to Main Screen.

#### 2. Log Streaming
1. On Main Screen, tap "Start".
2. Verify logs are scrolling in real-time.
3. Filter by text (e.g., "ActivityManager") and verify list updates.

#### 3. Performance Test
1. Generate spam logs: `adb shell logcat -s Test:V` (in a separate terminal loop).
2. Verify UI remains responsive while scrolling.

#### 4. Save & Share
1. Tap "Save" (navigates to Settings).
2. Enter filename and tap "Save to File".
3. Verify file appears in list.
4. Tap "Share" on the file item and verify system share sheet opens.

## Project Structure
- `/src/store`: State management (Zustand).
- `/src/utils`: Log parsing logic.
- `/src/hooks`: Logical bridge between Native Module and Store.
- `/src/screens`: UI Components.
- `/android`: Native Android project with custom module.
