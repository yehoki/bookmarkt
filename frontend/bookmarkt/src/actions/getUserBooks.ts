import prisma from '@/lib/prismadb';

export default async function getUserBooks(
  userId: string,
  page = 0,
  perPage = 20
) {
  try {
    const currentUserBooks = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        bookData: {
          skip: page === 0 ? 0 : (page - 1) * perPage,
          take: perPage,
        },
        bookProgress: true,
        reviews: true,
      },
    });
    if (!currentUserBooks) {
      return null;
    }
    return currentUserBooks;
  } catch (err: any) {
    throw new Error(err);
  }
}
