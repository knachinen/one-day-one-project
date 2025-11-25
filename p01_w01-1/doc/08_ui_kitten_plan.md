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

This plan will be followed step-by-step, with each step being verified upon completion.