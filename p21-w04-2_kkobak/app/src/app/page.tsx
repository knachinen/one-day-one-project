'use client'

import Link from 'next/link'
import HabitList from '@/components/HabitList'
import KkobagiCharacter from '@/components/KkobagiCharacter'
import HabitTree from '@/components/HabitTree' // Import HabitTree
import { useHabitStore } from '@/stores/habitStore'
import { useEffect, useState } from 'react'

export default function Home() {
  const { habits, records } = useHabitStore()
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [totalHabitsToday, setTotalHabitsToday] = useState(0)
  const [completedHabitsToday, setCompletedHabitsToday] = useState(0)
  const [habitsForToday, setHabitsForToday] = useState(habits)

  useEffect(() => {
    const today = new Date().getDay() // 0 for Sunday, 6 for Saturday
    const todayISO = new Date().toISOString().split('T')[0]

    const filteredHabits = habits.filter((h) => h.repeat_days.includes(today))
    setHabitsForToday(filteredHabits);

    const total = filteredHabits.length
    setTotalHabitsToday(total)

    if (total === 0) {
      setCompletionPercentage(0)
      setCompletedHabitsToday(0);
      return
    }

    const completed = filteredHabits.filter((h) =>
      records.some((r) => r.habit_id === h.id && r.check_date === todayISO && r.is_completed)
    ).length
    setCompletedHabitsToday(completed)

    setCompletionPercentage(Math.round((completed / total) * 100))
  }, [habits, records])


  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kkobagi</h1>
        {/* User profile icon can go here */}
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <KkobagiCharacter
              completionPercentage={completionPercentage}
              totalHabitsToday={totalHabitsToday}
              completedHabitsToday={completedHabitsToday}
            />

            <HabitList habits={habitsForToday} />
          </div>
          <div>
            <HabitTree
              completionPercentage={completionPercentage}
              completedHabitsToday={completedHabitsToday} // Pass completedHabitsToday
            />
            {/* "Weekly Achievement" can go here */}
          </div>
        </div>
      </main>
      <Link href="/new-habit" className="fixed bottom-16 right-4 bg-yellow-400 text-white p-4 rounded-full shadow-lg">
        + 습관 추가
      </Link>
    </div>
  )
}
