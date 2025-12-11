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

    const { projectId, title, description, dueDate, assignedToId } = await request.json();

    if (!projectId || !title) {
      return NextResponse.json({ message: 'Project ID and title are required' }, { status: 400 });
    }

    // Verify user is a member of the project's group
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { groupId: true },
    });

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    const isMember = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: project.groupId,
          userId: userId,
        },
      },
    });

    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to create tasks in this project' }, { status: 403 });
    }

    const newTask = await prisma.task.create({
      data: {
        projectId,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedToId,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
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
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });
    }

    // Verify user is a member of the project's group
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { groupId: true },
    });

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    const isMember = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: project.groupId,
          userId: userId,
        },
      },
    });

    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to view tasks in this project' }, { status: 403 });
    }

    const tasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' },
      include: {
        assignedTo: {
          select: { id: true, name: true, profileUrl: true },
        },
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
