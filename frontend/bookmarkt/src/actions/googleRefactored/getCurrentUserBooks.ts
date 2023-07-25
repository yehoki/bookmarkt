import prisma from '@/lib/prismadb';
import getCurrentUser from '../getCurrentUser';

export default async function getCurrentUserBooks() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return {
      books: [],
      reviews: [],
    };
  }

  try {
    const currentUserBooks = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      select: {
        bookData: true,
        reviews: true,
      },
    });
    if (!currentUserBooks) {
      throw new Error('Books could not be retrieved for the current user');
    }
    return currentUserBooks;
  } catch (err:any) {
    throw new Error(err)
  }
}
