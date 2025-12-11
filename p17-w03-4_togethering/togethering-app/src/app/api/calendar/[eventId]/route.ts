import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserIdFromToken } from '@/utils/auth';

// Helper to get token from request
function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map(c => c.trim());
  const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
  if (tokenCookie) {
    return tokenCookie.substring('token='.length);
  }
  return null;
}

export async function GET(request: Request, { params }: { params: { eventId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { eventId } = params;

    const event = await prisma.calendarEvent.findUnique({
      where: { id: eventId },
      include: {
        group: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ message: 'Calendar event not found' }, { status: 404 });
    }

    // Verify user is a member of the event's group
    const isMember = event.group.members.some(member => member.userId === userId);
    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to access this calendar event' }, { status: 403 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error('Error fetching calendar event:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { eventId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { eventId } = params;
    const { title, description, startTime, endTime, type } = await request.json();

    const existingEvent = await prisma.calendarEvent.findUnique({
      where: { id: eventId },
      include: {
        group: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!existingEvent) {
      return NextResponse.json({ message: 'Calendar event not found' }, { status: 404 });
    }

    // Verify user is a member of the event's group
    const isMember = existingEvent.group.members.some(member => member.userId === userId);
    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to update this calendar event' }, { status: 403 });
    }

    const updatedEvent = await prisma.calendarEvent.update({
      where: { id: eventId },
      data: {
        title,
        description,
        startTime: startTime ? new Date(startTime) : undefined,
        endTime: endTime ? new Date(endTime) : undefined,
        type,
      },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error('Error updating calendar event:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { eventId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { eventId } = params;

    const existingEvent = await prisma.calendarEvent.findUnique({
      where: { id: eventId },
      include: {
        group: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!existingEvent) {
      return NextResponse.json({ message: 'Calendar event not found' }, { status: 404 });
    }

    // Verify user is a member of the event's group
    const isMember = existingEvent.group.members.some(member => member.userId === userId);
    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to delete this calendar event' }, { status: 403 });
    }

    await prisma.calendarEvent.delete({
      where: { id: eventId },
    });

    return NextResponse.json({ message: 'Calendar event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
