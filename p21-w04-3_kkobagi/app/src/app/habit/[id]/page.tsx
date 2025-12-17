'use client'

import React, { useMemo } from 'react' // Import useMemo
import { useParams } from 'next/navigation'
import { useHabitStore } from '@/stores/habitStore'
import { HabitRecord } from '@/types'
import HabitTrendChart from '@/components/HabitTrendChart' // Import HabitTrendChart

export default function HabitDetailPage() {
  const params = useParams()
  const { id } = params
  const { habits, records, streaks } = useHabitStore()

  const habit = habits.find((h) => h.id === id)

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    if (!habit) return { totalChecks: 0, completionRate: 0, longestStreak: 0 };

    const habitRecords = records.filter(r => r.habit_id === habit.id);
    const totalChecks = habitRecords.filter(r => r.is_completed).length;
    const totalPossibleChecks = habitRecords.length;

    let completionRate = 0;
    if (totalPossibleChecks > 0) {
      completionRate = (totalChecks / totalPossibleChecks) * 100;
    }

    const habitStreakInfo = streaks.find((s) => s.habit_id === habit.id);
    const longestStreak = habitStreakInfo?.longest_streak || 0;

    return {
      totalChecks,
      completionRate: completionRate.toFixed(1),
      longestStreak,
    };
  }, [habit, records, streaks]);


  if (!habit) {
    return <div className="container mx-auto p-4">습관을 찾을 수 없습니다.</div>
  }

  const { totalChecks, completionRate, longestStreak } = summaryMetrics;


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{habit.name} 상세 통계</h1>
      <p>아이콘: {habit.icon}</p>
      <p>반복 요일: {habit.repeat_days.map(d => ['일', '월', '화', '수', '목', '금', '토'][d]).join(', ')}</p>

      {/* Summary Metrics */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">요약 지표</h2>
        <p>총 성공 횟수: {totalChecks}회</p>
        <p>평균 달성률: {completionRate}%</p>
        <p>최장 스트릭: {longestStreak}일</p>
      </div>

      {/* Trend Line Chart */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">트렌드 분석</h2>
        <HabitTrendChart habit={habit} records={records} days={7} />
        <HabitTrendChart habit={habit} records={records} days={30} />
      </div>
    </div>
  )
}
