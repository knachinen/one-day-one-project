# UI Kitten Integration Plan

This plan outlines the steps to integrate UI Kitten into the `p01_w01-1` Expo project.

## 1. Create Documentation Files

- Create `p01_w01-1/doc/08_ui_kitten_plan.md` (this file)
- Create `p01_w01-1/doc/09_ui_kitten_checklist.md`

## 2. Install Dependencies

Install the necessary UI Kitten and Eva Design System packages, along with `react-native-svg` which is a peer dependency.

- `npm i @ui-kitten/components @eva-design/eva`
- `expo install react-native-svg@9.13.6` (for Expo projects)

## 3. Configure App.tsx

Wrap the root `App` component with `ApplicationProvider` to enable UI Kitten. This involves importing the necessary components and setting up the theme and icon pack.

- Import `ApplicationProvider`, `IconRegistry`, `EvaIconsPack` from UI Kitten.
- Import `*as Eva from '@eva-design/eva'` for themes.
- Wrap the main `App` component with `<IconRegistry icons={EvaIconsPack} />` and then `<ApplicationProvider {...Eva.mapping} theme={Eva.light}>`.

## 4. Restart Metro Bundler

After making changes to dependencies and configuration, restart the Metro bundler with a cleared cache to ensure all changes are picked up correctly.

- `npm start -- --reset-cache`

## 5. UI Kitten 컴포넌트로 UI 디자인

기존의 React Native 컴포넌트들을 UI Kitten 컴포넌트들로 교체하여 앱의 UI를 디자인합니다.

- **`App.tsx` 수정:**
  - `Layout`, `UIKittenText` (Text와 충돌 방지), `Input`, `UIKittenButton` (Button과 충돌 방지), `Spinner`를 `@ui-kitten/components`에서 임포트합니다.
  - `View` 컴포넌트들을 `Layout`으로 교체하고 필요에 따라 스타일을 조정합니다.
  - `Text` 컴포넌트들을 `UIKittenText`로 교체합니다.
  - `TextInput` 컴포넌트들을 `Input`으로 교체합니다.
  - `Button` 컴포넌트들을 `UIKittenButton`으로 교체합니다.
  - `ActivityIndicator` 컴포넌트들을 `Spinner`로 교체합니다.
  - `SavedFilesList` 컴포넌트에서 `styles` prop을 제거하고, `SavedFilesList` 내부에서 UI Kitten 컴포넌트를 사용하도록 추후 수정합니다.
- **`src/styles/AppStyles.ts` 수정:**
  - UI Kitten 컴포넌트의 스타일링 규칙에 맞게 기존 스타일을 조정하거나, UI Kitten의 내장 스타일링 기능을 활용하도록 변경합니다.

This plan will be followed step-by-step, with each step being verified upon completion.