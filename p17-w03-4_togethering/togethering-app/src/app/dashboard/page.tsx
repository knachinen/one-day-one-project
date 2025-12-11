"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Prisma } from '@prisma/client';
// For progress graph, we might use a charting library like Chart.js or Recharts
// For now, a simple text-based progress will be implemented.

type Task = Prisma.TaskGetPayload<{
  include: {
    project: {
      select: { title: true };
    };
  };
}>;

type CalendarEvent = Prisma.CalendarEventGetPayload<{}> & { isTask?: boolean };

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [groupProgress, setGroupProgress] = useState<{ totalTasks: number; completedTasks: number; percentage: number } | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [groupId, setGroupId] = useState<string>('test-group-id'); // TODO: Replace with dynamic group ID

  // This will be replaced by a global state for current group
  useEffect(() => {
    // For now, use hardcoded groupId. In future, user will select current group.
    if (!groupId) {
      setError('Please select a group first.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user's tasks (placeholder - actual API for user-specific tasks needed)
        // For now, we'll fetch all tasks for the group and filter locally
        const tasksRes = await fetch(`/api/tasks?projectId=any`); // This needs to be refined for all tasks in a group
        const tasksData: Task[] = tasksRes.ok ? await tasksRes.json() : [];
        setMyTasks(tasksData.filter(task => task.status !== 'DONE')); // Placeholder: filter for non-done tasks

        // Fetch group progress (placeholder - actual API for group progress needed)
        // For now, calculate from fetched tasks
        const totalTasks = tasksData.length;
        const completedTasks = tasksData.filter(task => task.status === 'DONE').length;
        const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        setGroupProgress({ totalTasks, completedTasks, percentage });

        // Fetch upcoming events (from calendar API)
        const today = new Date();
        const threeDaysLater = new Date();
        threeDaysLater.setDate(today.getDate() + 3);

        const eventsRes = await fetch(`/api/calendar?groupId=${groupId}&startDate=${today.toISOString()}&endDate=${threeDaysLater.toISOString()}`);
        if (!eventsRes.ok) {
          if (eventsRes.status === 401) {
            router.push('/login');
          }
          throw new Error('Failed to fetch upcoming events');
        }
        const eventsData: CalendarEvent[] = await eventsRes.json();
        setUpcomingEvents(eventsData);

      } catch (err: any) {
        setError(err.message || 'Error loading dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId, router]);

  if (loading) return <div className="text-center mt-8">Loading dashboard...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h2>

      {/* My Tasks Widget */}
             <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">My Pending Tasks</h3>        {myTasks.length === 0 ? (
          <p className="text-gray-700">No pending tasks assigned to you.</p>
        ) : (
          <ul>
            {myTasks.map(task => (
              <li key={task.id} className="mb-2 p-2 border-b last:border-b-0 border-gray-200">
                <span className="font-medium text-gray-800">{task.title}</span> - <span className="text-sm text-gray-500">{task.project.title}</span>
                {task.dueDate && <span className="ml-2 text-sm text-red-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Group Progress Widget */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Group Progress</h3>
        {groupProgress && (
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600">{groupProgress.percentage.toFixed(0)}%</p>
            <p className="text-gray-600">{groupProgress.completedTasks} of {groupProgress.totalTasks} tasks completed</p>
            {/* Placeholder for actual graph */}
            <div className="mt-4 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500">Graph Placeholder</span>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Events Widget */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Upcoming Events (Next 3 Days)</h3>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-700">No upcoming events.</p>
        ) : (
          <ul>
            {upcomingEvents.map(event => (
              <li key={event.id} className="mb-2 p-2 border-b last:border-b-0 border-gray-200">
                <span className="font-medium text-gray-800 dark:text-gray-200">{event.title}</span> - <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(event.startTime).toLocaleString()}</span>
                {event.isTask && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Task Due</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}