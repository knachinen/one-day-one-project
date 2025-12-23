import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, spacing, fontSize, borderRadius, shadows } from '../constants/theme';

const SquadCard = ({ squad, onPress }) => {
  const { name, memberCount, onlineCount, totalStudyTime, emoji } = squad;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.onlineBadge}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>{onlineCount}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{memberCount}</Text>
          <Text style={styles.statLabel}>멤버</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalStudyTime}</Text>
          <Text style={styles.statLabel}>오늘 총 학습시간</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: COLORS.TEXT_MAIN,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.base,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.online,
    marginRight: 4,
  },
  onlineText: {
    fontSize: fontSize.sm,
    color: COLORS.online,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: COLORS.TEXT_MAIN,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: COLORS.TEXT_SUB,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: spacing.md,
  },
});

export default SquadCard;
