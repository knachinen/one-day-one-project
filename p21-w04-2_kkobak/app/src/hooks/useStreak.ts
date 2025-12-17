import { useHabitStore } from '@/stores/habitStore'
import { useState, useEffect, useRef } from 'react' // Import useRef
import { Streak } from '@/types'
import { v4 as uuidv4 } from 'uuid'

const useStreak = (habitId: string) => {
  const records = useHabitStore((state) => state.records)
  const streaks = useHabitStore((state) => state.streaks)
  const addOrUpdateStreak = useHabitStore((state) => state.addOrUpdateStreak)
  const [currentStreak, setCurrentStreak] = useState(0)

  // Use refs to store the previous streak values to prevent unnecessary updates to Zustand store
  const prevCurrentStreakRef = useRef(0);
  const prevLongestStreakRef = useRef(0);

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayISO = today.toISOString().split('T')[0]

    const completedRecordsDates = records
      .filter((r) => r.habit_id === habitId && r.is_completed)
      .map((r) => new Date(r.check_date))
      .sort((a, b) => b.getTime() - a.getTime()) // Sort descending (most recent first)

    let calculatedCurrentStreak = 0
    let calculatedLongestStreak = 0

    if (completedRecordsDates.length > 0) {
      // --- Calculate Current Streak ---
      const mostRecentRecordDate = completedRecordsDates[0]
      const diffDaysFromToday = Math.round((today.getTime() - mostRecentRecordDate.getTime()) / (1000 * 3600 * 24));

      // A streak can only exist if the most recent completion was today or yesterday
      if (diffDaysFromToday <= 1) {
        calculatedCurrentStreak = 1
        for (let i = 0; i < completedRecordsDates.length - 1; i++) {
          const current = completedRecordsDates[i]
          const next = completedRecordsDates[i + 1]
          const diff = Math.round((current.getTime() - next.getTime()) / (1000 * 3600 * 24))
          if (diff === 1) { // If consecutive day
            calculatedCurrentStreak++
          } else {
            break // Streak broken
          }
        }
      } else {
        calculatedCurrentStreak = 0; // Most recent record is older than yesterday
      }

      // --- Calculate Longest Streak (across all history) ---
      let tempLongest = 0
      let tempCurrent = 0
      for (let i = 0; i < completedRecordsDates.length; i++) {
        if (i === 0) {
          tempCurrent = 1
        } else {
          const current = completedRecordsDates[i]
          const prev = completedRecordsDates[i - 1] // previous in the sorted list (which is chronologically later)
          const diff = Math.round((prev.getTime() - current.getTime()) / (1000 * 3600 * 24))
          if (diff === 1) {
            tempCurrent++
          } else {
            tempCurrent = 1 // Reset
          }
        }
        if (tempCurrent > tempLongest) {
          tempLongest = tempCurrent
        }
      }
      calculatedLongestStreak = tempLongest
    }

    const existingStreak = streaks.find((s) => s.habit_id === habitId)
    const newStreak: Streak = {
      id: existingStreak?.id || uuidv4(),
      habit_id: habitId,
      current_streak: calculatedCurrentStreak,
      // Longest streak should only ever increase
      longest_streak: Math.max(calculatedLongestStreak, existingStreak?.longest_streak || 0),
      last_check_date: todayISO,
    }

    // Only update Zustand store if streak values have actually changed
    if (
        newStreak.current_streak !== prevCurrentStreakRef.current ||
        newStreak.longest_streak !== prevLongestStreakRef.current
    ) {
        addOrUpdateStreak(newStreak);
        prevCurrentStreakRef.current = newStreak.current_streak;
        prevLongestStreakRef.current = newStreak.longest_streak;
    }
    
    setCurrentStreak(calculatedCurrentStreak)
  }, [habitId, records, streaks, addOrUpdateStreak])

  return currentStreak
}

export default useStreak
