import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, spacing, fontSize } from '../constants/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY</Text>
      <Text style={styles.subtitle}>개인 설정</Text>
      <Text style={styles.comingSoon}>Coming Soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: COLORS.TEXT_MAIN,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: COLORS.textSecondary,
    marginBottom: spacing.xl,
  },
  comingSoon: {
    fontSize: fontSize.base,
    color: COLORS.TEXT_SUB,
  },
});
