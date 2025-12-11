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

export async function POST(request: Request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const { groupId, title, description, startTime, endTime, type } = await request.json();

    if (!groupId || !title || !startTime) {
      return NextResponse.json({ message: 'Group ID, title, and start time are required' }, { status: 400 });
    }

    // Verify user is a member of the group
    const isMember = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: userId,
        },
      },
    });

    if (!isMember) {
      return NextResponse.json({ message: 'Not a member of this group' }, { status: 403 });
    }

    const newEvent = await prisma.calendarEvent.create({
      data: {
        groupId,
        title,
        description,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        type,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');
    const startDate = searchParams.get('startDate'); // Optional: filter events by date range
    const endDate = searchParams.get('endDate');   // Optional: filter events by date range


    if (!groupId) {
      return NextResponse.json({ message: 'Group ID is required' }, { status: 400 });
    }

    // Verify user is a member of the group
    // const isMember = await prisma.groupMember.findUnique({
    //   where: {
    //     groupId_userId: {
    //       groupId: groupId,
    //       userId: userId,
    //     },
    //   },
    // });

    // if (!isMember) {
    //   return NextResponse.json({ message: 'Not a member of this group' }, { status: 403 });
    // }

    const events = await prisma.calendarEvent.findMany({
      where: {
        groupId,
        startTime: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      orderBy: { startTime: 'asc' },
    });

    // Fetch tasks due dates as events
    const tasksWithDueDates = await prisma.task.findMany({
      where: {
        project: {
          groupId,
        },
        dueDate: {
          not: null,
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      select: {
        id: true,
        title: true,
        dueDate: true,
        project: {
          select: { title: true },
        },
      },
    });

    const taskEvents = tasksWithDueDates.map(task => ({
      id: `task-${task.id}`, // Unique ID for task event
      groupId,
      title: `${task.project.title}: ${task.title} (Due)`,
      description: `Task due date from project: ${task.project.title}`,
      startTime: task.dueDate,
      endTime: task.dueDate, // Task due date is a point in time, so start and end are same
      type: 'DEADLINE',
      isTask: true, // Custom flag to identify task-based events
    }));

    // Combine and sort all events
    const allEvents = [...events, ...taskEvents].sort((a: any, b: any) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    return NextResponse.json(allEvents, { status: 200 });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
