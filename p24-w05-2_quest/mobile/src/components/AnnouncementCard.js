import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, spacing, fontSize, borderRadius, shadows } from '../constants/theme';

const AnnouncementCard = ({ announcement, onPress }) => {
  const { title, content, date, isNew } = announcement;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newText}>NEW</Text>
          </View>
        )}
      </View>
      <Text style={styles.content} numberOfLines={2}>
        {content}
      </Text>
      <Text style={styles.date}>{date}</Text>
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
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: COLORS.TEXT_MAIN,
    flex: 1,
  },
  newBadge: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  newText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  content: {
    fontSize: fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  date: {
    fontSize: fontSize.xs,
    color: COLORS.TEXT_SUB,
  },
});

export default AnnouncementCard;
