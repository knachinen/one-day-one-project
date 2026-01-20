'use client'

import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { User } from '@supabase/supabase-js'

export default function NavBar({ user }: { user: User | null }) {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow dark:bg-gray-900 border-b dark:border-gray-800">
      <div className="flex gap-4 items-center">
        <Link href="/" className="text-xl font-bold dark:text-white">My App</Link>
        <Link href="/posts" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">Posts</Link>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
            <LogoutButton />
          </>
        ) : (
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
        )}
      </div>
    </nav>
  )
}
