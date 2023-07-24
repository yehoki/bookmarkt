import getCurrentUser from '@/actions/getCurrentUser';
import { getSingleBook } from '@/actions/getSingleBook';
import prisma from '@/lib/prismadb';
import { BookshelfBooks } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
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
  const ISBN = googleBook.volumeInfo.industryIdentifiers.find(
    (isbn) => isbn.type === 'ISBN_13'
  );

  const bookISBN = ISBN ? ISBN.identifier : '';

  const newBook = await prisma.book.create({
    data: {
      googleId: googleId,
      title: googleBook.volumeInfo.title,
      subtitle: googleBook.volumeInfo.subtitle
        ? googleBook.volumeInfo.subtitle
        : '',
      author: googleBook.volumeInfo.authors,
      description: googleBook.volumeInfo.description
        ? googleBook.volumeInfo.description
        : '',
      publishedDate: googleBook.volumeInfo.publishedDate
        ? googleBook.volumeInfo.publishedDate
        : '',
      imageLinks: googleBook.volumeInfo.imageLinks
        ? googleBook.volumeInfo.imageLinks
        : {},
      reviewData: {
        averageReview: 0,
        totalReviews: 0,
      },
      ISBN: bookISBN,
    },
  });

  const updatedUserBooks = [...currentUser.bookIds, newBook.id] || [];

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
    bookId: newBook.id,
    addedToBookShelfAt: new Date(),
  };
  const bookshelfBooks = [...getNewBookshelf.books, newBookshelfBook];

  // only add book to user's books if the bookshelf is found
  const updateUserBooks = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      bookIds: updatedUserBooks,
    },
  });

  const updateUserBookshelf = await prisma.bookshelf.update({
    where: {
      id: getNewBookshelf.id,
    },
    data: {
      books: bookshelfBooks,
    },
  });
  return NextResponse.json(updateUserBookshelf);
}

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
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

  const bookFromGoogleId = await prisma.book.findFirst({
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
    oldBookshelf.books.filter(
      (bookshelfBook) => bookshelfBook.bookId !== bookFromGoogleId.id
    );

  const newBook: BookshelfBooks = {
    bookId: bookFromGoogleId.id,
    addedToBookShelfAt: new Date(),
  };
  const newBookshelfBookIdsPostAppend: BookshelfBooks[] = [
    ...newBookshelf.books,
    newBook,
  ];

  const updateOldBookshelf = await prisma.bookshelf.update({
    where: {
      id: oldBookshelf.id,
    },
    data: {
      books: oldBookshelfBookIdsPostRemoval,
    },
  });
  const updateNewBookshelf = await prisma.bookshelf.update({
    where: {
      id: newBookshelf.id,
    },
    data: {
      books: newBookshelfBookIdsPostAppend,
    },
  });
  return NextResponse.json({ message: 'Update successful' });
}
