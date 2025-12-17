'use client'

import React from 'react'
import { Habit, HabitRecord } from '@/types'
import { useHabitStore } from '@/stores/habitStore'
import { isPast, differenceInCalendarDays } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

interface SelectedDayHabitsProps {
  selectedDate: Date
  habits: Habit[]
  records: HabitRecord[]
}

export default function SelectedDayHabits({
  selectedDate,
  habits,
  records,
}: SelectedDayHabitsProps) {
  const { addRecord, updateRecord } = useHabitStore()
  const selectedDateISO = selectedDate.toISOString().split('T')[0]
  const today = new Date();
  today.setHours(0,0,0,0); // Normalize today for comparison

  const isEditable = !isPast(selectedDate) || differenceInCalendarDays(today, selectedDate) <= 30;

  const habitsForSelectedDay = habits.filter((h) =>
    h.repeat_days.includes(selectedDate.getDay())
  )

  const handleToggleCompletion = (habit: Habit) => {
    if (!isEditable) return;

    const existingRecord = records.find(
      (r) => r.habit_id === habit.id && r.check_date === selectedDateISO
    )

    if (existingRecord) {
      updateRecord({
        ...existingRecord,
        is_completed: !existingRecord.is_completed,
        completed_at: !existingRecord.is_completed ? new Date().toISOString() : undefined,
      })
    } else {
      addRecord({
        id: uuidv4(),
        habit_id: habit.id,
        check_date: selectedDateISO,
        is_completed: true,
        completed_at: new Date().toISOString(),
      })
    }
  }

  return (
    <div className="mt-8 p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {selectedDate.toLocaleDateString()}의 습관
      </h2>
      {!isEditable && (
          <p className="text-sm text-red-500 mb-4">
              30일이 지난 기록은 수정할 수 없습니다.
          </p>
      )}
      {habitsForSelectedDay.length === 0 ? (
        <p>선택된 날짜에 활동 중인 습관이 없습니다.</p>
      ) : (
        habitsForSelectedDay.map((habit) => {
          const isCompleted = records.some(
            (r) =>
              r.habit_id === habit.id &&
              r.check_date === selectedDateISO &&
              r.is_completed
          )
          return (
            <div
              key={habit.id}
              className="flex items-center justify-between p-2 mb-2 bg-gray-50 rounded-md"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-2">{habit.icon}</span>
                <span>{habit.name}</span>
              </div>
              <button
                onClick={() => handleToggleCompletion(habit)}
                disabled={!isEditable}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-400'
                } ${!isEditable && 'opacity-50 cursor-not-allowed'}`}
              >
                {isCompleted && <span className="text-white">✔</span>}
              </button>
            </div>
          )
        })
      )}
    </div>
  )
}
