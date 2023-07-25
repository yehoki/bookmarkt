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
      googleId: 'qAY4jgEACAAJ',
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

  const findOneBookshelf = await prisma.bookshelf.findFirst({
    where: {
      userId: currentUser.id,
      name: 'Currently reading',
    },
  });

  if (!findOneBookshelf) {
    return NextResponse.error();
  }

  const updateOneBookshelf = await prisma.bookshelf.update({
    where: {
      id: findOneBookshelf.id,
    },
    data: {
      googleBooks: [
        {
          googleBookId: 'yng_CwAAQBAJ',
          addedToBookShelfAt: new Date(),
        },
      ],
    },
  });
  return NextResponse.json(updateOneBookshelf);
}
