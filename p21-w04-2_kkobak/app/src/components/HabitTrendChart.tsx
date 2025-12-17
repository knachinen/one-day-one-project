'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { processHabitRecordsForChart } from '@/utils/chartUtils'
import { Habit, HabitRecord } from '@/types'

interface HabitTrendChartProps {
  habit: Habit
  records: HabitRecord[]
  days: number // 7 or 30
}

export default function HabitTrendChart({
  habit,
  records,
  days,
}: HabitTrendChartProps) {
  const data = processHabitRecordsForChart(habit, records, days)

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-bold mb-2">
        최근 {days}일 달성률 트렌드
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(tick) => tick.slice(5)} /> {/* Show only MM-DD */}
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="completion"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
