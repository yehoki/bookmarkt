import prisma from '@/lib/prismadb';

export async function getUsersBooksFromBookshelf(
  bookshelfName: string,
  userId: string
) {
  try {
    const userBookshelfBooks = await prisma.bookshelf.findFirst({
      where: {
        userId: userId,
        name: bookshelfName,
      },
      select: {
        googleBooks: {
          select: {
            googleBookId: true,
          },
        },
      },
    });

    if (!userBookshelfBooks) {
      return null;
    }
    return userBookshelfBooks;
  } catch (err: any) {
    throw new Error(err);
  }
}
