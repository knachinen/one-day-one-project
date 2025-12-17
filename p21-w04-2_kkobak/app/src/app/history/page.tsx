'use client'

import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export default function HistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">나의 기록</h1>
      <DayPicker
        mode="single" // For now, single selection. Will be changed for more advanced features.
        month={selectedMonth}
        onMonthChange={setSelectedMonth}
        captionLayout="dropdown" // Allows changing month/year
        fromYear={2023} // Example: allow selection from 2023
        toYear={new Date().getFullYear()} // to current year
        className="mx-auto"
      />
      {/* Details for selected day will go here */}
    </div>
  )
}
