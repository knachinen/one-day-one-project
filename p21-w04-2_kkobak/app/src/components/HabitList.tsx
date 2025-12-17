'use client'

import { Habit } from '@/types'
import HabitCard from './HabitCard'

export default function HabitList({ habits }: { habits: Habit[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">오늘의 습관</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  )
}
