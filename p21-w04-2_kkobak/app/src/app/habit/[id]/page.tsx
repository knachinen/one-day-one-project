'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useHabitStore } from '@/stores/habitStore'

export default function HabitDetailPage() {
  const params = useParams()
  const { id } = params
  const { habits } = useHabitStore()

  const habit = habits.find((h) => h.id === id)

  if (!habit) {
    return <div className="container mx-auto p-4">습관을 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{habit.name} 상세 통계</h1>
      <p>아이콘: {habit.icon}</p>
      <p>반복 요일: {habit.repeat_days.map(d => ['일', '월', '화', '수', '목', '금', '토'][d]).join(', ')}</p>

      {/* Summary Metrics will go here */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">요약 지표</h2>
        {/* Placeholder for Total Successful Checks, Average Completion Rate, Longest Streak */}
        <p>총 성공 횟수: (구현 예정)</p>
        <p>평균 달성률: (구현 예정)</p>
        <p>최장 스트릭: (구현 예정)</p>
      </div>

      {/* Trend Line Chart will go here */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">트렌드 분석</h2>
        {/* Placeholder for 7-day and 30-day trend charts */}
        <p>최근 7일 달성률 차트: (구현 예정)</p>
        <p>최근 30일 달성률 차트: (구현 예정)</p>
      </div>
    </div>
  )
}
