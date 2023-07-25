import prisma from '@/lib/prismadb';
import getCurrentUser, { getSession } from '../getCurrentUser';
import { BookshelfBooks } from '@prisma/client';

export default async function getBooksReadThisYear() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }
    const allReadBooks = await prisma.bookshelf.findFirst({
      where: {
        userId: currentUser.id,
        name: 'Read',
      },
    });
    if (!allReadBooks) {
      return null;
    }
    const currentYear = new Date().getFullYear();
    const booksReadFromThisYear = allReadBooks.googleBooks.filter(
      (book) => book.addedToBookShelfAt.getFullYear() === currentYear
    );
    return booksReadFromThisYear;
  } catch (err: any) {
    throw new Error(err);
  }
}
