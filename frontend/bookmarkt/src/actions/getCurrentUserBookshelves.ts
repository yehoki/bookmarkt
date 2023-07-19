import prisma from '@/lib/prismadb';
import { getSession } from './getCurrentUser';

export default async function getCurrentUserBookshelves() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUserWithBookshelves = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
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
