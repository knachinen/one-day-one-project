# QuickLine - Final Walkthrough

## Overview
QuickLine is a minimalist emergency contact app designed for speed and reliability. This walkthrough covers the end-to-end user experience, from first launch to emergency activation.

## Prerequisites
- Run the app on a physical device (recommended for SMS/Call features) or simulator:
  ```bash
  cd p12_w02-5_quickline
  npx expo start
  ```

## 1. Onboarding & Permissions
*Target: First-time users*
- [ ] **Launch App**: Open QuickLine for the first time.
- [ ] **Welcome Screen**: Verify the "Welcome to QuickLine" screen explains the app's purpose.
- [ ] **Grant Permissions**: Tap "Get Started" and accept **Location** permissions when prompted.
- [ ] **Navigation**: Confirm the app automatically navigates to the **Contacts Screen** to set up ICE contacts.

## 2. Setup: Contacts & Profile
*Target: Preparing for emergencies*
- [ ] **Add Contact**:
  - Tap "Add Contact".
  - Enter a Name (e.g., "Mom") and Phone Number.
  - Tap "Save". Verify the contact appears in the list.
  - Repeat for up to 3 contacts.
- [ ] **Medical Profile**:
  - Tap "Medical Profile" (link at bottom of Contacts screen).
  - Enter medical info (e.g., "Blood Type: O+, Allergy: Peanuts").
  - Tap "Save Profile". Verify the success alert.
- [ ] **Return to Main**: Use the back button or navigate to the Main Screen.

## 3. Main Screen & Emergency Usage
*Target: The core emergency loop*
- [ ] **Location Display**:
  - Verify your current address is displayed (e.g., "123 Main St, City").
  - Verify accuracy status ("High Accuracy" vs "Low Accuracy").
- [ ] **Emergency Button (SOS)**:
  - **Press & Hold**: Press and hold the large red "SOS" button.
  - **Feedback**: Feel the haptic feedback and see the visual progress ring.
  - **Activation**: After 3 seconds, verify:
    - Haptic success pattern plays.
    - SMS app opens with a pre-filled message containing:
      - "SOS! I need help!"
      - Google Maps Link
      - GPS Coordinates
      - Approximate Address
- [ ] **Quick Call Buttons**:
  - Verify buttons for your added contacts (e.g., "Mom") appear at the bottom.
  - Tap one. Verify it initiates a phone call to that number.

## 4. Error Handling & Resilience
*Target: Robustness in bad conditions*
- [ ] **Location Error**:
  - Disable Location Services (or simulate error).
  - Verify the Main Screen shows a red error icon and message.
  - Verify the "Retry" button appears.
- [ ] **Recovery**:
  - Re-enable Location Services.
  - Tap "Retry". Verify the location updates correctly.

## 5. Accessibility
*Target: Inclusive design*
- [ ] **VoiceOver / TalkBack**: Enable screen reader.
- [ ] **Navigation**: Swipe through elements. Verify clear labels:
  - "Emergency SOS Button. Double tap and hold..."
  - "Call [Name]..."
  - "Current Location: [Address]..."

## Conclusion
The QuickLine app is now fully functional, optimized, and verified. It meets all core requirements for a reliable emergency assistant.
