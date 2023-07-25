import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getCurrentUserBooks() {
  const session = await getCurrentUser();
  if (!session) {
    return {
      books: [],
      reviews: [],
    };
  }
  try {
    const currentUserBooks = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        books: true,
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
