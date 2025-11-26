import { StyleSheet } from 'react-native';

export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  danger: string;
  glass: string;
  glassBorder: string;
  statusBar: 'light-content' | 'dark-content';
}

export const THEMES: Record<ThemeMode, ThemeColors> = {
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#BB86FC',
    secondary: '#03DAC6',
    text: '#E1E1E1',
    textSecondary: '#A0A0A0',
    border: '#333333',
    danger: '#CF6679',
    glass: 'rgba(30, 30, 30, 0.8)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    statusBar: 'light-content',
  },
  light: {
    background: '#F5F5F5',
    surface: '#FFFFFF',
    primary: '#6200EE',
    secondary: '#03DAC6',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E0E0E0',
    danger: '#B00020',
    glass: 'rgba(255, 255, 255, 0.9)',
    glassBorder: 'rgba(0, 0, 0, 0.05)',
    statusBar: 'dark-content',
  },
};

export const createCommonStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  glassContainer: {
    backgroundColor: colors.glass,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
