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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectDueDate, setNewProjectDueDate] = useState('');
  const [newProjectGroupId, setNewProjectGroupId] = useState(''); // New state for groupId input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async (currentGroupId: string) => {
    if (!currentGroupId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/projects?groupId=${currentGroupId}`);
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

  useEffect(() => {
    // Only fetch projects if a groupId is provided
    if (newProjectGroupId) {
      fetchProjects(newProjectGroupId);
    }
  }, [newProjectGroupId]); // Refetch when newProjectGroupId changes

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!newProjectGroupId) {
      setError('Group ID is required to add a project.');
      return;
    }
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: newProjectGroupId, // Use the input groupId
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
      fetchProjects(newProjectGroupId); // Refresh the list of projects for the current groupId
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading && newProjectGroupId) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects Listing Page</h1>

      <form onSubmit={handleAddProject} className="mb-8 p-4 border rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="projectGroupId" className="block text-sm font-medium text-gray-700">Group ID</label>
          <input
            type="text"
            id="projectGroupId"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={newProjectGroupId}
            onChange={(e) => setNewProjectGroupId(e.target.value)}
            required
          />
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="projectDescription"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
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
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Project
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Existing Projects</h2>
      {newProjectGroupId && projects.length === 0 && !loading ? (
        <p>No projects found for this Group ID. Add one above!</p>
      ) : newProjectGroupId ? (
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
      ) : (
        <p>Please enter a Group ID to view and add projects.</p>
      )}
    </div>
  );
}
