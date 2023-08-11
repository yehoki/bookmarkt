import prisma from '@/lib/prismadb';

export default async function getUserBooks(userId: string) {
  try {
    const currentUserBooks = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        bookData: true,
        reviews: true,
      },
    });
    if (!currentUserBooks) {
      throw new Error('Books could not be retrieved');
    }
    return currentUserBooks;
  } catch (err: any) {
    throw new Error(err);
  }
}
