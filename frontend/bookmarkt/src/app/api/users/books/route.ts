import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { BookshelfBooks } from '@prisma/client';

// Gets the currentUser's bookList
export async function GET(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    console.log('No current user');
    return NextResponse.json({
      message: 'No user',
    });
  }

  const currentUserBooks = await prisma.user.findFirst({
    where: {
      id: currentUser.id,
    },
    select: {
      bookData: true,
    },
  });

  if (!currentUserBooks) {
    return NextResponse.json({ books: [] });
  }
  return NextResponse.json(currentUserBooks);
}

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await req.json();
  const { id, title } = body;
  if (!id || !title) {
    return NextResponse.error();
  }

  const findBookData = await prisma.bookData.findFirst({
    where: {
      googleId: id,
    },
  });

  const currentBooks = [...(currentUser.googleBookIds || [])];

  const wantToReadBookshelf = await prisma.bookshelf.findFirst({
    where: {
      userId: currentUser.id,
      name: 'Want to read',
    },
  });
  if (!wantToReadBookshelf) {
    return NextResponse.error();
  }
  const wantToReadBooks = wantToReadBookshelf
    ? wantToReadBookshelf.googleBooks
    : [];

  if (!findBookData) {
    const newBookData = await prisma.bookData.create({
      data: {
        googleId: id,
        reviewData: {
          averageReview: 0,
          totalReviews: 0,
        },
      },
    });
    const newWantToRead: BookshelfBooks = {
      googleBookId: newBookData.googleId,
      addedToBookShelfAt: new Date(),
    };
    wantToReadBooks.push(newWantToRead);
    currentBooks.push(newBookData.googleId);

    const updateUserBooks = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        googleBookIds: currentBooks,
      },
    });

    const updateBookshelf = await prisma.bookshelf.update({
      where: {
        id: wantToReadBookshelf.id,
      },
      data: {
        googleBooks: wantToReadBooks,
      },
    });
    return NextResponse.json({
      user: { ...updateUserBooks },
      bookData: { ...newBookData },
    });
  }

  if (!currentUser.googleBookIds.includes(findBookData.googleId)) {
    const wantToRead: BookshelfBooks = {
      googleBookId: findBookData.googleId,
      addedToBookShelfAt: new Date(),
    };
    wantToReadBooks.push(wantToRead);
    currentBooks.push(findBookData.googleId);
    const updateUserBooks = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        googleBookIds: currentBooks,
      },
    });
    const updateBookshelf = await prisma.bookshelf.update({
      where: {
        id: wantToReadBookshelf.id,
      },
      data: {
        googleBooks: wantToReadBooks,
      },
    });
    return NextResponse.json({
      user: { ...updateUserBooks },
      bookData: { ...findBookData },
    });
  }
}
