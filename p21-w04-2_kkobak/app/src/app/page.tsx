'use client'

import Link from 'next/link'
import HabitList from '@/components/HabitList'
import KkobagiCharacter from '@/components/KkobagiCharacter'
import HabitTree from '@/components/HabitTree'
import WeeklyChart from '@/components/WeeklyChart'
import { useHabitStore } from '@/stores/habitStore'
import { useEffect, useState } from 'react'
import useOverallDailyCompletionStreak from '@/hooks/useOverallDailyCompletionStreak'
import useWeeklyCompletionRate from '@/hooks/useWeeklyCompletionRate' // Import the new hook

export default function Home() {
  const { habits, records } = useHabitStore()
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [totalHabitsToday, setTotalHabitsToday] = useState(0)
  const [completedHabitsToday, setCompletedHabitsToday] = useState(0)
  const [habitsForToday, setHabitsForToday] = useState(habits)

  const activeHabits = habits.filter(h => h.is_active);

  const has7DayOverallStreak = useOverallDailyCompletionStreak(activeHabits, records)
  const weeklyCompletionRate = useWeeklyCompletionRate(activeHabits, records)

  // Notification permission logic
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (typeof Notification !== 'undefined') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  useEffect(() => {
    const today = new Date().getDay() // 0 for Sunday, 6 for Saturday
    const todayISO = new Date().toISOString().split('T')[0]

    const filteredHabits = activeHabits.filter((h) => h.repeat_days.includes(today))
    // Ensure uniqueness by ID to prevent React key errors
    const uniqueFilteredHabits = Array.from(new Map(filteredHabits.map(item => [item.id, item])).values());
    setHabitsForToday(uniqueFilteredHabits);

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
              weeklyCompletionRate={weeklyCompletionRate} // Pass weekly completion rate
            />

            <HabitList habits={habitsForToday} />
          </div>
          <div>
            <HabitTree
              completionPercentage={completionPercentage}
              completedHabitsToday={completedHabitsToday}
              has7DayOverallStreak={has7DayOverallStreak}
            />
            <div className="mt-4">
              <WeeklyChart habits={activeHabits} records={records} />
            </div>
          </div>
        </div>
      </main>
      <Link href="/history" className="fixed bottom-32 right-4 bg-blue-400 text-white p-4 rounded-full shadow-lg z-10">
        히스토리
      </Link>
      <Link href="/new-habit" className="fixed bottom-16 right-4 bg-yellow-400 text-white p-4 rounded-full shadow-lg z-10">
        + 습관 추가
      </Link>
    </div>
  )
}
