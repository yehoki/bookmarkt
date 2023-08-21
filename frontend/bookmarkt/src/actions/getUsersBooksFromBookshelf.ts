import prisma from '@/lib/prismadb';

export async function getUsersBooksFromBookshelf(
  bookshelfName: string,
  userId: string,
  page = 0,
  perPage = 20
) {
  try {
    const userBookshelfBooks = await prisma.bookshelf.findFirst({
      where: {
        userId: userId,
        name: bookshelfName,
      },
      select: {
        googleBooks: true,
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
