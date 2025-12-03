# Markify Implementation Plan

## Goal
Build "Markify", a React Native/Expo app that converts web pages (URL) into Markdown format, allows editing, and saves them locally.

## Tech Stack
- **Framework:** React Native (Expo Managed Workflow)
- **Language:** TypeScript
- **Navigation:** React Navigation
- **State Management:** Zustand (with persist middleware for local storage)
- **Networking:** fetch or axios
- **Conversion:** turndown (HTML to Markdown)
- **UI:** StyleSheet, Lucide React Native (icons)

## Proposed Architecture

### Directory Structure
```
src/
  components/   # Reusable UI components
  screens/      # Main screens (Home, Editor, History)
  utils/        # Helper functions (conversion, formatting)
  store/        # Zustand store
  types/        # TypeScript definitions
  constants/    # Colors, layout constants
```

## Detailed Implementation Steps

### 1. Project Initialization
- Create new Expo app.
- Setup TypeScript.
- Install `react-navigation`, `zustand`, `turndown`, `axios`, `expo-clipboard`, `expo-sharing`.

### 2. UI & Navigation
- **Navigation:** Simple Stack Navigator.
    - `Home`: Input URL, Go to History.
    - `Editor`: View/Edit MD, Save, Copy, Share.
    - `History`: List of saved notes.
- **Theme:** Dark/Light mode support (or just clean minimal design).

### 3. URL Conversion Logic
- **Input:** Text input for URL.
- **Process:**
    1. Fetch HTML from URL.
    2. Use `turndown` to convert HTML string to Markdown.
    3. Extract `<title>` for default note title.
- **Error Handling:** Show alerts for network errors or invalid URLs.

### 4. Editor & Actions
- **Editor:** Multiline TextInput for editing Markdown.
- **Actions:**
    - **Copy:** Use `expo-clipboard`.
    - **Share:** Use `expo-sharing`.
    - **Save:** Persist to local store.

### 5. Local Storage
- Use `zustand` with `persist` (AsyncStorage) to store an array of notes.
- **Note Structure:** `{ id, title, content, createdAt, originalUrl }`.
- **History Screen:** FlatList of notes. Tap to open in Editor.

## Verification Plan
### Automated Tests
- Unit tests for conversion utility (if complex logic added).

### Manual Verification
- **Test 1:** Input a valid blog URL -> Verify Markdown output.
- **Test 2:** Edit the Markdown -> Verify changes persist.
- **Test 3:** Copy to clipboard -> Paste elsewhere to verify.
- **Test 4:** Save note -> Restart app -> Verify note exists in History.
- **Test 5:** Delete note -> Verify removal.
