import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getCurrentUserBookshelves() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const currentUserWithBookshelves = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      include: {
        bookshelves: true,
      },
    });
    if (!currentUserWithBookshelves) {
      return null;
    }
    return currentUserWithBookshelves.bookshelves;
  } catch (err: any) {
    throw new Error(err);
  }
}
