import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, spacing, fontSize, borderRadius, shadows } from '../constants/theme';
import DashboardCard from '../components/DashboardCard';
import SquadCard from '../components/SquadCard';
import AnnouncementCard from '../components/AnnouncementCard';
import { getMySquads } from '../api/squads';
import { getAnnouncements } from '../api/announcements';

export default function HomeScreen() {
  // Placeholder for actual study data
  const [studyTime, setStudyTime] = useState('00h 00m');
  const [progress, setProgress] = useState(0);

  // Data from backend
  const [mySquads, setMySquads] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch squads and announcements in parallel
      const [squadsData, announcementsData] = await Promise.all([
        getMySquads(),
        getAnnouncements(),
      ]);

      setMySquads(squadsData);
      setAnnouncements(announcementsData);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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

      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          <Text style={styles.loadingText}>데이터 로딩 중...</Text>
        </View>
      )}

      {/* Error State */}
      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* My Squads Section */}
      {!loading && !error && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내 스쿼드</Text>
          {mySquads.length > 0 ? (
            mySquads.map((squad) => (
              <SquadCard
                key={squad.id}
                squad={squad}
                onPress={() => console.log(`Squad ${squad.name} pressed`)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>가입한 스쿼드가 없습니다.</Text>
          )}
        </View>
      )}

      {/* Announcements Section */}
      {!loading && !error && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>공지사항</Text>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onPress={() => console.log(`Announcement ${announcement.title} pressed`)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>공지사항이 없습니다.</Text>
          )}
        </View>
      )}
      </ScrollView>
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
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: 110, // Tab bar height (80) + safe area + spacing
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

  // Sections
  section: {
    marginTop: spacing.xxxl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: COLORS.TEXT_MAIN,
    marginBottom: spacing.md,
  },

  // Loading State
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.base,
    color: COLORS.TEXT_SUB,
  },

  // Error State
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  errorText: {
    fontSize: fontSize.base,
    color: COLORS.error,
    textAlign: 'center',
  },

  // Empty State
  emptyText: {
    fontSize: fontSize.base,
    color: COLORS.TEXT_SUB,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
