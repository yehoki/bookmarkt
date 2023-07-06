import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getBookReview(bookId: string) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error('Could not get user');
    }
    const findBookId = await prisma.book.findFirst({
      where: {
        googleId: bookId,
      },
      select: {
        id: true,
      },
    });
    const userReviews = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        reviews: true,
      },
    });
    if (userReviews && userReviews.reviews && findBookId && findBookId.id) {
      return userReviews.reviews.filter(
        (review) => review.bookId === findBookId.id
      );
    } else if (userReviews && userReviews.reviews){
      return [];
    }
    throw new Error('Something went wrong');
  } catch (err: any) {
    throw new Error(err);
  }
}
