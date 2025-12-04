# Where I Was (어디갔었지) 📍

**Where I Was** is a privacy-focused location journaling application built with React Native and Expo. It automatically records the places you visit and allows you to keep a personal log of your journey.

## ✨ Key Features

- **Smart Background Tracking**: Automatically detects when you stay at a location for more than 30 minutes.
- **Battery Efficient**: Optimized to minimize battery drain using geofencing and deferred updates.
- **Local Data Privacy**: All location data is stored locally on your device using SQLite. No data is sent to external servers.
- **Interactive Map**: Visualize your journey on a map with markers for each visited place.
- **Reverse Geocoding**: Automatically converts GPS coordinates into readable addresses or place names.
- **Personal Notes**: Add custom notes to any recorded location to remember why you were there.

## 🛠 Tech Stack

- **Framework**: React Native (Expo Managed Workflow)
- **Language**: TypeScript
- **Database**: `expo-sqlite`
- **Location Services**: `expo-location`, `expo-task-manager`
- **Maps**: `react-native-maps`
- **Navigation**: React Navigation (Stack)

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Expo Go app on your iOS or Android device (or a Simulator/Emulator)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/where-i-was.git
    cd where-i-was
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the app:**
    ```bash
    npx expo start
    ```

4.  **Launch on Device:**
    - Scan the QR code with your phone's camera (iOS) or the Expo Go app (Android).
    - **Note:** For background location tracking to work, you must grant **"Always Allow"** location permissions when prompted.

## 📱 Permissions

This app requires the following permissions to function correctly:

- **Location (Always)**: Required to track your location in the background even when the app is closed.
- **Notifications** (Optional): Used to show a sticky notification on Android to indicate the background service is running.

## 📂 Project Structure

```
src/
├── components/   # Reusable UI components
├── screens/      # Main application screens (Map, List, Settings)
├── services/     # Background tasks and location logic
├── db/           # SQLite database setup and helpers
├── utils/        # Utility functions (Geocoding, Formatting)
├── types/        # TypeScript type definitions
└── navigation/   # Navigation configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
