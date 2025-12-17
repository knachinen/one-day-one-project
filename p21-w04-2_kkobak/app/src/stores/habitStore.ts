import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Habit, HabitRecord } from '@/types'

interface HabitState {
  habits: Habit[]
  records: HabitRecord[]
  addHabit: (habit: Habit) => void
  updateHabit: (habit: Habit) => void
  deleteHabit: (habitId: string) => void
  addRecord: (record: HabitRecord) => void
  updateRecord: (record: HabitRecord) => void
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set) => ({
      habits: [],
      records: [],
      addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
      updateHabit: (habit) =>
        set((state) => ({
          habits: state.habits.map((h) => (h.id === habit.id ? habit : h)),
        })),
      deleteHabit: (habitId) =>
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== habitId),
        })),
      addRecord: (record) => set((state) => ({ records: [...state.records, record] })),
      updateRecord: (record) =>
        set((state) => ({
          records: state.records.map((r) => (r.id === record.id ? record : r)),
        })),
    }),
    {
      name: 'habit-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
