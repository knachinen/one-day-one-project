import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Habit, HabitRecord, Streak } from '@/types' // Import Streak type

interface HabitState {
  habits: Habit[]
  records: HabitRecord[]
  streaks: Streak[] // Add streaks array
  addHabit: (habit: Habit) => void
  updateHabit: (habit: Habit) => void
  softDeleteHabit: (habitId: string) => void
  addRecord: (record: HabitRecord) => void
  updateRecord: (record: HabitRecord) => void
  addOrUpdateStreak: (streak: Streak) => void // Add action to add or update streak
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      records: [],
      streaks: [], // Initialize streaks
      addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
      updateHabit: (habit) =>
        set((state) => ({
          habits: state.habits.map((h) => (h.id === habit.id ? h : habit)),
        })),
      softDeleteHabit: (habitId) =>
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === habitId ? { ...h, is_active: false } : h
          ),
        })),
      addRecord: (record) => set((state) => ({ records: [...state.records, record] })),
      updateRecord: (record) =>
        set((state) => ({
          records: state.records.map((r) => (r.id === record.id ? record : r)),
        })),
      addOrUpdateStreak: (streak) =>
        set((state) => {
          const existingStreakIndex = state.streaks.findIndex(
            (s) => s.habit_id === streak.habit_id
          )
          if (existingStreakIndex > -1) {
            const updatedStreaks = [...state.streaks]
            updatedStreaks[existingStreakIndex] = streak
            return { streaks: updatedStreaks }
          } else {
            return { streaks: [...state.streaks, streak] }
          }
        }),
    }),
    {
      name: 'habit-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
