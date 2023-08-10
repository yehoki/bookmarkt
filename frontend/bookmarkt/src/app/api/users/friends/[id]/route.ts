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

  if (currentUser.friendIds.includes(userId)) {
    return NextResponse.json({ message: 'User is already a friend' });
  }

  const getUserIdFriendIds = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      friendIds: true,
      id: true,
    },
  });
  if (!getUserIdFriendIds) {
    console.log(`Could not find a user with user id ${userId}`);
    return NextResponse.error();
  }

  const currentUserNewFriendIds = [...currentUser.friendIds, userId] || [
    userId,
  ];

  const newFriendsFriendIds = [
    ...getUserIdFriendIds.friendIds,
    currentUser.id,
  ] || [currentUser.id];

  const updateCurrentUserFriends = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      friendIds: currentUserNewFriendIds,
    },
  });

  const updateNewFriendFriends = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      friendIds: newFriendsFriendIds,
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

  const getUserIdFriendIds = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      friendIds: true,
      id: true,
    },
  });

  if (!getUserIdFriendIds) {
    console.log(`Could not find a user with user id ${userId}`);
    return NextResponse.error();
  }

  const currentUserNewFriendIds =
    currentUser.friendIds.filter((friendId) => friendId !== userId) || [];


  const newFriendsFriendIds =
    getUserIdFriendIds.friendIds.filter(
      (friendsFriendId) => friendsFriendId !== currentUser.id
    ) || [];


  const updateCurrentUserFriends = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      friendIds: currentUserNewFriendIds,
    },
  });

  const updateNewFriendFriends = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      friendIds: newFriendsFriendIds,
    },
  });
  return NextResponse.json(updateCurrentUserFriends.friendIds);
}
