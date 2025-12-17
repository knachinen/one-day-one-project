'use client'

import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useHabitStore } from '@/stores/habitStore'
import SelectedDayHabits from '@/components/SelectedDayHabits'
import { isSameDay, format } from 'date-fns'

export default function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const { habits, records } = useHabitStore()

  const getDayStatus = (day: Date) => {
    const dayISO = day.toISOString().split('T')[0]
    const habitsForDay = habits.filter(h => h.repeat_days.includes(day.getDay()));

    if (habitsForDay.length === 0) {
      return 'no-habit'; // No active habits for this day
    }

    const completedHabits = habitsForDay.filter(habit =>
      records.some(record =>
        record.habit_id === habit.id &&
        record.check_date === dayISO &&
        record.is_completed
      )
    );

    if (completedHabits.length === habitsForDay.length) {
      return 'success'; // All active habits completed
    } else if (completedHabits.length > 0) {
      return 'partial-success'; // Some habits completed
    } else {
      return 'failure'; // No habits completed or some missed
    }
  }

  const modifiers = {
    success: (day: Date) => getDayStatus(day) === 'success',
    failure: (day: Date) => getDayStatus(day) === 'failure',
    'partial-success': (day: Date) => getDayStatus(day) === 'partial-success',
    'no-habit': (day: Date) => getDayStatus(day) === 'no-habit',
  }

  const modifierStyles = {
    success: {
      backgroundColor: 'lightgreen',
      color: 'white',
      borderRadius: '50%',
    },
    failure: {
      backgroundColor: 'lightcoral',
      color: 'white',
      borderRadius: '50%',
    },
    'partial-success': {
      backgroundColor: 'lightyellow',
      color: 'black',
      borderRadius: '50%',
    },
    'no-habit': {
      backgroundColor: 'lightgray',
      color: 'white',
      borderRadius: '50%',
    },
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">나의 기록</h1>
      <DayPicker
        mode="single"
        month={selectedMonth}
        onMonthChange={setSelectedMonth}
        captionLayout="dropdown"
        fromYear={2023}
        toYear={new Date().getFullYear()}
        className="mx-auto"
        modifiers={modifiers}
        modifierStyles={modifierStyles}
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      {selectedDate && (
        <SelectedDayHabits
          selectedDate={selectedDate}
          habits={habits}
          records={records}
        />
      )}
    </div>
  )
}
