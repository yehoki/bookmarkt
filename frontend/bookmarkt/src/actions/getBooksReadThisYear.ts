import prisma from '@/lib/prismadb';
import getCurrentUser, { getSession } from './getCurrentUser';
import { BookshelfBooks } from '@prisma/client';

export default async function getBooksReadThisYear() {
  try {
    // const session = await getSession();

    const currentUser = await getCurrentUser();
    if(!currentUser) {
      return null;
    }

    // const booksReadThisYear = await prisma.user.findUnique({
    //   where: {
    //     email: session.user.email,
    //   },
    //   include: {
    //     bookshelves: {
    //         orderBy: {
    //           books: {''}
    //         }
    //       },
    //     }
    //   },
    // });

    const allReadBooks = await prisma.bookshelf.findFirst({
      where: {
        userId: currentUser.id,
        name: 'Read'
      },
    })

    if (!allReadBooks){
      return null;
    }

    const currentYear = new Date().getFullYear();
    const booksReadFromThisYear = allReadBooks.books.filter((book) => book.addedToBookShelfAt.getFullYear() === currentYear);
    return booksReadFromThisYear;
  } catch (err: any) {
    throw new Error(err);
  }
}
