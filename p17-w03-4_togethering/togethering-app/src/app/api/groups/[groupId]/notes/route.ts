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

export async function POST(request: Request, { params }: { params: { groupId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { groupId } = params;
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ message: 'Note title and content are required' }, { status: 400 });
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
      return NextResponse.json({ message: 'Not authorized to create notes in this group' }, { status: 403 });
    }

    const newNote = await prisma.note.create({
      data: {
        groupId,
        title,
        content,
        authorId: userId,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { groupId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { groupId } = params;

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
      return NextResponse.json({ message: 'Not authorized to view notes in this group' }, { status: 403 });
    }

    const notes = await prisma.note.findMany({
      where: { groupId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
