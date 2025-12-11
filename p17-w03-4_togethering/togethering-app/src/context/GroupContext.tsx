"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface Group {
  id: string;
  name: string;
  // Add other group properties if needed, e.g., type, description
}

interface GroupContextType {
  currentGroup: Group | null;
  setCurrentGroup: (group: Group | null) => void;
  loading: boolean;
  userGroups: Group[]; // To store all groups the user belongs to
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserGroups = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/groups');
        if (res.ok) {
          const groups: Group[] = await res.json();
          setUserGroups(groups);
          if (groups.length > 0) {
            // For now, set the first group as the current group
            // In a real app, you might get this from user preferences or local storage
            setCurrentGroup(groups[0]);
          } else {
            setCurrentGroup(null);
          }
        } else {
          console.error('Failed to fetch groups:', res.statusText);
          setUserGroups([]);
          setCurrentGroup(null);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
        setUserGroups([]);
        setCurrentGroup(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGroups();
  }, []);

  return (
    <GroupContext.Provider value={{ currentGroup, setCurrentGroup, loading, userGroups }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
};
