import prisma from '@/lib/prismadb';
import getCurrentUser from '../getCurrentUser';

export async function getUserBooksByBookshelf(bookshelfName: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }
    const currentUserBookshelfBooks = await prisma.bookshelf.findFirst({
      where: {
        userId: currentUser.id,
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

    if (!currentUserBookshelfBooks) {
      return null;
    }
    return currentUserBookshelfBooks;
  } catch (err: any) {
    throw new Error(err);
  }
}
