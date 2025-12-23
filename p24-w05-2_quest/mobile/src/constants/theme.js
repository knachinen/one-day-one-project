// Design tokens for Quest MVP

export const COLORS = {
  PRIMARY: '#66CC66',     // Quest Green
  BACKGROUND: '#F7F8F9',  // 연한 회색 배경
  WHITE: '#FFFFFF',
  TEXT_MAIN: '#111111',   // 타이머 숫자
  TEXT_SUB: '#999999',    // 단위 및 보조 텍스트
  PROGRESS_BG: '#E0E0E0', // 진행 바 배경

  // Additional existing colors
  primaryDark: '#52A352',
  primaryLight: '#85D685',
  secondary: '#FF7043',
  live: '#FF1744',
  success: '#4CAF50',
  error: '#EF5350',
  warning: '#FFA726',
  info: '#42A5F5',
  backgroundSecondary: '#F8F9FA',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textDisabled: '#CCCCCC',
  textInverse: '#FFFFFF',
  online: '#66CC66',
  offline: '#999999',
  border: '#DDDDDD',
  borderLight: '#E8E8E8',
  borderStrong: '#CCCCCC',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  huge: 36,
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const borderRadius = {
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};