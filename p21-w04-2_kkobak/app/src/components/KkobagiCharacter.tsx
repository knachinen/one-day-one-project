'use client'

import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface KkobagiCharacterProps {
  completionPercentage: number
  totalHabitsToday: number
  completedHabitsToday: number
}

export default function KkobagiCharacter({
  completionPercentage,
  totalHabitsToday,
  completedHabitsToday,
}: KkobagiCharacterProps) {
  const controls = useAnimation()
  // Logic to determine Kkobagi's expression and message based on completionPercentage
  let emoji = '😀'
  let message = '오늘도 새로운 시작! 꼬바기가 응원할게요.'

  if (completionPercentage === 100 && totalHabitsToday > 0) {
    emoji = '🎉'
    message = '오늘 할 일을 몽땅 해냈어요! 정말 대단해요!'
  } else if (completionPercentage >= 70) {
    emoji = '😊'
    message = '거의 다 왔어요! 조금만 더 힘내요!'
  } else if (completionPercentage >= 30) {
    emoji = '🙂'
    message = '절반이나 해냈어요! 꼬바기가 응원할게요!'
  } else {
    emoji = '🤔'
    message = '오늘도 새로운 시작! 꼬바기가 응원할게요.'
  }

  useEffect(() => {
    if (completionPercentage === 100 && totalHabitsToday > 0) {
      controls.start({
        y: [0, -20, 0], // Jump animation
        transition: { duration: 0.5, ease: 'easeOut' },
      })
    } else {
      controls.start({ y: 0 })
    }
  }, [completionPercentage, totalHabitsToday, controls])


  return (
    <div className="bg-yellow-100 p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <p className="text-lg">오늘 달성률 {completionPercentage}%</p>
        <motion.span
          className="text-4xl"
          animate={controls}
        >
          {emoji}
        </motion.span>
      </div>
      <p className="text-sm text-gray-600">{message}</p>
      {totalHabitsToday > 0 && (
        <p className="text-sm text-gray-600">
          ({completedHabitsToday} / {totalHabitsToday} 완료)
        </p>
      )}
    </div>
  )
}
