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

export async function GET(request: Request, { params }: { params: { taskId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { taskId } = params;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: {
          select: {
            groupId: true,
            group: {
              include: {
                members: true,
              },
            },
          },
        },
        assignedTo: {
          select: { id: true, name: true, profileUrl: true },
        },
      },
    });

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    // Verify user is a member of the project's group
    const isMember = task.project.group.members.some(member => member.userId === userId);
    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to access this task' }, { status: 403 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { taskId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { taskId } = params;
    const { title, description, dueDate, status, assignedToId } = await request.json();

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: {
          select: {
            groupId: true,
            group: {
              include: {
                members: true,
              },
            },
          },
        },
      },
    });

    if (!existingTask) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    // Verify user is a member of the project's group
    const isMember = existingTask.project.group.members.some(member => member.userId === userId);
    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to update this task' }, { status: 403 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        status,
        assignedToId,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { taskId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { taskId } = params;

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: {
          select: {
            groupId: true,
            group: {
              include: {
                members: true,
              },
            },
          },
        },
      },
    });

    if (!existingTask) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    // Verify user is a member of the project's group
    const isMember = existingTask.project.group.members.some(member => member.userId === userId);
    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to delete this task' }, { status: 403 });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
