'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import EditHabitForm from '@/components/EditHabitForm'

export default function EditHabitPage() {
  const params = useParams()
  const { id } = params

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">습관 수정</h1>
      {id && <EditHabitForm habitId={id as string} />}
    </div>
  )
}
