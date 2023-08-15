import prisma from '@/lib/prismadb';

export default async function getUserBooks(
  userId: string,
  page?: 0,
  perPage?: 20
) {
  try {
    const currentUserBooks = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        bookData: {
          skip: page ? page : 0,
          take: perPage ? perPage : 20,
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
