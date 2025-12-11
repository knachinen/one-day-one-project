"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Prisma } from '@prisma/client';
import EventModal from '@/components/EventModal'; // Import the modal component

const localizer = momentLocalizer(moment);

type CalendarEvent = Prisma.CalendarEventGetPayload<{}> & {
  isTask?: boolean; // Custom property for task events
  start?: Date;
  end?: Date;
};

export default function CalendarPage() {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string>('test-group-id'); // TODO: Replace with dynamic group ID

  // State for EventModal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [modalInitialData, setModalInitialData] = useState<any | null>(null);


  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      // For now, use hardcoded groupId. In future, user will select current group.
      if (!groupId) {
        setError('Please select a group first.');
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/calendar?groupId=${groupId}`);
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch calendar events');
      }
      const data: CalendarEvent[] = await res.json();
      // react-big-calendar expects `start` and `end` to be Date objects
      const formattedEvents = data.map(event => ({
        ...event,
        start: new Date(event.startTime),
        end: event.endTime ? new Date(event.endTime) : new Date(event.startTime), // if no end time, use start time
      }));
      setEvents(formattedEvents);
    } catch (err: any) {
      setError(err.message || 'Error loading calendar events.');
    } finally {
      setLoading(false);
    }
  }, [groupId, router]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setModalInitialData({ startTime: start, endTime: end });
      setIsModalOpen(true);
    },
    []
  );

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      setSelectedEvent(event);
      setModalInitialData({
        ...event,
        startTime: event.start, // Use start/end from formatted event
        endTime: event.end,
      });
      setIsModalOpen(true);
    },
    []
  );

  const handleSaveEvent = useCallback(async (eventData: any) => {
    try {
      const method = selectedEvent ? 'PUT' : 'POST';
      const url = selectedEvent ? `/api/calendar/${selectedEvent.id}` : '/api/calendar';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...eventData, groupId }),
      });

      if (!res.ok) {
        throw new Error('Failed to save event');
      }
      fetchEvents(); // Refetch events after saving
    } catch (err: any) {
      setError(err.message || 'Error saving event.');
    }
  }, [selectedEvent, groupId, fetchEvents]);


  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  if (loading) return <div className="text-center mt-8">Loading calendar...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Group Calendar</h2>
      <div className="h-[700px]"> {/* Fixed height for calendar */}
        <Calendar
          localizer={localizer}
          events={events}
          defaultDate={defaultDate}
          defaultView="month"
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          scrollToTime={scrollToTime}
          // eventPropGetter={eventPropGetter} // For custom styling based on event type
        />
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
          setModalInitialData(null);
        }}
        onSave={handleSaveEvent}
        initialData={modalInitialData}
      />
    </div>
  );
}
