import prisma from '@/lib/prismadb';

export default async function getUserBooks(userId: string) {
  try {
    const currentUserBooks = await prisma.user.findMany({
      where: {
        id: userId,
      },
      select: {
        books: true,
      },
    });
    if (!currentUserBooks) {
      throw new Error('Books could not be retrieved');
    }
    const returnBooks = currentUserBooks[0].books.map((book) => ({
      ...book,
    }));
    return returnBooks;
  } catch (err: any) {
    throw new Error(err);
  }
}
