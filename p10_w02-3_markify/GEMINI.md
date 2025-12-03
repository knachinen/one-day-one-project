# Markify Project Documentation

This document provides an overview of the "Markify" project, a React Native (Expo) application designed to convert web content into Markdown format, allow for editing, and save these notes locally.

## Project Overview

Markify is a mobile application built with Expo and React Native, utilizing TypeScript. Its primary function is to facilitate the conversion of web pages or raw HTML content into Markdown. Users can input URLs or paste HTML directly into the application, or leverage a share extension and a bookmarklet for seamless content ingestion. The converted Markdown can then be edited, copied, shared, and saved locally within the app's history.

**Key Features:**

- **URL to Markdown Conversion:** Fetches HTML from a given URL and converts it to Markdown.
- **HTML Text to Markdown Conversion:** Directly converts pasted HTML content to Markdown.
- **Share Extension Integration:** Allows sharing URLs from other applications to Markify for conversion.
- **Bookmarklet Support:** A custom bookmarklet enables sending the current web page's HTML to Markify via a deep link for conversion.
- **Markdown Editor:** Provides a text editor for modifying the converted Markdown content.
- **Copy & Share Functionality:** Enables copying the Markdown to the clipboard or sharing it with other applications.
- **Local History:** Saves converted and edited Markdown notes locally using Zustand with AsyncStorage persistence.
- **Markdown Preview:** Offers a preview mode for the Markdown content within the editor.

**Main Technologies:**

- **Framework:** React Native (Expo Managed Workflow)
- **Language:** TypeScript
- **Navigation:** React Navigation
- **State Management:** Zustand (with persist middleware)
- **Networking:** Axios
- **HTML to Markdown Conversion:** Turndown
- **Share Extension:** `expo-share-intent`
- **Local Storage:** `@react-native-async-storage/async-storage`

## Building and Running

To run the Markify project, ensure you have Node.js and npm/yarn installed.

1. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the Expo Development Server:**

   ```bash
   npm start
   # or
   yarn start
   ```

   This will start the Expo development server. You can then open the app on an emulator, simulator, or a physical device using the Expo Go app.

3. **Run on Android (requires Android Studio and SDK setup):**

   ```bash
   npm run android
   # or
   yarn android
   ```

4. **Run on iOS (requires Xcode and iOS development tools):**

   ```bash
   npm run ios
   # or
   yarn ios
   ```

5. **Run on Web (development build):**

   ```bash
   npm run web
   # or
   yarn web
   ```

## Development Conventions

- **Code Structure:** The application follows a modular structure with `src/components`, `src/screens`, `src/utils`, `src/store`, `src/types`, and `src/constants` directories.
- **Styling:** Uses `StyleSheet` for component-specific styling and a global `theme` from `src/constants/theme.ts`.
- **State Management:** Global state is managed using `Zustand`, with persistence handled by its `persist` middleware using `AsyncStorage`.
- **Navigation:** Relies on `React Navigation`'s Stack Navigator for screen transitions.
- **HTML to Markdown Conversion:** The `turndown` library is used, with `domino` polyfill to handle DOM-related requirements in a non-browser environment.
- **Share Intent/Deep Linking:** `expo-share-intent` is configured for handling content shared from other applications, and custom deep links (`markify://convert?html=...`) are used for the bookmarklet functionality.
