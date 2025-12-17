'use client'

import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Habit, HabitRecord } from '@/types'
import useWeeklyCompletionRate from '@/hooks/useWeeklyCompletionRate'

interface WeeklyChartProps {
  habits: Habit[]
  records: HabitRecord[]
}

const COLORS = ['#8884d8', '#eeeeee']

export default function WeeklyChart({ habits, records }: WeeklyChartProps) {
  const weeklyCompletionRate = useWeeklyCompletionRate(habits, records)

  const data = [
    { name: 'Completed', value: weeklyCompletionRate },
    { name: 'Remaining', value: 100 - weeklyCompletionRate },
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2">이번 주 달성률</h3>
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          fill="#8884d8"
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
    </div>
  )
}
