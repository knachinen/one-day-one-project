'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import type { Post } from '@/types'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/login')
    } else {
      setUser(session.user)
      fetchPosts(session.user.id)
    }
  }

  const fetchPosts = async (userId: string) => {
    setLoading(true)
    // Filter posts by user_id
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  const handleAddPost = async () => {
    if (!newPost.trim() || !user) return

    const { error } = await supabase
      .from('posts')
      .insert([{ 
        content: newPost,
        user_id: user.id 
      }])

    if (error) {
      alert('Error adding post: ' + error.message)
    } else {
      setNewPost('')
      fetchPosts(user.id)
    }
  }

  const handleDeletePost = async (id: number) => {
    if (!user) return

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id) // Double check ownership

    if (error) {
      alert('Error deleting post: ' + error.message)
    } else {
      fetchPosts(user.id)
    }
  }

  if (!user) return <div className="p-8 text-center">Checking auth...</div>

  return (
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">My Posts</h1>
        <div className="text-sm text-gray-500">
          Logged in as {user.email}
        </div>
      </div>

      {/* Create */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          onKeyDown={(e) => e.key === 'Enter' && handleAddPost()}
        />
        <button
          onClick={handleAddPost}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Post
        </button>
      </div>

      {/* Read & Delete */}
      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li 
              key={post.id} 
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow dark:bg-gray-800 border dark:border-gray-700"
            >
              <span className="text-gray-800 dark:text-gray-200">{post.content}</span>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded dark:hover:bg-red-900/20 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
          {posts.length === 0 && (
            <p className="text-center text-gray-500">No posts yet.</p>
          )}
        </ul>
      )}
    </div>
  )
}