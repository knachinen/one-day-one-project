import { Habit, HabitRecord } from '@/types'
import { eachDayOfInterval, format, subDays, isSameDay } from 'date-fns'

interface DailyCompletionData {
  date: string; // YYYY-MM-DD
  completion: number; // 0-100%
}

export const processHabitRecordsForChart = (
  habit: Habit,
  allRecords: HabitRecord[],
  days: number
): DailyCompletionData[] => {
  const data: DailyCompletionData[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = subDays(today, days - 1); // e.g., for 7 days, start 6 days ago

  const intervalDays = eachDayOfInterval({ start: startDate, end: today });

  intervalDays.forEach((day) => {
    const dayISO = format(day, 'yyyy-MM-dd');
    const recordsForDay = allRecords.filter(r => r.habit_id === habit.id && isSameDay(new Date(r.check_date), day));

    // Determine if habit was active on this day
    const wasHabitActive = habit.repeat_days.includes(day.getDay());

    let completion = 0;
    if (wasHabitActive) {
      const completedOnDay = recordsForDay.some(r => r.is_completed);
      completion = completedOnDay ? 100 : 0;
    }
    // If habit was not active on that day, it's neither completed nor failed. We can represent this as 0 or null.
    // For a line chart, 0 might be better than null to show no activity.

    data.push({
      date: dayISO,
      completion: completion,
    });
  });

  return data;
};
