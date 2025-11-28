# Paperclip 📎

Paperclip is a minimalist text archiving app designed for ultra-fast capture and instant search. Built with React Native and Expo.

## Features

- **Ultra-fast Capture**: Open the app and start typing immediately.
- **Instant Search**: Filter memos by content or tags in real-time.
- **Tagging System**: Organize your thoughts with lightweight tags.
- **Offline First**: All data is stored locally on your device.
- **Dark/Light Mode**: Adapts to your system preference (coming soon).
- **Archive**: Keep your active list clean by archiving old memos.

## Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: React Navigation (Native Stack & Bottom Tabs)
- **Storage**: AsyncStorage
- **Styling**: StyleSheet with a custom Theme System
- **Icons**: Ionicons (@expo/vector-icons)
- **Fonts**: Inter (Google Fonts)

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start the App**
    ```bash
    npx expo start
    ```

3.  **Run on Device/Simulator**
    - Press `a` for Android Emulator
    - Press `i` for iOS Simulator
    - Scan the QR code with Expo Go app on your physical device

## Project Structure

```
src/
├── components/   # Reusable UI components (SearchBar, TagChip, MemoItem)
├── screens/      # Application screens (MemoList, CreateMemo, MemoDetail, Archive)
├── navigation/   # Navigation configuration (AppNavigator)
├── services/     # Business logic (Storage, Search)
├── theme/        # Design system (Colors, Typography, Spacing)
├── types/        # TypeScript interfaces
└── hooks/        # Custom hooks (useDebounce)
```

## Future Roadmap

- [ ] Cloud Sync (Google Drive / iCloud)
- [ ] Biometric Lock
- [ ] Share Extension
- [ ] Markdown Support
