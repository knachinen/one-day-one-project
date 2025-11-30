/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  // Custom Reflectly Colors
  background: '#F8F6F4',
  cardBackground: '#FFFFFF',

  // 주요 색상
  primary: '#A8D5BA',      // 민트 그린
  secondary: '#E8B4B8',    // 로즈 핑크
  accent: '#C9B8E8',       // 라벤더

  // 감정 색상
  emotions: {
    happy: '#FFE66D',      // 밝은 노랑
    excited: '#FF6B6B',    // 코랄
    calm: '#A8D5BA',       // 민트
    anxious: '#C9B8E8',    // 라벤더
    sad: '#95B8D1',        // 소프트 블루
  },

  // 텍스트
  text: {
    primary: '#2D3436',
    secondary: '#636E72',
    disabled: '#B2BEC3',
  },

  // 시스템
  border: '#DFE6E9',
  shadow: 'rgba(0, 0, 0, 0.08)',
};
