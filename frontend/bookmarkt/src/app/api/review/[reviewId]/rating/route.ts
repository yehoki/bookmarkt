import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';


interface IParams {
  reviewId: string;
}

// Finds the review with id equal to reviewId and deletes it

// Initially meant to only remove rating
// Rating is required in a review - would need a change of schema and refactoring

export async function DELETE(req: Request, {params}: {params: IParams}) {
  const reviewId = params.reviewId;
  if (!reviewId || typeof reviewId !== 'string') {
    throw new Error('Invalid review ID');
  }
  const deleteReview = await prisma.review.delete({
    where: {
      id: reviewId,
    }
  })
  console.log(deleteReview);
  return NextResponse.json(deleteReview)
}