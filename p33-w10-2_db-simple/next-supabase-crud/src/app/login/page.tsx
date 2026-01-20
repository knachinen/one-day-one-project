'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSignUp = async () => {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Signup successful! Check your email for confirmation.')
    }
    setLoading(false)
  }

  const handleSignIn = async () => {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setMessage(error.message)
    } else {
      router.push('/')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center dark:text-white">Supabase Auth</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
            />
          </div>
        </div>

        {message && (
          <div className="p-3 text-sm text-center text-blue-600 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-200">
            {message}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
