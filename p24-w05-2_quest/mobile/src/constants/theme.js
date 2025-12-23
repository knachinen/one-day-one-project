// Design tokens for Quest MVP

export const colors = {
  // Brand colors
  primary: '#66CC66',
  primaryDark: '#52A352',
  primaryLight: '#85D685',

  // Secondary colors
  secondary: '#FF7043',
  live: '#FF1744',
  success: '#4CAF50',
  error: '#EF5350',
  warning: '#FFA726',
  info: '#42A5F5',

  // Background colors
  background: '#F7F8F9',
  backgroundSecondary: '#F8F9FA',
  card: '#FFFFFF',

  // Text colors
  textPrimary: '#111111',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textDisabled: '#CCCCCC',
  textInverse: '#FFFFFF',

  // Status colors
  online: '#66CC66',
  offline: '#999999',

  // Border colors
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
