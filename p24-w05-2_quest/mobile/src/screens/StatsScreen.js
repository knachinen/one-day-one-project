import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, spacing, fontSize } from '../constants/theme';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>통계</Text>
      <Text style={styles.subtitle}>학습 데이터 분석</Text>
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
