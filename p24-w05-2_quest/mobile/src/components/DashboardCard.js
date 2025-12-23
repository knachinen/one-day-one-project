import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { COLORS, spacing, fontSize, borderRadius, shadows } from '../constants/theme';

const DashboardCard = ({ studyTime = "00h 00m", progress = 0 }) => {
  // 시간을 숫자와 단위로 분리하여 렌더링
  const timeParts = studyTime.split(' '); // ["00h", "00m"]

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>오늘의 집중 시간</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>↗ +0%</Text>
        </View>
      </View>

      <View style={styles.timerContainer}>
        {/* 첫 번째 시간(h) 세트 */}
        <Text style={styles.timeNumber}>{timeParts[0].replace('h', '')}</Text>
        <Text style={styles.timeUnit}>h</Text>
        
        {/* 두 번째 분(m) 세트 */}
        <Text style={[styles.timeNumber, { marginLeft: 12 }]}>
          {timeParts[1].replace('m', '')}
        </Text>
        <Text style={styles.timeUnit}>m</Text>
      </View>

      <View style={styles.progressInfo}>
        <Text style={styles.progressLabel}>현재 진행 상황</Text>
        <Text style={styles.goalLabel}>목표: 05h 00m</Text>
      </View>

      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24, // 목업의 부드러운 라운드 반영
    padding: 24,
    marginHorizontal: 20,
    marginTop: 15,
    // 목업의 깊이감 있는 부드러운 그림자 설정
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: '#66CC66', // Quest Green
    fontSize: 12,
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline', // 숫자와 단위를 하단 기준으로 정렬
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  timeNumber: {
    fontSize: 44,
    fontWeight: '900', // Pretendard Extra-Bold 대응
    color: '#111',
    letterSpacing: -1,
  },
  timeUnit: {
    fontSize: 22,
    color: '#66CC66', // 목업처럼 단위에 포인트 컬러 적용 가능
    fontWeight: '700',
    marginLeft: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#999',
  },
  goalLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#66CC66',
    borderRadius: 5,
  },
});

export default DashboardCard;