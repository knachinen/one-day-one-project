import { useHabitStore } from '@/stores/habitStore'
import { useState, useEffect } from 'react'

const useStreak = (habitId: string) => {
  const records = useHabitStore((state) => state.records)
  const [currentStreak, setCurrentStreak] = useState(0)

  useEffect(() => {
    const completedRecords = records
      .filter((r) => r.habit_id === habitId && r.is_completed)
      .map((r) => new Date(r.check_date))
      .sort((a, b) => b.getTime() - a.getTime())

    if (completedRecords.length === 0) {
      setCurrentStreak(0)
      return
    }

    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Check if the most recent record is today or yesterday
    const mostRecentRecord = completedRecords[0]
    const differenceInDays = (today.getTime() - mostRecentRecord.getTime()) / (1000 * 3600 * 24);

    if (differenceInDays > 1) {
      setCurrentStreak(0);
      return;
    }


    streak = 1;
    for (let i = 0; i < completedRecords.length - 1; i++) {
        const current = completedRecords[i];
        const next = completedRecords[i+1];
        const diff = (current.getTime() - next.getTime()) / (1000 * 3600 * 24);
        if (diff === 1) {
            streak++;
        } else {
            break;
        }
    }


    setCurrentStreak(streak)
  }, [habitId, records])

  return currentStreak
}

export default useStreak
