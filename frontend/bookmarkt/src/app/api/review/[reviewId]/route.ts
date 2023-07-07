import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
// GET gets the review with a specific ID

interface IParams {
  reviewId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const reviewId = params.reviewId;
  if (!reviewId || typeof reviewId !== 'string') {
    throw new Error('Invalid review ID');
  }
  const review = await prisma.review.findFirst({
    where: {
      id: reviewId,
    },
  });
  if (review) {
    return NextResponse.json(review);
  }
  return NextResponse.error();
}
