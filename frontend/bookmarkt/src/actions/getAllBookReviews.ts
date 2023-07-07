import prisma from '@/lib/prismadb';

export default async function getAllBookReviews(googleId: string) {
  try {
    const bookForReviews = await prisma.book.findFirst({
      where: {
        googleId: googleId,
      },
      select: {
        reviews: true,
      },
    });
    if (!bookForReviews) {
      return [];
    }
    return bookForReviews.reviews;
  } catch (err: any) {
    throw new Error(err);
  }
}
