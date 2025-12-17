'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface HabitTreeProps {
  completionPercentage: number // Will be used for growth algorithm
}

export default function HabitTree({ completionPercentage }: HabitTreeProps) {
  let treeSize = 'text-6xl' // Base size
  let flower = null

  if (completionPercentage >= 30) {
    treeSize = 'text-7xl'
  }
  if (completionPercentage >= 70) {
    treeSize = 'text-8xl'
  }
  if (completionPercentage >= 100) {
    treeSize = 'text-8xl'
    flower = (
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        role="img"
        aria-label="flower"
        className="text-2xl absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        🌸
      </motion.span>
    )
  }

  return (
    <div className="bg-green-100 p-4 rounded-lg h-48 flex flex-col items-center justify-center relative">
      <p className="text-lg font-bold text-green-800">
        나의 습관 나무 (달성률: {completionPercentage}%)
      </p>
      <motion.span
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        role="img"
        aria-label="tree"
        className={`${treeSize} mt-2`}
      >
        🌳
      </motion.span>
      {flower}
    </div>
  )
}
