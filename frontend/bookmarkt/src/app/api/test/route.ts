import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const newBook = await prisma.bookData.create({
    data: {
      reviewData: {
        averageReview: 0,
        totalReviews: 0,
      },
      googleId: 'yng_CwAAQBAJ',
    },
  });

  if (!newBook) {
    return NextResponse.error();
  }
  const updateUserBooks = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      googleBookIds: [...currentUser.googleBookIds, newBook.googleId],
    },
  });
  return NextResponse.json(updateUserBooks);
}
