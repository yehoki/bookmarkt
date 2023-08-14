import getCurrentUser from '@/actions/getCurrentUser';
import { getSingleBook } from '@/actions/getSingleBook';
import prisma from '@/lib/prismadb';
import { BookshelfBooks } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    console.log('No current user');
    return NextResponse.json({
      message: 'Need to login',
    });
  }
  const body = await req.json();
  const { googleId, newBookshelf } = body;
  if (!googleId || !newBookshelf) {
    return NextResponse.error();
  }

  const googleBook = await getSingleBook(googleId);
  if (!googleBook) {
    return NextResponse.error();
  }

  const checkIfBookExists = await prisma.bookData.findFirst({
    where: {
      googleId: googleId,
    },
  });

  if (!checkIfBookExists) {
    const newBookData = await prisma.bookData.create({
      data: {
        googleId: googleId,
        reviewData: {
          totalReviews: 0,
          averageReview: 0,
        },
      },
    });

    const updatedUserBooks =
      [...currentUser.googleBookIds, newBookData.googleId] || [];

    const getNewBookshelf = await prisma.bookshelf.findFirst({
      where: {
        userId: currentUser.id,
        name: newBookshelf,
      },
    });
    if (!getNewBookshelf) {
      return NextResponse.error();
    }

    const newBookshelfBook: BookshelfBooks = {
      googleBookId: newBookData.googleId,
      addedToBookShelfAt: new Date(),
    };
    const bookshelfBooks = [...getNewBookshelf.googleBooks, newBookshelfBook];

    // only add book to user's books if the bookshelf is found
    const updateUserBooks = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        googleBookIds: updatedUserBooks,
      },
    });

    const updateUserBookshelf = await prisma.bookshelf.update({
      where: {
        id: getNewBookshelf.id,
      },
      data: {
        googleBooks: bookshelfBooks,
      },
    });
    return NextResponse.json(updateUserBookshelf);
  }

  const updatedUserBooks =
    [...currentUser.googleBookIds, checkIfBookExists.googleId] || [];

  const getNewBookshelf = await prisma.bookshelf.findFirst({
    where: {
      userId: currentUser.id,
      name: newBookshelf,
    },
  });
  if (!getNewBookshelf) {
    return NextResponse.error();
  }

  const newBookshelfBook: BookshelfBooks = {
    googleBookId: checkIfBookExists.googleId,
    addedToBookShelfAt: new Date(),
  };
  const bookshelfBooks = [...getNewBookshelf.googleBooks, newBookshelfBook];

  // only add book to user's books if the bookshelf is found
  const updateUserBooks = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      googleBookIds: updatedUserBooks,
    },
  });

  const updateUserBookshelf = await prisma.bookshelf.update({
    where: {
      id: getNewBookshelf.id,
    },
    data: {
      googleBooks: bookshelfBooks,
    },
  });
  return NextResponse.json(updateUserBookshelf);
}

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    console.log('No current user');
    return NextResponse.json({
      message: 'Need to login',
    });
  }

  const body = await req.json();
  const { currentBookshelf, nextBookshelf, bookId } = body;
  if (!currentBookshelf || !nextBookshelf || !bookId) {
    return NextResponse.error();
  }

  const currentUserBookshelves = await prisma.user.findFirst({
    where: {
      id: currentUser.id,
    },
    select: {
      bookshelves: true,
    },
  });
  if (!currentUserBookshelves || !currentUserBookshelves.bookshelves) {
    return NextResponse.error();
  }

  const bookFromGoogleId = await prisma.bookData.findFirst({
    where: {
      googleId: bookId,
    },
  });

  if (!bookFromGoogleId) {
    return NextResponse.error();
  }
  const oldBookshelf = currentUserBookshelves.bookshelves.find(
    (bookshelf) => bookshelf.name === currentBookshelf
  );
  const newBookshelf = currentUserBookshelves.bookshelves.find(
    (bookshelf) => bookshelf.name === nextBookshelf
  );

  if (!oldBookshelf || !newBookshelf) {
    return NextResponse.error();
  }

  const oldBookshelfBookIdsPostRemoval: BookshelfBooks[] =
    oldBookshelf.googleBooks.filter(
      (bookshelfBook) =>
        bookshelfBook.googleBookId !== bookFromGoogleId.googleId
    );

  const newBook: BookshelfBooks = {
    googleBookId: bookFromGoogleId.googleId,
    addedToBookShelfAt: new Date(),
  };
  const newBookshelfBookIdsPostAppend: BookshelfBooks[] = [
    ...newBookshelf.googleBooks,
    newBook,
  ];

  const updateOldBookshelf = await prisma.bookshelf.update({
    where: {
      id: oldBookshelf.id,
    },
    data: {
      googleBooks: oldBookshelfBookIdsPostRemoval,
    },
  });
  const updateNewBookshelf = await prisma.bookshelf.update({
    where: {
      id: newBookshelf.id,
    },
    data: {
      googleBooks: newBookshelfBookIdsPostAppend,
    },
  });
  return NextResponse.json({ message: 'Update successful' });
}
