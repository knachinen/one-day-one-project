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
  - [x] `App.tsx`: 웹 주소 입력 필드 주석 처리.
  - [x] `App.tsx`: 앱 이름 (`1일 1코딩 - p01_w01-1`) 텍스트 주석 처리.
  - [x] `App.tsx`: '단어 가져오기' 버튼이 `randomWord` 또는 로딩 스피너를 표시하도록 수정.
  - [x] `App.tsx`: `randomWord`를 표시하던 별도의 `UIKittenText` 제거.
  - [x] `App.tsx`: 앱 시작 시 (isReady 이후) `fetchRandomWord` 자동 호출.
  - [x] `src/styles/AppStyles.ts`: UI Kitten 스타일링에 맞게 조정 (Eva Design System 기반 색상 팔레트 적용).
  - [x] `App.tsx`: `UIKittenText`에 `category` prop 적용.
  - [x] `App.tsx`: `Input`에 `size` 및 `status` prop 적용.
  - [x] `App.tsx`: `UIKittenButton`에 `size` 및 `status` prop 적용.
  - [x] `App.tsx`: `Layout`에 `level` prop 적용.
  - [x] `src/components/SavedFilesList.tsx`: Eva Design System 기반의 색상 팔레트 적용.
  - [x] `src/components/SavedFilesList.tsx`: `ListItem`에 `size` 및 `status` prop 적용.
  - [x] `src/components/SavedFilesList.tsx`: `Layout`에 `level` prop 적용.
