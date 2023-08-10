import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getCurrentUserFriends() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }
    const currentUserFriends = await prisma.user.findFirst({
      where: {
        id: currentUser.id,
      },
      select: {
        friends: true,
      },
    });

    if (!currentUserFriends) {
      return null;
    }
    return currentUserFriends.friends;
  } catch (err) {
    console.log(err);
  }
}
