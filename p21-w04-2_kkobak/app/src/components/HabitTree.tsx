'use client'

import React from 'react'

interface HabitTreeProps {
  completionPercentage: number // Will be used for growth algorithm
}

export default function HabitTree({ completionPercentage }: HabitTreeProps) {
  // Placeholder for the Habit Tree graphic
  // Growth algorithm, leaves animation, and flowering animation will be implemented here
  return (
    <div className="bg-green-100 p-4 rounded-lg h-48 flex items-center justify-center">
      <p className="text-lg font-bold text-green-800">
        나의 습관 나무 (달성률: {completionPercentage}%)
      </p>
      {/* Placeholder for tree image/animation */}
      <span role="img" aria-label="tree" className="text-6xl ml-2">
        🌳
      </span>
    </div>
  )
}
