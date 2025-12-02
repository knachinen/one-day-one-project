# Plain PDF Walkthrough

## Overview
Plain PDF is a minimalist PDF viewer with annotation capabilities, built using React Native, Expo, and SQLite.

## Features Implemented

### 1. PDF Viewer
- **File Loading**: Uses `expo-document-picker` to select PDF files from the device.
- **Rendering**: Utilizes `react-native-pdf` for native rendering performance.
- **Custom Paging**: Implemented a custom paging system using `FlatList` to allow synchronized annotation overlays on top of each page.

### 2. Annotation Tools
- **Highlight**: Users can drag to create a semi-transparent yellow rectangle.
- **Freehand Drawing**: Users can draw red lines using `react-native-svg` paths.
- **Text Notes**: Users can tap to add a text note via a modal input.

### 3. Data Persistence
- **Local Database**: Uses `expo-sqlite` to store annotations locally.
- **Auto-Save**: Annotations are saved to the database immediately upon creation.
- **Loading**: Annotations are loaded from the database when a PDF is opened, matched by file URI.

## Verification

### Manual Verification Steps
1. **Open App**: Launch the app to see the Home Screen.
2. **Pick PDF**: Tap "Open PDF" and select a file.
3. **View PDF**: Verify the PDF loads and displays pages.
4. **Highlight**:
    - Select "Highlight" from the toolbar.
    - Drag on the page.
    - Verify a yellow rectangle appears.
5. **Draw**:
    - Select "Draw" from the toolbar.
    - Draw with finger.
    - Verify red lines appear.
6. **Text**:
    - Select "Text" from the toolbar.
    - Tap on the page.
    - Enter text in the modal and save.
    - Verify a note marker appears (Note: MVP currently renders text content or marker).
7. **Persistence**:
    - Close the PDF (Back button).
    - Re-open the same PDF.
    - Verify all annotations are restored.

### Known Limitations (MVP)
- **Zoom Synchronization**: While the custom paging approach allows overlays, zooming individual pages might not perfectly sync the overlay if `react-native-pdf` handles zoom internally. The current implementation relies on `react-native-pdf`'s `singlePage` mode which fits the page to width.
- **Text Rendering**: Text annotations currently render as a simple marker or content at the tap location.
