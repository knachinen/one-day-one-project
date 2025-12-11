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

export async function GET(request: Request, { params }: { params: { groupId: string; noteId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { noteId, groupId } = params;

    const note = await prisma.note.findUnique({
      where: { id: noteId, groupId: groupId },
      include: {
        group: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!note) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    // Verify user is a member of the note's group
    const isMember = note.group.members.some(member => member.userId === userId);
    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to access this note' }, { status: 403 });
    }

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { groupId: string; noteId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { noteId, groupId } = params;
    const { title, content } = await request.json();

    const existingNote = await prisma.note.findUnique({
      where: { id: noteId, groupId: groupId },
    });

    if (!existingNote) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    // Verify user is the author of the note
    if (existingNote.authorId !== userId) {
      return NextResponse.json({ message: 'Not authorized to update this note' }, { status: 403 });
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { title, content },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { groupId: string; noteId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { noteId, groupId } = params;

    const existingNote = await prisma.note.findUnique({
      where: { id: noteId, groupId: groupId },
    });

    if (!existingNote) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    // Verify user is the author of the note
    if (existingNote.authorId !== userId) {
      return NextResponse.json({ message: 'Not authorized to delete this note' }, { status: 403 });
    }

    await prisma.note.delete({
      where: { id: noteId },
    });

    return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
