# LexiClock Development Tasks

- [x] **Project Initialization** <!-- id: 0 -->
    - [x] Initialize Expo project with TypeScript <!-- id: 1 -->
    - [x] Install dependencies (Reanimated, Zustand, AsyncStorage, Expo Font, etc.) <!-- id: 2 -->
    - [x] Configure project structure (src/components, src/screens, src/utils, src/store) <!-- id: 3 -->

- [x] **Core Logic Implementation** <!-- id: 4 -->
    - [x] Implement `TimeConverter` utility (Hour to Char, Min/Sec to Base-26) <!-- id: 5 -->
    - [x] Write unit tests for conversion logic <!-- id: 6 -->

- [x] **UI Implementation - Phase 1 (Basic Display)** <!-- id: 7 -->
    - [x] Create `ClockText` component with custom fonts <!-- id: 8 -->
    - [x] Implement `MainScreen` layout (Minimalist, Dark mode) <!-- id: 9 -->
    - [x] Integrate `TimeConverter` to display real-time alphabet clock <!-- id: 10 -->

- [x] **UI Implementation - Phase 2 (Effects & Animation)** <!-- id: 11 -->
    - [x] Add Neon/Glow effects to text <!-- id: 12 -->
    - [x] Implement smooth transition animations using Reanimated <!-- id: 13 -->
    - [x] Add background effects (Swirl/Noise) <!-- id: 14 -->

- [x] **Feature Implementation** <!-- id: 15 -->
    - [x] Implement `Decode` feature (Overlay real time on tap/hold) <!-- id: 16 -->
    - [x] Create `SettingsScreen` (12/24h toggle, Color themes, Font selection) <!-- id: 17 -->
    - [x] Implement State Management (Zustand) for settings persistence <!-- id: 18 -->

- [ ] **Advanced Features** <!-- id: 19 -->
    - [ ] Implement Share functionality (Capture view -> Share) <!-- id: 20 -->
    - [ ] Research and Plan Widget implementation (Expo Config Plugin / Native Module) <!-- id: 21 -->
    - [ ] Implement Basic Widget (if feasible within scope) <!-- id: 22 -->

- [/] **Final Polish & Deployment Prep** <!-- id: 23 -->
    - [ ] App Icon & Splash Screen <!-- id: 24 -->
    - [x] Final QA & Bug Fixes <!-- id: 25 -->
