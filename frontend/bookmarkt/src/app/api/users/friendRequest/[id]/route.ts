import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    console.log('No current user available');
    return NextResponse.error();
  }
  const body = await req.json();
  const { userId } = body;
  if (!userId) {
    console.log('No user ID in the request');
    return NextResponse.error();
  }

  if (
    currentUser.friendRequestsSent &&
    currentUser.friendRequestsSent.includes(userId)
  ) {
    return NextResponse.json({ message: 'Friend request already sent' });
  }

  const getUserIdFriendIds = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!getUserIdFriendIds) {
    console.log(`Could not find a user with user id ${userId}`);
    return NextResponse.error();
  }

  const currentUserNewFriendIds = [
    ...currentUser.friendRequestsSent,
    userId,
  ] || [userId];

  const newFriendsFriendIds = [
    ...getUserIdFriendIds.friendRequestsReceived,
    currentUser.id,
  ] || [currentUser.id];

  const newNotification = await prisma.notification.create({
    data: {
      userId: userId,
      notificationInfo: `You have received a new friend request from ${
        currentUser.name ? currentUser.name : 'User'
      }. Check out their profile.`,
    },
  });

  const updateCurrentUserFriends = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      friendRequestsSent: currentUserNewFriendIds,
    },
  });

  const updateNewFriendFriends = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      friendRequestsReceived: newFriendsFriendIds,
      notificationIds:
        [...getUserIdFriendIds.notificationIds, newNotification.id] || [],
    },
  });
  return NextResponse.json(updateCurrentUserFriends.friendIds);
}

export async function DELETE(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.log('No current user available');
    return NextResponse.error();
  }
  const body = await req.json();
  const { userId } = body;

  if (!userId) {
    console.log('No user ID in the request');
    return NextResponse.error();
  }

  const userFriendRequests = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!userFriendRequests) {
    console.log(`Could not find a user with user id ${userId}`);
    return NextResponse.error();
  }

  const currentUserRequestsSent =
    currentUser.friendRequestsSent.filter(
      (requestId) => requestId !== userId
    ) || [];

  const newFriendsFriendIds =
    userFriendRequests.friendRequestsReceived.filter(
      (friendsFriendId) => friendsFriendId !== currentUser.id
    ) || [];

  const updateCurrentUserRequestsSent = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      friendRequestsSent: currentUserRequestsSent,
    },
  });

  const updateNewUserRequestsReceived = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      friendRequestsReceived: newFriendsFriendIds,
    },
  });

  return NextResponse.json(updateCurrentUserRequestsSent.friendRequestsSent);
}
