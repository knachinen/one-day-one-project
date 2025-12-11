"use client";

import { useEffect, useState, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; // Using the maintained fork
import { Prisma } from '@prisma/client';
import TaskDetailModal from '@/components/TaskDetailModal'; // Import the modal component

// Reusing helper to get token, but client-side needs to read cookies from browser
// For simplicity, we'll assume the cookie is sent automatically with fetch requests
// and handle unauthorized responses.

interface Task extends Prisma.TaskGetPayload<{
  include: {
    assignedTo: { select: { id: true, name: true, profileUrl: true } };
  };
}> {}

interface Project extends Prisma.ProjectGetPayload<{
  include: {
    group: {
      include: {
        members: {
          include: {
            user: {
              select: { id: true, name: true, profileUrl: true };
            };
          };
        };
      };
    };
  };
}> {}

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const { projectId } = use(params);
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [columns, setColumns] = useState<Record<string, Column>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for TaskDetailModal
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const fetchProjectAndTasks = useCallback(async () => {
    try {
      // Fetch project details
      const projectRes = await fetch(`/api/projects/${projectId}`);
      if (!projectRes.ok) {
        if (projectRes.status === 401 || projectRes.status === 403) {
          router.push('/login');
        }
        throw new Error('Failed to fetch project');
      }
      const projectData: Project = await projectRes.json();
      setProject(projectData);

      // Fetch tasks for the project
      const tasksRes = await fetch(`/api/tasks?projectId=${projectId}`);
      if (!tasksRes.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasksData: Task[] = await tasksRes.json();

      // Initialize columns
      const initialColumns: Record<string, Column> = {
        'TODO': { id: 'TODO', title: 'To Do', tasks: [] },
        'IN_PROGRESS': { id: 'IN_PROGRESS', title: 'In Progress', tasks: [] },
        'DONE': { id: 'DONE', title: 'Done', tasks: [] },
      };

      tasksData.forEach(task => {
        if (task.status && initialColumns[task.status]) {
          initialColumns[task.status].tasks.push(task);
        }
      });
      setColumns(initialColumns);

    } catch (err: any) {
      setError(err.message || 'Error loading project details.');
    } finally {
      setLoading(false);
    }
  }, [projectId, router]);

  useEffect(() => {
    fetchProjectAndTasks();
  }, [fetchProjectAndTasks]);

  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    // Optimistically update UI
    const newColumns = { ...columns };
    const [movedTask] = newColumns[source.droppableId].tasks.splice(source.index, 1);
    newColumns[destination.droppableId].tasks.splice(destination.index, 0, movedTask);
    setColumns(newColumns);

    // Update task status in the backend
    try {
      const res = await fetch(`/api/tasks/${draggableId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: destination.droppableId }),
      });

      if (!res.ok) {
        // If update fails, revert UI (optional, for robustness)
        setError('Failed to update task status.');
        setColumns(columns); // Revert to original state
      }
    } catch (err) {
      setError('An unexpected error occurred while updating task status.');
      setColumns(columns); // Revert to original state
    }
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsTaskModalOpen(true);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    // Find the task in its current column and replace it with the updated task
    const updatedColumns = { ...columns };
    Object.keys(updatedColumns).forEach(columnId => {
      updatedColumns[columnId].tasks = updatedColumns[columnId].tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
    });
    setColumns(updatedColumns);
    fetchProjectAndTasks(); // Re-fetch to ensure all state is consistent, especially if status changed
  };

  const handleTaskDelete = (deletedTaskId: string) => {
    // Remove the task from the columns
    const updatedColumns = { ...columns };
    Object.keys(updatedColumns).forEach(columnId => {
      updatedColumns[columnId].tasks = updatedColumns[columnId].tasks.filter(task => task.id !== deletedTaskId);
    });
    setColumns(updatedColumns);
    setIsTaskModalOpen(false); // Close modal after deletion
    fetchProjectAndTasks(); // Re-fetch to ensure all state is consistent
  };

  if (loading) return <div className="text-center mt-8">Loading project...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  if (!project) return <div className="text-center mt-8">Project not found.</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">{project.title}</h2>
      <p className="text-gray-600 mb-6">{project.description}</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto">
          {Object.values(columns).map(column => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 rounded-lg shadow-md p-4 w-80 flex-shrink-0"
                >
                  <h3 className="text-xl font-semibold mb-4 capitalize">{column.title.replace('_', ' ').toLowerCase()}</h3>
                  {column.tasks.map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 mb-3 rounded shadow cursor-pointer border border-gray-200"
                          onClick={() => handleTaskClick(task.id)} // Open modal on task click
                        >
                          <h4 className="font-medium">{task.title}</h4>
                          {task.assignedTo && (
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                                {task.assignedTo.name?.charAt(0) || task.assignedTo.email.charAt(0)}
                              </span>
                              <span>{task.assignedTo.name || task.assignedTo.email}</span>
                            </div>
                          )}
                          {task.dueDate && (
                            <p className="text-xs text-gray-500 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskId={selectedTaskId}
        onUpdateTask={handleTaskUpdate}
        onDeleteTask={handleTaskDelete}
      />
    </div>
  );
}

