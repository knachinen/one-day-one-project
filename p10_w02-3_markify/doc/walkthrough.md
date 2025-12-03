# Markify Walkthrough

Markify is a React Native app that converts web pages into Markdown format.

## Features Implemented

### 1. URL to Markdown Conversion
- **Input:** Enter a URL in the Home screen.
- **Process:** Fetches HTML and converts it to Markdown using `turndown`.
- **Output:** Navigates to the Editor screen with the result.

### 2. Markdown Editor
- **View/Edit:** View the converted Markdown in a text input.
- **Copy:** Copy content to clipboard.
- **Share:** Share content via system share sheet.
- **Save:** Save the note to local history.

### 3. History
- **List:** View saved notes in the History screen.
- **Open:** Tap a note to open it in the Editor.
- **Delete:** Long press a note to delete it.

## Verification Steps

### Automated Verification
- Run `npm run tsc` to verify type safety.

### Manual Verification
1. **Convert a URL:**
   - Enter `https://example.com` (or any blog post URL).
   - Tap "Convert to Markdown".
   - Verify that the Editor opens with the Markdown content.

2. **Edit and Actions:**
   - Modify the text in the Editor.
   - Tap "Copy" and paste it somewhere to verify.
   - Tap "Share" to verify the share sheet opens.
   - Tap "Save" to save the note.

3. **History:**
   - Go back to Home -> History.
   - Verify the saved note appears.
   - Tap to open it.
   - Long press to delete it.

## Tech Stack
- React Native (Expo)
- TypeScript
- React Navigation
- Zustand (Persist)
- Turndown
- Axios
