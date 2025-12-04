# Where I Was - MVP Walkthrough

## Overview
"Where I Was" is a location journal app that tracks your stays in the background and visualizes them on a map.

## Features Implemented

### 1. Background Location Tracking
- **Smart Stay Detection:** Automatically records a location when you stay within a 50m radius for at least 30 minutes.
- **Battery Efficient:** Uses Expo's `startLocationUpdatesAsync` with `deferredUpdatesInterval` to minimize battery usage.
- **Manual Control:** You can start/stop tracking manually from the Main Map screen.

### 2. Local Database
- **SQLite Storage:** All location data is stored locally on your device.
- **Data Persistence:** Data survives app restarts.

### 3. Map Visualization
- **Interactive Map:** View your current location and history markers.
- **Markers:** Blue pins indicate places you've stayed.

### 4. History & Notes
- **List View:** See a chronological list of your stays.
- **Notes:** Add personal notes to any recorded location.
- **Reverse Geocoding:** Coordinates are automatically converted to address/place names (if available).

## How to Test

### Prerequisites
- Run on a real device (iOS or Android) via Expo Go.
- **Permissions:** Grant "Always Allow" location permission when prompted.

### Testing Steps

1.  **Start Tracking:**
    - Open the app.
    - On the "Where I Was" (Map) screen, tap **"Start Tracking"**.
    - Grant permissions if asked.

2.  **Simulate a Stay (Real World):**
    - Leave the app in the background.
    - Stay in one location for > 30 minutes.
    - The app should automatically record a "Stay".

3.  **Verify Recording:**
    - Open the app.
    - Go to the **"History"** tab.
    - You should see a new item with the time and duration.
    - The address should be populated (e.g., "123 Main St").

4.  **Add a Note:**
    - Tap on the history item.
    - Enter a note (e.g., "Worked here").
    - Tap "Save".
    - Verify the note appears in the list.

5.  **Test Geocoding Manually:**
    - Go to **"Settings"**.
    - Tap **"Test Reverse Geocoding"**.
    - It should show your current address.

## Troubleshooting
- **No Location Updates?** Check if "Location" permission is set to "Always" in system settings.
- **Geocoding Failed?** Ensure you have internet connectivity.
