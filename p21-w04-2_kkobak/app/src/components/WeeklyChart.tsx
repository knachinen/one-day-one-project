'use client'

import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Habit, HabitRecord } from '@/types'
import useWeeklyCompletionRate from '@/hooks/useWeeklyCompletionRate'

interface WeeklyChartProps {
  habits: Habit[]
  records: HabitRecord[]
}

const COLORS = ['#FFEB3B', '#E0E0E0'] // Changed to yellow and light gray

export default function WeeklyChart({ habits, records }: WeeklyChartProps) {
  const weeklyCompletionRate = useWeeklyCompletionRate(habits, records)

  const data = [
    { name: 'Completed', value: weeklyCompletionRate },
    { name: 'Remaining', value: 100 - weeklyCompletionRate },
  ]

  // Hardcoded placeholders for detailed text based on design example
  const totalWeeklyHabits = 14;
  const completedWeeklyHabits = 10;
  const totalHabitsToday = 4; // Assuming from design "금주 현황: 4개 중 2개 완료"
  const completedHabitsToday = 2; // Assuming from design "금주 현황: 4개 중 2개 완료"

  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative"> {/* Added relative for absolute positioning */}
      <h3 className="text-lg font-bold mb-2">이번 주 달성률</h3>
      {/* "금주 현황" - top right */}
      <p className="absolute top-2 right-2 text-xs text-gray-400">
        금주 현황: {totalHabitsToday}개 중 {completedHabitsToday}개 완료
      </p>
      <div className="flex flex-col items-center"> {/* Centering the chart and main percentage */}
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill="#FFEB3B" // Fill for the completed portion
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <p className="mt-2 text-xl font-bold">{weeklyCompletionRate}%</p>
        <p className="text-sm text-gray-600">총 {totalWeeklyHabits}건 중 {completedWeeklyHabits}건 완료했어요!</p>
      </div>
    </div>
  )
}
