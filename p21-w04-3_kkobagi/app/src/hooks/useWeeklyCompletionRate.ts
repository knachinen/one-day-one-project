import { Habit, HabitRecord } from '@/types'
import { useState, useEffect } from 'react'
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, format } from 'date-fns'

interface WeeklyStats {
  rate: number;
  total: number;
  completed: number;
  totalToday: number; // New: to represent "금주 현황: 4개 중 2개 완료"
  completedToday: number; // New: to represent "금주 현황: 4개 중 2개 완료"
}

const useWeeklyCompletionRate = (habits: Habit[], records: HabitRecord[]) => {
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({ rate: 0, total: 0, completed: 0, totalToday: 0, completedToday: 0 });

  useEffect(() => {
    console.log("useWeeklyCompletionRate: habits changed", habits);
    console.log("useWeeklyCompletionRate: records changed", records);

    const today = new Date()
    const weekStart = startOfWeek(today, { weekStartsOn: 0 }) // Sunday
    const weekEnd = endOfWeek(today, { weekStartsOn: 0 })   // Saturday

    const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

    let totalPossibleHabits = 0
    let totalCompletedHabits = 0
    let totalPossibleHabitsToday = 0
    let completedHabitsToday = 0

    // todayISO variable was not used, now replaced by todayUTCISO inside loop for consistency

    daysOfWeek.forEach((day) => {
      const activeHabitsOnDay = habits.filter((h) =>
        h.repeat_days.includes(day.getDay()) // day.getDay() is local day of week
      )
      totalPossibleHabits += activeHabitsOnDay.length

      const dayUTCISO = day.toISOString().split('T')[0]; // UTC date string for this day in loop
      const completedOnDay = activeHabitsOnDay.filter((habit) =>
        records.some(
          (record) =>
            record.habit_id === habit.id &&
            record.check_date === dayUTCISO && // record.check_date is also UTC date string
            record.is_completed
        )
      )
      totalCompletedHabits += completedOnDay.length

      console.log(`  Day: ${format(day, 'yyyy-MM-dd')} (UTC: ${dayUTCISO}) - Active: ${activeHabitsOnDay.length}, Completed: ${completedOnDay.length}`);

      // Calculate for "today" specifically
      if (isSameDay(day, today)) {
          totalPossibleHabitsToday = activeHabitsOnDay.length;
          completedHabitsToday = completedOnDay.length;
      }
    })

    const rate = totalPossibleHabits === 0 ? 0 : Math.round((totalCompletedHabits / totalPossibleHabits) * 100);

    console.log("useWeeklyCompletionRate: Final Stats:", {
        rate: rate,
        total: totalPossibleHabits,
        completed: totalCompletedHabits,
        totalToday: totalPossibleHabitsToday,
        completedToday: completedHabitsToday
    });

    setWeeklyStats({
        rate: rate,
        total: totalPossibleHabits,
        completed: totalCompletedHabits,
        totalToday: totalPossibleHabitsToday,
        completedToday: completedHabitsToday
    });
  }, [habits, records])

  return weeklyStats
}

export default useWeeklyCompletionRate
