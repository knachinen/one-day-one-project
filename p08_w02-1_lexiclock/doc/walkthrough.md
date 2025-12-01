# LexiClock Walkthrough

## Overview
LexiClock is a minimalist clock app that displays time using a unique alphabet conversion system. This MVP includes the core time display, animations, decode feature, and settings.

## Project Configuration
- **SDK Version**: Expo SDK 52 (React Native 0.76.5)
- **Reanimated**: 3.16.1 (compatible with Expo Go)
- **Project Directory**: `/Users/salgu/Workspace/1_project/ritual_code/p08_w02-1_lexiclock`

## Features Implemented

### 1. Alphabet Time Display
- **Logic**: 
    - Hours (0-23) mapped to A-X.
    - Minutes/Seconds (0-59) mapped to Base-26 (aa-ch).
- **UI**: Large, neon-glowing characters.

### 2. Animations
- **Smooth Transitions**: Characters zoom in/out when changing using Reanimated.
- **Neon Glow**: Text has a subtle glow effect matching the theme.
- **Background**: Deep navy/black gradient using LinearGradient.

### 3. Decode Feature
- **Interaction**: Tap the "DECODE" button or double-tap the background.
- **Effect**: Displays the actual numeric time (e.g., 18:30:45) for 3 seconds.

### 4. Settings
- **Toggle 24-Hour Mode**: Switch between 12h and 24h formats.
- **Persistence**: Settings are saved using AsyncStorage via Zustand.

## Verification Results

### Automated Tests
- `src/utils/time.test.ts` passed. Verified conversion logic for edge cases (0, 59, 23, 24).
- TypeScript compilation: No errors.

### Manual Verification Steps
1. **Launch App**: Run `npx expo start -c` (clear cache).
2. **Check Time**: Compare the alphabet code with the system time.
3. **Decode**: Tap "DECODE". Verify the numeric time appears and disappears after 3s.
4. **Settings**: Tap "SETTINGS". Toggle "24-Hour Clock". Verify the Hour character changes.
5. **Restart**: Reload the app. Verify settings persist.

## Troubleshooting

### Reanimated Errors
If you encounter "Worklets mismatch" or "NullPointerException" errors:
- Ensure you're using **Expo SDK 52** (not 54).
- Clear cache: `npx expo start -c`
- Update Expo Go app to latest version.

## Next Steps
- **Widgets**: Implement Home Screen widgets.
- **Share**: Add functionality to share the current "Time Card".
- **Custom Fonts**: Integrate "Old English" or "Future Tech" fonts.
