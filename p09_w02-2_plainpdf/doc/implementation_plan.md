# Plain PDF Implementation Plan

## Goal Description
Build a minimalist PDF viewer "Plain PDF" for iOS and Android using React Native and Expo. The app will allow users to open PDF files, view them, and add annotations (highlights, text notes, drawings) which are persisted locally using SQLite.

## Proposed Changes

### Project Structure
- `src/components`: Reusable UI components (PDFViewer, AnnotationLayer, Toolbar).
- `src/screens`: Main screens (HomeScreen, PDFScreen).
- `src/utils`: Helper functions (coordinate conversion, file handling).
- `src/db`: Database setup and queries.
- `src/types`: TypeScript definitions.

### Dependencies
- `expo-document-picker`: For selecting files.
- `react-native-pdf` (or similar): For rendering PDFs.
- `react-native-svg`: For drawing annotations.
- `expo-sqlite`: For local database.
- `zustand`: For state management (optional but good for tool state).

### Database Schema
Table `ANNOTATIONS`:
- `id`: INTEGER PK AUTOINCREMENT
- `docId`: TEXT (File hash or path)
- `page`: INTEGER
- `type`: TEXT ('highlight', 'text', 'draw')
- `data`: TEXT (JSON string of coordinates/content)
- `timestamp`: REAL

## Verification Plan
### Automated Tests
- Unit tests for coordinate conversion logic.
### Manual Verification
- Open a PDF file.
- Add a highlight, close app, reopen -> Highlight persists.
- Add a text note, close app, reopen -> Note persists.
- Draw on PDF, close app, reopen -> Drawing persists.
