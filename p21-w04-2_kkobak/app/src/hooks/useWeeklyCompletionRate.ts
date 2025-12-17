import { Habit, HabitRecord } from '@/types'
import { useState, useEffect } from 'react'
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns'

const useWeeklyCompletionRate = (habits: Habit[], records: HabitRecord[]) => {
  const [weeklyCompletionRate, setWeeklyCompletionRate] = useState(0)

  useEffect(() => {
    const today = new Date()
    const weekStart = startOfWeek(today, { weekStartsOn: 0 }) // Sunday
    const weekEnd = endOfWeek(today, { weekStartsOn: 0 })   // Saturday

    const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

    let totalPossibleHabits = 0
    let totalCompletedHabits = 0

    daysOfWeek.forEach((day) => {
      const activeHabitsOnDay = habits.filter((h) =>
        h.repeat_days.includes(day.getDay())
      )
      totalPossibleHabits += activeHabitsOnDay.length

      const dayISO = day.toISOString().split('T')[0];
      const completedOnDay = activeHabitsOnDay.filter((habit) =>
        records.some(
          (record) =>
            record.habit_id === habit.id &&
            record.check_date === dayISO &&
            record.is_completed
        )
      )
      totalCompletedHabits += completedOnDay.length
    })

    if (totalPossibleHabits === 0) {
      setWeeklyCompletionRate(0)
      return
    }

    const rate = Math.round((totalCompletedHabits / totalPossibleHabits) * 100)
    setWeeklyCompletionRate(rate)
  }, [habits, records])

  return weeklyCompletionRate
}

export default useWeeklyCompletionRate
