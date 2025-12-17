'use client'

import React from 'react'

interface HabitTreeProps {
  completionPercentage: number
  completedHabitsToday: number
  has7DayOverallStreak: boolean
}

export default function HabitTree({
  completionPercentage,
  completedHabitsToday,
  has7DayOverallStreak,
}: HabitTreeProps) {
  // Simplification based on design: Hardcoding level and status for now.
  const level = 5;
  const statusMessage = "우두커니 자라는 중";

  return (
    <div className="bg-green-100 p-4 rounded-lg h-48 flex flex-col items-center justify-center relative overflow-hidden">
      <p className="text-lg font-bold">나의 습관 나무</p> {/* Simplified title */}
      <p className="text-sm text-gray-600">레벨 {level} + {statusMessage}</p> {/* Level/Status Text */}
      {/* Tree Image Placeholder */}
      <div className="mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-green-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M12 3v18m-4-8h8m-4-8v8m-4 4h8" />
        </svg>
      </div>
    </div>
  )
}
