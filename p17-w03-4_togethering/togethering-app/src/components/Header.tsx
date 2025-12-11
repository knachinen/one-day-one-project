"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGroup } from '../context/GroupContext';

export default function Header() {
  const [userName, setUserName] = useState('Guest'); // Default to Guest
  const { currentGroup, loading } = useGroup();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user/me');
        if (res.ok) {
          const userData = await res.json();
          setUserName(userData.name || userData.email); // Use name if available, else email
        } else {
          // Handle cases where user is not logged in or token is invalid
          setUserName('Guest');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUserName('Guest');
      }
    };
    fetchUserData();
  }, []); // Run once on mount

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer">Togethering</h1>
      </Link>
      {/* Group Switcher and User Menu will go here later */}
      <div>
        {/* Placeholder for Group Switcher */}
        <span className="mr-4">
          Current Group: {loading ? 'Loading...' : currentGroup ? currentGroup.name : 'No Group Selected'}
        </span>
        {/* User Name */}
        <span>{userName}</span>
      </div>
    </header>
  );
}
