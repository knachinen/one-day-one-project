import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#BB86FC',
  secondary: '#03DAC6',
  text: '#E1E1E1',
  textSecondary: '#A0A0A0',
  border: '#333333',
  danger: '#CF6679',
};

export const COMMON_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  glassContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  text: {
    color: COLORS.text,
    fontSize: 16,
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
