import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { MemberRole } from '@prisma/client';
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
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, type } = await request.json();

    if (!name) {
      return NextResponse.json({ message: 'Group name is required' }, { status: 400 });
    }

    const newGroup = await prisma.group.create({
      data: {
        name,
        type,
        members: {
          create: {
            userId,
            role: 'ADMIN', // Creator is automatically ADMIN
          },
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error('Error creating group:', error);
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
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userGroups = await prisma.groupMember.findMany({
      where: { userId },
      include: {
        group: {
          include: {
            members: {
              include: {
                user: {
                  select: { id: true, email: true, name: true, profileUrl: true },
                },
              },
            },
            projects: true,
            events: true,
          },
        },
      },
    });

    const groups = userGroups.map(ug => ug.group);

    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
