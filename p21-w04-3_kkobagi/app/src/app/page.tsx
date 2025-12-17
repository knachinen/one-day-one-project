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
        <div className="flex items-center space-x-4">
          {/* Notification Icon (Bell) */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9.5c0-1.037-.168-2.05-.473-3.003A3.75 3.75 0 0015.75 4.5h-1.5a3.75 3.75 0 00-3.327 1.997l-.076.294m-3.954 9.424A5.97 5.97 0 018 10.5c0-1.75.615-3.35 1.649-4.634a5.96 5.96 0 012.39-1.921c.548-.152 1.096-.24 1.64-.241m.75 14.935v-1.725m-3.327 1.997l-.076.294a5.96 5.96 0 01-2.39 1.921c-.548.152-1.096.24-1.64.241m.75-14.935V4.725M7.757 17.082c-.593.593-.974 1.25-.974 1.918 0 .668.381 1.325.974 1.918S9.332 21 10.25 21s1.86-.381 2.453-.974.974-1.25.974-1.918c0-.668-.381-1.325-.974-1.918A4.49 4.49 0 0010.25 15c-.918 0-1.758.381-2.257.974z" />
            </svg>
          </button>
          {/* User Profile Icon */}
          <button className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
            {/* Using a placeholder initial for the user */}
            <span>M</span>
          </button>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column: KkobagiCharacter */}
          <div>
            <KkobagiCharacter
              completionPercentage={completionPercentage}
              totalHabitsToday={totalHabitsToday}
              completedHabitsToday={completedHabitsToday}
              weeklyCompletionRate={weeklyCompletionRate}
            />
          </div>
          {/* Middle Column: HabitList */}
          <div>
            <HabitList habits={habitsForToday} />
          </div>
          {/* Right Column: HabitTree and WeeklyChart */}
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
      {/* History Button */}
      <Link href="/history" className="fixed bottom-32 right-4 bg-white text-gray-800 p-4 rounded-full shadow-lg z-10 flex items-center justify-center space-x-2">
        <span role="img" aria-label="history-clock">⌚</span>
        <span>히스토리</span>
      </Link>
      {/* Add Habit Button (FAB) */}
      <Link href="/new-habit" className="fixed bottom-16 right-4 bg-yellow-400 text-white p-4 rounded-full shadow-lg z-10 flex items-center justify-center space-x-2">
        <span>+</span>
        <span>습관 추가</span>
      </Link>
    </div>
  )
}
