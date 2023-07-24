import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export async function getUserBooksByBookshelf(bookshelfName: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }
    const currentUserBookshelf = await prisma.bookshelf.findFirst({
      where: {
        userId: currentUser.id,
        name: bookshelfName,
      },
    });

    if (!currentUserBookshelf) {
      return null;
    }
    const bookIds = currentUserBookshelf.books.map((book) => book.bookId);

    const booksInBookshelf = await prisma.book.findMany({
      where: {
        id: {
          in: bookIds,
        },
      },
    });

    if (!booksInBookshelf) {
      return null;
    }

    return booksInBookshelf;
  } catch (err: any) {
    throw new Error(err);
  }
}
