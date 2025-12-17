import { useHabitStore } from '@/stores/habitStore'
import { useState, useEffect } from 'react'

const useStreak = (habitId: string) => {
  const records = useHabitStore((state) => state.records)
  const [currentStreak, setCurrentStreak] = useState(0)

  useEffect(() => {
    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0) // Normalize to start of day

    while (true) {
      const targetDate = currentDate.toISOString().split('T')[0]
      const recordForDate = records.find(
        (r) => r.habit_id === habitId && r.check_date === targetDate
      )

      if (recordForDate && recordForDate.is_completed) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1) // Move to previous day
      } else {
        // If there's a record for today but it's not completed, streak is 0
        // If there's no record for today and it's not the past, streak is 0
        // If there's no record for a past day, streak breaks
        if (streak > 0 && targetDate !== new Date().toISOString().split('T')[0]) { // Allow today to be uncompleted without breaking past streak
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(0,0,0,0);
            if (currentDate.getTime() < yesterday.getTime()) { // Only break if a past day was missed
                break;
            }
        } else if (streak === 0 && targetDate === new Date().toISOString().split('T')[0] && recordForDate && !recordForDate.is_completed) {
            streak = 0; // Today is not completed, so current streak is 0
        } else {
            break;
        }
      }
    }
    setCurrentStreak(streak)
  }, [habitId, records])

  return currentStreak
}

export default useStreak
