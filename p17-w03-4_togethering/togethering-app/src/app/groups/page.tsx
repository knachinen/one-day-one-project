// src/app/groups/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface Group {
  id: string;
  name: string;
  type: string | null;
  // Add other group properties as needed
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupType, setNewGroupType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  };

  const fetchGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/groups', {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch groups: ${response.statusText}`);
      }
      const data: Group[] = await response.json();
      setGroups(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: newGroupName,
          type: newGroupType || null, // Send null if type is empty
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create group');
      }

      setNewGroupName('');
      setNewGroupType('');
      fetchGroups(); // Refresh the list of groups
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading groups...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Groups</h1>

      <form onSubmit={handleCreateGroup} className="mb-8 p-4 border rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name</label>
          <input
            type="text"
            id="groupName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="groupType" className="block text-sm font-medium text-gray-700">Group Type (Optional)</label>
          <input
            type="text"
            id="groupType"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={newGroupType}
            onChange={(e) => setNewGroupType(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Group
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Existing Groups</h2>
      {groups.length === 0 ? (
        <p>No groups found. Create one above!</p>
      ) : (
        <ul className="space-y-4">
          {groups.map((group) => (
            <li key={group.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <h3 className="text-lg font-bold">{group.name}</h3>
              {group.type && <p className="text-gray-700">Type: {group.type}</p>}
              <p className="text-sm text-gray-500">ID: {group.id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}