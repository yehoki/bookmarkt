import prisma from '@/lib/prismadb';

export default async function getUserBooks(userId: string) {
  try {
    const currentUserBooks = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        bookData: true,
      },
    });
    if (!currentUserBooks) {
      throw new Error('Books could not be retrieved');
    }
    return currentUserBooks.bookData;
  } catch (err: any) {
    throw new Error(err);
  }
}
