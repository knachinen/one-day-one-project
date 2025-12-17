export type Habit = {
  id: string
  name: string
  icon: string
  repeat_days: number[] // 0 = Sunday, 6 = Saturday
  notification_time?: string
  target_period?: number // in days
  frequency?: number // e.g., 1 time per day
  is_active: boolean
  created_at: string
}

export type HabitRecord = {
  id: string
  habit_id: string
  check_date: string
  is_completed: boolean
  completed_at?: string
}

export type Streak = {
  id: string
  habit_id: string
  current_streak: number
  longest_streak: number
  last_check_date: string
}
