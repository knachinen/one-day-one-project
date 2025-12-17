'use client'

import { Habit } from '@/types'
import { useHabitStore } from '@/stores/habitStore'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'

export default function HabitCard({ habit }: { habit: Habit }) {
  const { records, addRecord, updateRecord } = useHabitStore()
  const [isChecked, setIsChecked] = useState(false)
  const [recordId, setRecordId] = useState<string | null>(null)

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
        <button
          onClick={handleCheck}
          className={`w-8 h-8 rounded-full border-2 ${
            isChecked ? 'bg-green-500 border-green-500' : 'border-gray-400'
          }`}
        >
          {isChecked && <span className="text-white">✔</span>}
        </button>
      </div>
      <div className="mt-2">
        <div className="font-bold">{habit.name}</div>
        {/* Streak will be displayed here */}
      </div>
    </div>
  )
}
