'use client'

import { useHabitStore } from '@/stores/habitStore'
import HabitCard from './HabitCard'
import { useEffect, useState } from 'react'

export default function HabitList() {
  const habits = useHabitStore((state) => state.habits)
  const [todayHabits, setTodayHabits] = useState(habits)

  useEffect(() => {
    const today = new Date().getDay()
    setTodayHabits(habits.filter((h) => h.repeat_days.includes(today)))
  }, [habits])


  return (
    <div>
      <h2 className="text-xl font-bold mb-2">오늘의 습관</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {todayHabits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  )
}
