import prisma from '@/lib/prismadb';
import { handleDeleteReview } from '@/utils/helper';
import { update } from 'lodash';
import { NextResponse } from 'next/server';

interface IParams {
  reviewId: string;
}

// Finds the review with id equal to reviewId and deletes it

// Initially meant to only remove rating
// Rating is required in a review - would need a change of schema and refactoring

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const reviewId = params.reviewId;
  if (!reviewId || typeof reviewId !== 'string') {
    throw new Error('Invalid review ID');
  }
  const deleteReview = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
  // Edit the book's review data
  const findGoogleBook = await prisma.bookData.findFirst({
    where: {
      googleId: deleteReview.googleBookId,
    },
  });
  if (!findGoogleBook) {
    return NextResponse.error();
  }

  const updateBookReviewData = await prisma.bookData.update({
    where: {
      googleId: findGoogleBook.googleId,
    },
    data: {
      reviewData: {
        totalReviews: findGoogleBook.reviewData.totalReviews - 1,
        averageReview: handleDeleteReview(
          findGoogleBook.reviewData.totalReviews,
          findGoogleBook.reviewData.averageReview,
          deleteReview.rating
        ),
      },
    },
  });
  if (!updateBookReviewData) {
    return NextResponse.error();
  }
  return NextResponse.json(updateBookReviewData);

}
