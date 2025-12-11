"use client";

import { useEffect, useState, useCallback } from 'react';
import { Prisma } from '@prisma/client';

interface Task extends Prisma.TaskGetPayload<{
  include: {
    assignedTo: { select: { id: true, name: true, profileUrl: true } };
  };
}> {}

interface Comment extends Prisma.CommentGetPayload<{
  include: {
    author: { select: { id: true, name: true, email: true } };
  };
}> {}

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string | null;
  onUpdateTask: (updatedTask: Task) => void; // Callback for when task is updated
  onDeleteTask: (taskId: string) => void; // Callback for when task is deleted
}

export default function TaskDetailModal({ isOpen, onClose, taskId, onUpdateTask, onDeleteTask }: TaskDetailModalProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedStatus, setEditedStatus] = useState(''); // Assuming TaskStatus is string
  const [editedDueDate, setEditedDueDate] = useState('');

  const fetchTaskDetails = useCallback(async () => {
    if (!taskId) return;
    setLoading(true);
    setError(null);
    try {
      const taskRes = await fetch(`/api/tasks/${taskId}`);
      if (!taskRes.ok) {
        throw new Error('Failed to fetch task details');
      }
      const taskData: Task = await taskRes.json();
      setTask(taskData);
      setEditedTitle(taskData.title);
      setEditedDescription(taskData.description || '');
      setEditedStatus(taskData.status);
      setEditedDueDate(taskData.dueDate ? new Date(taskData.dueDate).toISOString().slice(0, 16) : '');

      const commentsRes = await fetch(`/api/tasks/${taskId}/comments`);
      if (!commentsRes.ok) {
        throw new Error('Failed to fetch comments');
      }
      const commentsData: Comment[] = await commentsRes.json();
      setComments(commentsData);

    } catch (err: any) {
      setError(err.message || 'Error loading task details.');
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (isOpen && taskId) {
      fetchTaskDetails();
    } else if (!isOpen) {
      // Reset state when modal closes
      setTask(null);
      setComments([]);
      setNewCommentContent('');
      setError(null);
      setLoading(true);
      setIsEditing(false);
    }
  }, [isOpen, taskId, fetchTaskDetails]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim() || !taskId) return;

    try {
      const res = await fetch(`/api/tasks/${taskId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newCommentContent }),
      });

      if (!res.ok) {
        throw new Error('Failed to post comment');
      }

      setNewCommentContent('');
      fetchTaskDetails(); // Refresh comments
    } catch (err: any) {
      setError(err.message || 'Error posting comment.');
    }
  };

  const handleUpdateTask = async () => {
    if (!task) return;
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          status: editedStatus,
          dueDate: editedDueDate ? new Date(editedDueDate) : null,
          // assignedToId: ... // Add logic for assigning if needed
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update task');
      }
      const updatedTask: Task = await res.json();
      setTask(updatedTask);
      onUpdateTask(updatedTask); // Notify parent component
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Error updating task.');
    }
  };

  const handleDeleteTask = async () => {
    if (!task || !confirm('Are you sure you want to delete this task?')) return;
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete task');
      }
      onDeleteTask(task.id); // Notify parent component
      onClose(); // Close modal
    } catch (err: any) {
      setError(err.message || 'Error deleting task.');
    }
  };

  if (!isOpen) return null;

  if (loading) return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-center">
        Loading task details...
      </div>
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-center text-red-500">
        Error: {error}
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );

  if (!task) return null; // Should not happen if taskId is valid

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-2xl font-bold border rounded p-1"
            />
          ) : (
            <h2 className="text-2xl font-bold">{task.title}</h2>
          )}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Details</h3>
          {isEditing ? (
            <div>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full border rounded p-2 mb-2"
                rows={3}
              />
              <label htmlFor="editedStatus" className="block text-gray-700 text-sm font-bold mb-1">Status</label>
              <select
                id="editedStatus"
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
                className="w-full border rounded p-2 mb-2"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
              <label htmlFor="editedDueDate" className="block text-gray-700 text-sm font-bold mb-1">Due Date</label>
              <input
                type="datetime-local"
                id="editedDueDate"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                className="w-full border rounded p-2 mb-2"
              />
            </div>
          ) : (
            <>
              <p className="text-gray-700 mb-2">{task.description || 'No description provided.'}</p>
              <p className="text-sm text-gray-600">Status: {task.status.replace('_', ' ')}</p>
              {task.dueDate && <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleString()}</p>}
              {task.assignedTo && (
                <p className="text-sm text-gray-600">Assigned To: {task.assignedTo.name || task.assignedTo.email}</p>
              )}
            </>
          )}
          <div className="mt-4 flex gap-2">
            {isEditing ? (
              <button onClick={handleUpdateTask} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
            )}
            <button onClick={handleDeleteTask} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
            {isEditing && (
              <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <div className="space-y-4 max-h-60 overflow-y-auto border p-3 rounded bg-gray-50">
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="border-b pb-2 last:border-b-0">
                  <p className="text-sm text-gray-800">{comment.content}</p>
                  <p className="text-xs text-gray-500">
                    by {comment.author.name || comment.author.email} on {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handlePostComment} className="mt-4 flex">
            <textarea
              className="flex-1 border rounded-l-md p-2"
              placeholder="Add a comment..."
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              rows={1}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
