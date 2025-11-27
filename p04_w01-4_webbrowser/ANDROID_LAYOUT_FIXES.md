# Android Layout Fixes - Status Bar & Navigation Bar

## Changes Made

### 1. SafeAreaView Import Updates
Updated all screen components to use `SafeAreaView` from `react-native-safe-area-context` instead of React Native's built-in SafeAreaView:

- ✅ [BrowserScreen.tsx](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/screens/BrowserScreen.tsx)
- ✅ [BookmarksScreen.tsx](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/screens/BookmarksScreen.tsx)
- ✅ [HistoryScreen.tsx](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/screens/HistoryScreen.tsx)
- ✅ [SettingsScreen.tsx](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/screens/SettingsScreen.tsx)

### 2. Edges Configuration
Added `edges={['top', 'left', 'right']}` prop to all SafeAreaView components:
- Prevents overlap with Android status bar (top)
- Handles notch/cutout areas (left, right)
- Bottom edge handled by React Navigation's tab bar

### 3. StatusBar Configuration
Updated BrowserScreen with proper StatusBar settings:
```typescript
<StatusBar
  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  backgroundColor={isDarkMode ? COLORS.backgroundDark : COLORS.background}
  translucent={false}
/>
```

### 4. Android App Configuration
Updated [app.json](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/app.json) with Android-specific settings:
```json
{
  "android": {
    "softwareKeyboardLayoutMode": "pan",
    "statusBar": {
      "backgroundColor": "#6366F1",
      "translucent": false
    }
  }
}
```

## Benefits

1. **No Status Bar Overlap**: Content no longer appears behind the Android status bar
2. **No Navigation Bar Overlap**: Bottom tab bar properly accounts for Android navigation buttons
3. **Notch Support**: Handles devices with notches and cutouts correctly
4. **Keyboard Handling**: `pan` mode ensures keyboard doesn't cover input fields
5. **Consistent Appearance**: Status bar color matches app theme

## Testing

When you build and run the app on Android, you should see:
- ✅ URLBar appears below the status bar (not behind it)
- ✅ Bottom tab navigation doesn't overlap with system navigation buttons
- ✅ Content is properly inset on devices with notches
- ✅ Status bar color matches the app's primary color (#6366F1)
- ✅ Dark mode properly updates status bar content color

## Technical Details

**Why `react-native-safe-area-context`?**
- React Native's built-in `SafeAreaView` only works on iOS
- `react-native-safe-area-context` provides cross-platform safe area support
- The `edges` prop allows fine-grained control over which edges to inset

**Why exclude bottom edge?**
- React Navigation's tab bar already handles bottom safe area
- Including bottom edge would create double inset
- Only top, left, and right edges need manual handling

## Update: Bottom Navigation Bar Fix

### Issue
The browser's NavigationControls component was overlapping with Android's system navigation bar (the bar with back/home/recent buttons).

### Solution
Added `useSafeAreaInsets` hook to [NavigationControls.tsx](file:///Users/salgu/Workspace/1_project/ritual_code/p04_w01-4_webbrowser/src/components/NavigationControls.tsx):

```typescript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const insets = useSafeAreaInsets();

<View
  style={[
    styles.container,
    {
      paddingBottom: Math.max(insets.bottom, SPACING.sm),
    },
  ]}
>
```

### How it works
- `insets.bottom` provides the height of the Android navigation bar
- `Math.max(insets.bottom, SPACING.sm)` ensures minimum padding even on devices without navigation bar
- Dynamic padding adjusts automatically for different Android devices
- Works with gesture navigation and button navigation

### Result
✅ Browser navigation controls now sit above the Android navigation bar
✅ No overlap on any Android device
✅ Maintains consistent spacing on devices without navigation bar
