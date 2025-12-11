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

export async function POST(request: Request, { params }: { params: { taskId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { taskId } = params;
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json({ message: 'Comment content is required' }, { status: 400 });
    }

    // Verify user is a member of the project's group associated with the task
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: {
          include: {
            group: {
              include: { members: true },
            },
          },
        },
      },
    });

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    const isMember = task.project.group.members.some(member => member.userId === userId);
    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to comment on this task' }, { status: 403 });
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        taskId,
        authorId: userId,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { taskId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { taskId } = params;

    // Verify user is a member of the project's group associated with the task
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: {
          include: {
            group: {
              include: { members: true },
            },
          },
        },
      },
    });

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    const isMember = task.project.group.members.some(member => member.userId === userId);
    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to view comments on this task' }, { status: 403 });
    }

    const comments = await prisma.comment.findMany({
      where: { taskId },
      orderBy: { createdAt: 'asc' },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
