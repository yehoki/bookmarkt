import prisma from '@/lib/prismadb';
import getCurrentUser from '../getCurrentUser';

export default async function getBookReview(bookId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Could not get user');
    }
    const findBookId = await prisma.bookData.findFirst({
      where: {
        googleId: bookId,
      },
      select: {
        googleId: true,
      },
    });
    const userReviews = await prisma.user.findFirst({
      where: {
        id: currentUser.id,
      },
      select: {
        reviews: true,
      },
    });
    if (userReviews && userReviews.reviews && findBookId && findBookId.googleId) {
      return userReviews.reviews.filter(
        (review) => review.googleBookId === findBookId.googleId
      );
    } else if (userReviews && userReviews.reviews) {
      return [];
    }
    throw new Error('Something went wrong');
  } catch (err: any) {
    throw new Error(err);
  }
}
