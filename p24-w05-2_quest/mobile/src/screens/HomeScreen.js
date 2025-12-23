import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize, borderRadius, shadows } from '../constants/theme';
import { testConnection } from '../api/config';

export default function HomeScreen() {
  const [connectionStatus, setConnectionStatus] = useState('testing');
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setConnectionStatus('testing');
    const result = await testConnection();

    if (result.success) {
      setConnectionStatus('connected');
      setServerData(result.data);
    } else {
      setConnectionStatus('error');
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'testing':
        return '🔄';
      case 'connected':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '⚪';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'testing':
        return 'Connecting to server...';
      case 'connected':
        return 'Connected to server!';
      case 'error':
        return 'Connection failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quest</Text>
        <Text style={styles.subtitle}>목표 달성형 학습 메신저</Text>
      </View>

      {/* Dashboard Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>오늘의 학습</Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>00h 00m</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>+0%</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '0%' }]} />
          </View>
          <Text style={styles.goalText}>목표: 05h 00m</Text>
        </View>
      </View>

      {/* Connection Status Card */}
      <View style={styles.statusCard}>
        <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
        <Text style={styles.statusText}>{getStatusText()}</Text>

        {connectionStatus === 'connected' && serverData && (
          <Text style={styles.statusDetail}>
            {serverData.message}
          </Text>
        )}

        {connectionStatus === 'error' && (
          <TouchableOpacity style={styles.retryButton} onPress={checkConnection}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Info Text */}
      <Text style={styles.infoText}>
        MVP 개발 중입니다 🚀
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSize.huge,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
  },

  // Dashboard card
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.base,
  },
  cardTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  timerText: {
    fontSize: fontSize.huge,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginRight: spacing.md,
  },
  badge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.base,
  },
  badgeText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textInverse,
  },

  // Progress bar
  progressContainer: {
    marginTop: spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  goalText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'right',
  },

  // Status card
  statusCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.base,
  },
  statusIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  statusText: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  statusDetail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.base,
  },
  retryButtonText: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.textInverse,
  },

  infoText: {
    fontSize: fontSize.sm,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
