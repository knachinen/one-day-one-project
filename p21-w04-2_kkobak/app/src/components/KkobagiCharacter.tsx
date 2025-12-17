'use client'

import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface KkobagiCharacterProps {
  completionPercentage: number
  totalHabitsToday: number
  completedHabitsToday: number
  weeklyCompletionRate: number // New prop
}

export default function KkobagiCharacter({
  completionPercentage,
  totalHabitsToday,
  completedHabitsToday,
  weeklyCompletionRate, // Accept new prop
}: KkobagiCharacterProps) {
  const controls = useAnimation()
  let emoji = '😀'
  let dailyMessage = '오늘도 새로운 시작! 꼬바기가 응원할게요.'
  let weeklyRetrospectionMessage = ''; // New message for weekly retrospection

  if (completionPercentage === 100 && totalHabitsToday > 0) {
    emoji = '🎉'
    dailyMessage = '오늘 할 일을 몽땅 해냈어요! 정말 대단해요!'
  } else if (completionPercentage >= 70) {
    emoji = '😊'
    dailyMessage = '거의 다 왔어요! 조금만 더 힘내요!'
  } else if (completionPercentage >= 30) {
    emoji = '🙂'
    dailyMessage = '절반이나 해냈어요! 꼬바기가 응원할게요!'
  } else {
    emoji = '🤔'
    dailyMessage = '오늘도 새로운 시작! 꼬바기가 응원할게요.'
  }

  // Generate weekly retrospection message based on weeklyCompletionRate
  if (weeklyCompletionRate >= 90) {
    weeklyRetrospectionMessage = '이번 주 정말 완벽해요! 꼬바기가 다 뿌듯하네요!';
  } else if (weeklyCompletionRate >= 50) {
    weeklyRetrospectionMessage = '이번 주도 잘 해내고 있어요! 다음 주엔 더 성장할 거예요!';
  } else if (weeklyCompletionRate > 0) {
    weeklyRetrospectionMessage = '이번 주엔 조금 힘들었나요? 괜찮아요, 다시 시작하면 돼요!';
  } else {
    weeklyRetrospectionMessage = '아직 이번 주 기록이 없어요. 새로운 습관을 시작해볼까요?';
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
      <p className="text-sm text-gray-600">{dailyMessage}</p>
      {totalHabitsToday > 0 && (
        <p className="text-sm text-gray-600">
          ({completedHabitsToday} / {totalHabitsToday} 완료)
        </p>
      )}
      {/* Display weekly retrospection message */}
      <p className="text-sm text-gray-600 mt-2">{weeklyRetrospectionMessage}</p>
    </div>
  )
}
