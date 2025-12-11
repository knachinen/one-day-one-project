// src/app/projects/page.tsx
'use client'; // This directive is necessary for client-side components in Next.js 13+ App Router

import React, { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string | null;
  groupId: string;
  dueDate: string | null;
}

interface Group {
  id: string;
  name: string;
  type: string | null;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [groups, setGroups] = useState<Group[]>([]); // New state for groups
  const [selectedGroupId, setSelectedGroupId] = useState(''); // New state for selected group ID
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectDueDate, setNewProjectDueDate] = useState('');
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

  // Fetch groups when component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups', {
          headers: getAuthHeaders(),
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch groups: ${response.statusText}`);
        }
        const data: Group[] = await response.json();
        setGroups(data);
        if (data.length > 0) {
          setSelectedGroupId(data[0].id); // Select the first group by default
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchGroups();
  }, []); // Run only once on mount

  // Fetch projects when selectedGroupId changes
  useEffect(() => {
    const fetchProjects = async () => {
      if (!selectedGroupId) {
        setProjects([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/projects?groupId=${selectedGroupId}`, {
          headers: getAuthHeaders(),
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [selectedGroupId]); // Refetch when selectedGroupId changes

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!selectedGroupId) {
      setError('Please select a group to add a project.');
      return;
    }
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          groupId: selectedGroupId, // Use the selected group ID
          title: newProjectTitle,
          description: newProjectDescription,
          dueDate: newProjectDueDate ? new Date(newProjectDueDate).toISOString() : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add project');
      }

      setNewProjectTitle('');
      setNewProjectDescription('');
      setNewProjectDueDate('');
      // No need to call fetchProjects directly here, as useEffect will react to selectedGroupId change
      // if (selectedGroupId) fetchProjects(selectedGroupId); // Refresh the list of projects for the current groupId
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Adjust loading state based on both groups and projects fetching
  if (loading && selectedGroupId) return <p>Loading projects...</p>;
  if (error && !groups.length) return <p className="text-red-500">Error: {error}</p>; // Display error if no groups could be fetched

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects Listing Page</h1>

      <form onSubmit={handleAddProject} className="mb-8 p-4 border rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="selectGroup" className="block text-sm font-medium text-gray-700">Select Group</label>
          <select
            id="selectGroup"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            required
            disabled={groups.length === 0}
          >
            {groups.length === 0 ? (
              <option value="">No groups available. Create one first!</option>
            ) : (
              <>
                <option value="">-- Select a Group --</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="projectTitle"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            required
            disabled={!selectedGroupId} // Disable if no group is selected
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="projectDescription"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
            disabled={!selectedGroupId} // Disable if no group is selected
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="projectDueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            id="projectDueDate"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={newProjectDueDate}
            onChange={(e) => setNewProjectDueDate(e.target.value)}
            disabled={!selectedGroupId} // Disable if no group is selected
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={!selectedGroupId} // Disable if no group is selected
        >
          Add Project
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>
      {groups.length === 0 ? (
        <p>No groups available. Please create a group first on the /groups page.</p>
      ) : !selectedGroupId ? (
        <p>Please select a group to view its projects.</p>
      ) : projects.length === 0 && !loading ? (
        <p>No projects found for the selected group. Add one above!</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <h3 className="text-lg font-bold">{project.title}</h3>
              {project.description && <p className="text-gray-700">{project.description}</p>}
              {project.dueDate && <p className="text-sm text-gray-500">Due: {new Date(project.dueDate).toLocaleDateString()}</p>}
              <p className="text-sm text-gray-500">Group ID: {project.groupId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}