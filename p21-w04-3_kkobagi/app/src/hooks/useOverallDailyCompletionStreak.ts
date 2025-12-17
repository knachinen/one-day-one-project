import { Habit, HabitRecord } from '@/types'
import { useState, useEffect } from 'react'

const useOverallDailyCompletionStreak = (habits: Habit[], records: HabitRecord[]) => {
  const [has7DayOverallStreak, setHas7DayOverallStreak] = useState(false)

  useEffect(() => {
    if (habits.length === 0) {
      setHas7DayOverallStreak(false)
      return
    }

    let consecutiveDays = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (let i = 0; i < 7; i++) {
      const targetDate = new Date(currentDate)
      targetDate.setDate(currentDate.getDate() - i)
      const targetDateISO = targetDate.toISOString().split('T')[0]

      // Filter habits that are active on this specific targetDate
      // This part is complex: it implies checking habit.repeat_days against targetDate.getDay()
      // For now, let's assume all habits are active every day for simplicity in this initial implementation.
      // A more robust solution would integrate habit.repeat_days logic here.
      const activeHabitsOnDate = habits.filter(h => h.is_active && h.repeat_days.includes(targetDate.getDay()));


      if (activeHabitsOnDate.length === 0) {
        // If there are no active habits on this day, consider it "completed"
        consecutiveDays++;
        continue;
      }

      const allActiveHabitsCompleted = activeHabitsOnDate.every((habit) =>
        records.some(
          (record) =>
            record.habit_id === habit.id &&
            record.check_date === targetDateISO &&
            record.is_completed
        )
      )

      if (allActiveHabitsCompleted) {
        consecutiveDays++
      } else {
        consecutiveDays = 0 // Streak broken
        break
      }
    }

    setHas7DayOverallStreak(consecutiveDays >= 7)
  }, [habits, records])

  return has7DayOverallStreak
}

export default useOverallDailyCompletionStreak
