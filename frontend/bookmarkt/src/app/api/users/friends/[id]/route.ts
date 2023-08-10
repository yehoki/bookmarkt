import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  console.log('B Current');
  if (!currentUser) {
    console.log('No current user available');
    return NextResponse.error();
  }
  console.log('A Current');
  const body = await req.json();
  const { userId } = body;
  console.log('B Body');
  if (!userId) {
    console.log('No user ID in the request');
    return NextResponse.error();
  }

  console.log('A Body');
  const getUserIdFriendIds = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      friendIds: true,
      id: true,
    },
  });
  console.log('UserId');
  if (!getUserIdFriendIds) {
    console.log(`Could not find a user with user id ${userId}`);
    return NextResponse.error();
  }
  console.log('A UserId');

  const currentUserNewFriendIds = [...currentUser.friendIds, userId] || [
    userId,
  ];
  const newFriendsFriendIds = [
    ...getUserIdFriendIds.friendIds,
    getUserIdFriendIds.id,
  ] || [getUserIdFriendIds.id];

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
  console.log('B Return final');
  return NextResponse.json(updateCurrentUserFriends.friendIds);
}
