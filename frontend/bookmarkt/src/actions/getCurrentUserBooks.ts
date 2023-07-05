import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getCurrentUserBooks() {
  const session = await getCurrentUser();
  if (!session) {
    return [];
  }
  try {
    const currentUserBooks = await prisma.user.findMany({
      where: {
        id: session?.id,
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
