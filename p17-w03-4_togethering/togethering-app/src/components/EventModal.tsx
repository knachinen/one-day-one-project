"use client";

import { useState, useEffect } from 'react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: any) => void;
  initialData?: any; // Optional: for editing existing events
}

export default function EventModal({ isOpen, onClose, onSave, initialData }: EventModalProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [startTime, setStartTime] = useState(initialData?.startTime ? new Date(initialData.startTime).toISOString().slice(0, 16) : '');
  const [endTime, setEndTime] = useState(initialData?.endTime ? new Date(initialData.endTime).toISOString().slice(0, 16) : '');
  const [type, setType] = useState(initialData?.type || 'ETC'); // Default to 'ETC' or a sensible default

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStartTime(initialData.startTime ? new Date(initialData.startTime).toISOString().slice(0, 16) : '');
      setEndTime(initialData.endTime ? new Date(initialData.endTime).toISOString().slice(0, 16) : '');
      setType(initialData.type || 'ETC');
    } else {
      // Clear form when opening for new event
      setTitle('');
      setDescription('');
      setStartTime('');
      setEndTime('');
      setType('ETC');
    }
  }, [initialData, isOpen]); // Reset on initialData or isOpen change

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      title,
      description,
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : null,
      type,
    };
    onSave(eventData);
    onClose(); // Close modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Event' : 'Add New Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
            <input
              type="datetime-local"
              id="startTime"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">End Time (Optional)</label>
            <input
              type="datetime-local"
              id="endTime"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Event Type</label>
            <select
              id="type"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="MEETING">Meeting</option>
              <option value="REMINDER">Reminder</option>
              <option value="DEADLINE">Deadline</option>
              <option value="ETC">Other</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
