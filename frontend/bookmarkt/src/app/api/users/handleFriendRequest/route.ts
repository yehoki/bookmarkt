import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NotificationType } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    console.log('No current user available');
    return NextResponse.error();
  }
  const body = await req.json();
  // The current user is the user 'TO' which the request is going
  const { fromUserId, decision } = body;
  if (!fromUserId || !decision) {
    return NextResponse.error();
  }

  const fromUser = await prisma.user.findFirst({
    where: {
      id: fromUserId,
    },
  });
  if (!fromUser) {
    console.log('Could not find the user related to this request');
    return NextResponse.error();
  }
  // Delete requests from both users

  const updateFromUserSentRequests = fromUser.friendRequestsSent.filter(
    (userId) => userId !== currentUser.id
  );
  const updateCurrentUserReceivedRequests =
    currentUser.friendRequestsReceived.filter(
      (userId) => userId !== fromUser.id
    );

  if (decision === 'Accept') {
    // Update the users with the new friend lists and delete friend requests
    const updateFromUserFriendIds = [...fromUser.friendIds, currentUser.id] || [
      currentUser.id,
    ];
    const updateCurrentUserFriendIds = [
      ...currentUser.friendIds,
      fromUser.id,
    ] || [fromUser.id];

    // Create a notification about an accepted friend request for the user sending
    const newFromUserNotification = await prisma.notification.create({
      data: {
        userId: fromUser.id,
        userName: currentUser.name,
        fromUserId: currentUser.id,
        notificationInfo: `${
          currentUser.name ? currentUser.name : 'User'
        } has accepted your friend request.`,
        notificationType: NotificationType.REQUESTACCEPTED,
      },
    });

    const updateFromUser = await prisma.user.update({
      where: {
        id: fromUser.id,
      },
      data: {
        friendIds: updateFromUserFriendIds,
        friendRequestsSent: updateFromUserSentRequests,
        notificationIds: [
          ...fromUser.notificationIds,
          newFromUserNotification.id,
        ] || [newFromUserNotification.id],
      },
    });

    const updateCurrentUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        friendIds: updateCurrentUserFriendIds,
        friendRequestsReceived: updateCurrentUserReceivedRequests,
      },
    });
    return NextResponse.json({ message: 'Friend request accepted' });
  }

  if (decision === 'Decline') {
    const updateFromUser = await prisma.user.update({
      where: {
        id: fromUser.id,
      },
      data: {
        friendRequestsSent: updateFromUserSentRequests,
      },
    });

    const updateCurrentUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        friendRequestsReceived: updateCurrentUserReceivedRequests,
      },
    });
    return NextResponse.json({ message: 'Friend request declined' });
  }
}
