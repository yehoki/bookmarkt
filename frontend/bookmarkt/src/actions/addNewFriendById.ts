import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function addNewFriendById(userId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      console.log('No current user detected');
      return null;
    }

    const getUserIdFriendIds = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        friendIds: true,
      },
    });
    if (!getUserIdFriendIds) {
      console.log(`Could not find a user with user id ${userId}`);
      return null;
    }

    const currentUserNewFriendIds = [...currentUser.friendIds] || [];
    const newFriendsFriendIds = [...getUserIdFriendIds.friendIds] || [];

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
  } catch (err: any) {
    console.log(err);
  }
}
