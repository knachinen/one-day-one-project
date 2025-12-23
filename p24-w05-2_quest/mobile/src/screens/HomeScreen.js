import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, spacing, fontSize, borderRadius, shadows } from '../constants/theme';
import DashboardCard from '../components/DashboardCard';

export default function HomeScreen() {
  // Placeholder for actual study data
  const [studyTime, setStudyTime] = useState('00h 00m');
  const [progress, setProgress] = useState(0);

  return (
    <View style={styles.container}>
      {/* New Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar} />
          <Text style={styles.headerText}>안녕하세요, 김알렉스님</Text>
        </View>
        <View style={styles.notificationIcon} />
      </View>

      {/* Dashboard Card */}
      <DashboardCard studyTime={studyTime} progress={progress} />

      {/* My Squads Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 스쿼드</Text>
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>Squad Card Placeholder</Text>
        </View>
      </View>

      {/* Announcements Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>공지사항</Text>
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>Announcement Card Placeholder</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.borderLight, // Using borderLight from extended COLORS
    marginRight: spacing.md,
  },
  headerText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: COLORS.TEXT_MAIN,
  },
  notificationIcon: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.borderLight, // Placeholder
    borderRadius: 12,
  },

  // New Sections
  section: {
    marginTop: spacing.xxxl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: COLORS.TEXT_MAIN,
    marginBottom: spacing.md,
  },
  placeholderCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    ...shadows.sm,
  },
  placeholderText: {
    fontSize: fontSize.base,
    color: COLORS.TEXT_SUB,
  },
});
