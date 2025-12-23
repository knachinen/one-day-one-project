import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, spacing, fontSize } from '../constants/theme';

export default function SquadScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>스쿼드</Text>
        <Text style={styles.subtitle}>그룹 탐색 및 관리</Text>
        <Text style={styles.comingSoon}>Coming Soon...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    paddingBottom: 110, // Tab bar height (80) + safe area + spacing
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
