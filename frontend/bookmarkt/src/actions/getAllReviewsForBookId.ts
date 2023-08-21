import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getAllReviewsForBookId(bookId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const findAllReviews = await prisma.review.findMany({
      where: {
        googleBookId: bookId,
      },
    });

    if (findAllReviews.length === 0) {
      return null;
    }

    return findAllReviews;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
