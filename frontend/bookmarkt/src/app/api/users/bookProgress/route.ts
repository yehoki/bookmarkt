import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { googleBookId, bookProgress, comment } = body;
  if (!googleBookId || !bookProgress || typeof bookProgress !== 'number') {
    return NextResponse.error();
  }

  // find the currentUser's book progress if exists

  const findBookProgress = currentUser.bookProgress.find(
    (book) => book.googleBookId === googleBookId
  );

  const updatedBookProgress = {
    googleBookId: googleBookId,
    bookProgress: bookProgress,
    comment: comment && typeof comment === 'string' ? comment : undefined,
  };

  if (findBookProgress) {
    const filterBookProgress = currentUser.bookProgress.filter(
      (book) => book.googleBookId !== googleBookId
    );

    const updateBookProgress = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        bookProgress: [...filterBookProgress, updatedBookProgress] || [
          updatedBookProgress,
        ],
      },
    });
    return NextResponse.json(updateBookProgress);
  }
  const updateBookProgress = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      bookProgress: [...currentUser.bookProgress, updatedBookProgress] || [
        updatedBookProgress,
      ],
    },
  });
  return NextResponse.json(updateBookProgress);
}
