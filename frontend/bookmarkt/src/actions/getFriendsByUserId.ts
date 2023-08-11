import prisma from '@/lib/prismadb';

export default async function getFriendsByUserId(userId: string) {
  try {
    const userFriends = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        friends: true,
      },
    });

    if (!userFriends) {
      return null;
    }

    return userFriends.friends;
  } catch (err) {
    console.log(err);
  }
}
