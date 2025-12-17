'use client'

import { Habit } from '@/types'
import { useHabitStore } from '@/stores/habitStore'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useSound from '@/hooks/useSound' // Import the custom hook
import useStreak from '@/hooks/useStreak' // Import useStreak hook

export default function HabitCard({ habit }: { habit: Habit }) {
  const { records, addRecord, updateRecord } = useHabitStore()
  const [isChecked, setIsChecked] = useState(false)
  const [recordId, setRecordId] = useState<string | null>(null)
  const { play } = useSound('/sounds/ding.mp3') // Placeholder sound file
  const currentStreak = useStreak(habit.id)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const record = records.find(
      (r) => r.habit_id === habit.id && r.check_date === today
    )
    if (record) {
      setIsChecked(record.is_completed)
      setRecordId(record.id)
    } else {
        setIsChecked(false)
        setRecordId(null)
    }
  }, [records, habit.id])

  const handleCheck = () => {
    const today = new Date().toISOString().split('T')[0]
    if (isChecked && recordId) {
      updateRecord({
        id: recordId,
        habit_id: habit.id,
        check_date: today,
        is_completed: false,
      })
    } else if (!isChecked) {
      const newRecord = {
        id: uuidv4(),
        habit_id: habit.id,
        check_date: today,
        is_completed: true,
        completed_at: new Date().toISOString(),
      };
      addRecord(newRecord);
      setRecordId(newRecord.id);
      play(); // Play sound on check
    }
    setIsChecked(!isChecked);
  }

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        isChecked ? 'bg-green-100' : 'bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-2xl">{habit.icon}</div>
        <motion.button
          onClick={handleCheck}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            isChecked ? 'bg-green-500 border-green-500' : 'border-gray-400'
          }`}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          animate={{ scale: isChecked ? [1, 1.2, 1] : 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          {isChecked && <span className="text-white">✔</span>}
        </motion.button>
      </div>
      <div className="mt-2">
        <div className="font-bold">{habit.name}</div>
        <div className="text-sm text-gray-500">
          {currentStreak > 0 ? `${currentStreak}일째 연속` : '스트릭 없음'}
        </div>
      </div>
    </div>
  )
}

