import prisma from '@/lib/prismadb';

export default async function getUserById(userId: string) {
  if (userId === '') {
    console.log('UserId cannot be empty');
    return null;
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        reviews: true,
        bookshelves: true,
        bookData: true,
      },
    });
    if (!user) {
      console.log('Could not find user with this id');
      return null;
    }
    return user;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
