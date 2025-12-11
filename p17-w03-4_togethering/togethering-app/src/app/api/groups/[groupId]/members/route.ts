import { NextResponse } from 'next/server';
import { PrismaClient, MemberRole } from '@prisma/client';
import { getUserIdFromToken } from '@/utils/auth';

const prisma = new PrismaClient();

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

// POST: Invite a member to a group
export async function POST(request: Request, { params }: { params: { groupId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const inviterUserId = getUserIdFromToken(token);

    const { groupId } = params;
    const { email: invitedUserEmail } = await request.json();

    if (!invitedUserEmail) {
      return NextResponse.json({ message: 'Invited user email is required' }, { status: 400 });
    }

    // Check if inviter is a member of the group
    const inviterGroupMembership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: inviterUserId,
        },
      },
    });

    if (!inviterGroupMembership) {
      return NextResponse.json({ message: 'Not a member of this group' }, { status: 403 });
    }

    // Find the user to be invited
    const invitedUser = await prisma.user.findUnique({
      where: { email: invitedUserEmail },
    });

    if (!invitedUser) {
      return NextResponse.json({ message: 'User with this email not found' }, { status: 404 });
    }

    // Check if the invited user is already a member
    const existingMembership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: invitedUser.id,
        },
      },
    });

    if (existingMembership) {
      return NextResponse.json({ message: 'User is already a member of this group' }, { status: 409 });
    }

    // Add the user to the group as a MEMBER
    const newMember = await prisma.groupMember.create({
      data: {
        groupId: groupId,
        userId: invitedUser.id,
        role: MemberRole.MEMBER,
      },
      include: {
        user: {
          select: { id: true, email: true, name: true, profileUrl: true },
        },
      },
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Error inviting member:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// DELETE: Remove a member from a group
export async function DELETE(request: Request, { params }: { params: { groupId: string } }) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const requesterUserId = getUserIdFromToken(token);

    const { groupId } = params;
    const { memberId: memberToRemoveId } = await request.json(); // ID of the GroupMember entry

    if (!memberToRemoveId) {
      return NextResponse.json({ message: 'Member ID to remove is required' }, { status: 400 });
    }

    // Ensure the requester is an ADMIN of the group
    const requesterMembership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId: groupId,
          userId: requesterUserId,
        },
      },
    });

    if (!requesterMembership || requesterMembership.role !== MemberRole.ADMIN) {
      return NextResponse.json({ message: 'Only group admins can remove members' }, { status: 403 });
    }
    
    // Prevent admin from removing themselves if they are the last admin
    // This logic can be more complex, but for now, simple check.
    if (requesterUserId === memberToRemoveId) {
      const adminCount = await prisma.groupMember.count({
        where: {
          groupId: groupId,
          role: MemberRole.ADMIN,
        },
      });
      if (adminCount <= 1) {
        return NextResponse.json({ message: 'Cannot remove the last admin of the group' }, { status: 403 });
      }
    }


    // Find the GroupMember entry to delete
    const groupMemberToDelete = await prisma.groupMember.findFirst({
      where: {
        groupId: groupId,
        userId: memberToRemoveId, // memberToRemoveId is actually userId in this context
      },
    });

    if (!groupMemberToDelete) {
      return NextResponse.json({ message: 'Member not found in this group' }, { status: 404 });
    }
    
    await prisma.groupMember.delete({
      where: {
        id: groupMemberToDelete.id, // Delete by the GroupMember's ID
      },
    });

    return NextResponse.json({ message: 'Member removed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error removing member:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
