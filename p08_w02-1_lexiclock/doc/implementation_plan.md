# LexiClock Implementation Plan

## Goal Description
Develop "LexiClock", a minimalist clock app that displays time using a unique alphabet conversion system (Base-26 for minutes/seconds, A-X for hours). The app will feature a dark, neon-aesthetic UI, smooth animations, and customization options.

## User Review Required
> [!IMPORTANT]
> **Widget Implementation**: Native widgets in Expo require specific config plugins or native code. We will prioritize the main app features first and treat Widgets as a secondary phase or separate module depending on complexity.

## Proposed Changes

### Project Structure
We will use a standard Expo Managed Workflow structure with TypeScript.

```
/src
  /assets       # Fonts, Images
  /components   # Reusable UI components (ClockDigit, GlowText, etc.)
  /constants    # Colors, Themes, Fonts
  /hooks        # Custom hooks (useTime, useSettings)
  /navigation   # React Navigation setup
  /screens      # HomeScreen, SettingsScreen
  /store        # Zustand store for app state
  /utils        # Time conversion logic
```

### Core Logic (`src/utils/time.ts`)
- **Hour Conversion**: Map 0-23 to A-X.
- **Minute/Second Conversion**: Base-26 logic.
    - `val // 26` -> First char (a-c)
    - `val % 26` -> Second char (a-z)

### UI Components
- **`GlowText`**: A wrapper around `Text` that applies shadow props for neon effect.
- **`ClockDisplay`**: Main container for the H M S digits.
- **`DecodeOverlay`**: An overlay that shows the numeric time when triggered.

### State Management
- **Zustand**: Store user preferences (is24Hour, themeColor, fontStyle).
- **AsyncStorage**: Persist preferences.

## Verification Plan

### Automated Tests
- Unit tests for `time.ts` to ensure correct conversion (e.g., 59 -> 'ch', 0 -> 'aa').

### Manual Verification
- **Visual Check**: Verify neon glow effects and font rendering.
- **Animation**: Ensure seconds transition smoothly without jitter.
- **Decode**: Verify double-tap/button press reveals correct numeric time.
- **Settings**: Verify changing 12/24h mode updates the display immediately.
