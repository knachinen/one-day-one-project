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

export async function GET(request: Request, { params }: { params: { projectId: string } }) {
  try {
    const resolvedParams = await params;
    const { projectId } = resolvedParams;

    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        group: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Verify user is a member of the project's group
    const isMember = project.group.members.some(member => member.userId === userId);
    if (!isMember) {
      return NextResponse.json({ message: 'Not authorized to access this project' }, { status: 403 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { projectId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const { projectId } = params;
    const { title, description, dueDate, status } = await request.json();

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        group: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!existingProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Verify user is a member of the project's group and has ADMIN role
    const isMemberAdmin = existingProject.group.members.some(member => member.userId === userId && member.role === 'ADMIN');
    if (!isMemberAdmin) {
      return NextResponse.json({ message: 'Not authorized to update this project (requires ADMIN role)' }, { status: 403 });
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        status,
      },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { projectId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = getUserIdFromToken(token);

    const { projectId } = params;

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        group: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!existingProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // Verify user is a member of the project's group and has ADMIN role
    const isMemberAdmin = existingProject.group.members.some(member => member.userId === userId && member.role === 'ADMIN');
    if (!isMemberAdmin) {
      return NextResponse.json({ message: 'Not authorized to delete this project (requires ADMIN role)' }, { status: 403 });
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
