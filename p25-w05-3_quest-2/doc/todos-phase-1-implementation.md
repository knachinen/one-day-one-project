# To-Do List: Phase 1 Feature Implementation

This list outlines the steps to implement the features described in `doc/phase-1.md`.

## Tasks:

### Project Setup
- [x] Verify React Native CLI setup (currently Expo, ensure compatibility).
- [x] Verify TypeScript setup (already complete).
- [x] Choose and install styling library (e.g., `styled-components` or `Tailwind CSS (NativeWind)`).

### Theme and Constants Definition
- [x] Define global color palette as constants.
- [x] Apply Pretendard font asset.

### Navigation Structure Design
- [x] Create placeholder screens for "Stats", "Squad", and "MY" (Profile).
- [ ] Integrate all 4 screens (Home, Stats, Squad, MY) into `MainTabNavigator`.

### Main Tab Bar Detailed Implementation
- [ ] Implement tab bar layout (height, background, border/shadow).
- [ ] Implement tab icon styles (line icons, active/inactive colors, filled icons).
- [ ] Implement central Start Floating Action Button (FAB) (circular, floating, green background, white play icon, shadow).

### Screen Skeleton Configuration
- [ ] Refine Home Screen structure based on design (top profile bar, dashboard cards).
- [ ] Implement 'My Squad' title layout on Squad Screen.

### Technical Notes (Ongoing considerations)
- [ ] Ensure Safe Area handling for all screens.
- [ ] Manage Z-Index for floating elements (e.g., FAB).
- [ ] Implement interactive feedback for button clicks.

### Verification Points (from doc/phase-1.md)
- [ ] App launches with bottom tab bar correctly.
- [ ] 4개의 탭을 클릭했을 때 각 화면(Home, Stats, Squad, MY)으로 부드럽게 전환되는가?
- [ ] 중앙의 시작 버튼이 디자인대로 탭바 중앙에 플로팅되어 있는가?
