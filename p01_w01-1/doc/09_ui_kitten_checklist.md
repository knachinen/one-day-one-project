# UI Kitten Integration Checklist

This checklist tracks the progress of integrating UI Kitten into the `p01_w01-1` Expo project.

- [x] 1. Create documentation files (plan and checklist).
- [x] 2. Install UI Kitten core dependencies: `@ui-kitten/components` and `@eva-design/eva`.
- [x] 3. Install `react-native-svg`: `expo install react-native-svg@9.13.6`.
- [x] 4. Configure `App.tsx` by importing `ApplicationProvider`, `IconRegistry`, `EvaIconsPack` and wrapping the root component.
- [x] 5. Restart the Metro bundler with cache cleared: `npm start -- --reset-cache`.
- [x] 6. UI Kitten 컴포넌트로 UI 디자인:
  - [x] `App.tsx`: `Layout`, `UIKittenText`, `Input`, `UIKittenButton`, `Spinner` 임포트 추가.
  - [x] `App.tsx`: `View` 컴포넌트들을 `Layout`으로 교체.
  - [x] `App.tsx`: `Text` 컴포넌트들을 `UIKittenText`로 교체.
  - [x] `App.tsx`: `TextInput` 컴포넌트들을 `Input`으로 교체.
  - [x] `App.tsx`: `Button` 컴포넌트들을 `UIKittenButton`으로 교체.
  - [x] `App.tsx`: `ActivityIndicator` 컴포넌트들을 `Spinner`로 교체.
  - [x] `App.tsx`: `SavedFilesList` 컴포넌트의 `styles` prop 제거.
  - [x] `src/styles/AppStyles.ts`: UI Kitten 스타일링에 맞게 조정.
