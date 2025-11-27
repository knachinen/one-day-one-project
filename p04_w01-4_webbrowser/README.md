# Mobile Web Browser

A sleek, modern mobile web browser built with React Native, Expo, and TypeScript.

## Features

- 🌐 **Full WebView Integration** - Browse any website with native performance
- 📑 **Tab Management** - Open multiple tabs and switch between them seamlessly
- 🔖 **Bookmarks** - Save your favorite pages for quick access
- 📜 **History Tracking** - Keep track of your browsing history
- 🎨 **Dark Mode** - Beautiful dark theme for comfortable browsing
- 🔍 **Multiple Search Engines** - Choose between Google, Bing, or DuckDuckGo
- ⚡ **Premium UI** - Sleek, modern interface with smooth animations

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development and build tooling
- **TypeScript** - Type-safe development
- **React Navigation** - Bottom tab navigation
- **AsyncStorage** - Persistent data storage
- **react-native-webview** - WebView component

## Installation

```bash
cd /Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser
npm install
```

## Running the App

### Development Build (Required for WebView)

Since this app uses `react-native-webview`, it requires a development build and cannot run in Expo Go.

1. **Install EAS CLI** (if not already installed):
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure the project**:
   ```bash
   eas build:configure
   ```

4. **Create a development build**:
   
   For iOS:
   ```bash
   eas build --profile development --platform ios
   ```
   
   For Android:
   ```bash
   eas build --profile development --platform android
   ```

5. **Install the development build** on your device and run:
   ```bash
   npx expo start --dev-client
   ```

### Alternative: Local Development Build

For faster iteration, you can create a local development build:

```bash
# Install dependencies
npx expo install expo-dev-client

# For iOS (requires Mac)
npx expo run:ios

# For Android
npx expo run:android
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BrowserTab.tsx
│   ├── URLBar.tsx
│   ├── NavigationControls.tsx
│   ├── TabSwitcher.tsx
│   └── BookmarkItem.tsx
├── screens/            # Main screen components
│   ├── BrowserScreen.tsx
│   ├── BookmarksScreen.tsx
│   ├── HistoryScreen.tsx
│   └── SettingsScreen.tsx
├── utils/              # Utility functions
│   ├── storage.ts
│   └── urlUtils.ts
├── constants/          # App constants
│   └── theme.ts
└── types/              # TypeScript types
    └── index.ts
```

## Features in Detail

### Browser
- Enter URLs or search queries
- Navigate with back/forward buttons
- Reload pages
- Secure connection indicator (HTTPS)
- Loading progress indicator

### Tab Management
- Open multiple tabs
- Switch between tabs with beautiful grid view
- Close individual tabs
- Tab state persistence

### Bookmarks
- Add bookmarks from any page
- View all bookmarks
- Delete bookmarks
- Persistent storage

### History
- Automatic history tracking
- Chronological list with date grouping
- Clear all history
- Navigate to previously visited pages

### Settings
- Choose default search engine
- Toggle dark mode
- Privacy settings
- App information

## Design Philosophy

This browser features a **premium, modern design** with:
- Gradient color schemes (purple/blue theme)
- Smooth animations and transitions
- Glassmorphism effects
- Elevated card designs
- Responsive layouts
- Intuitive gestures

## License

MIT
