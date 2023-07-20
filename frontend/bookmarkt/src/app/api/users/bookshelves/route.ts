import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { currentBookshelf, nextBookshelf, bookId } = body;
  if (!currentBookshelf || !nextBookshelf || !bookId) {
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
  const oldBookshelf = currentUserBookshelves.bookshelves.find(
    (bookshelf) => bookshelf.name === currentBookshelf
  );
  const newBookshelf = currentUserBookshelves.bookshelves.find(
    (bookshelf) => bookshelf.name === nextBookshelf
  );

  if (!oldBookshelf || !newBookshelf) {
    return NextResponse.error();
  }

  const oldBookshelfBookIdsPostRemoval: string[] = oldBookshelf.bookIds.filter(
    (bookshelfBookId) => bookshelfBookId !== bookFromGoogleId.id
  );
  const newBookshelfBookIdsPostAppend: string[] = [
    ...newBookshelf.bookIds,
    bookFromGoogleId.id,
  ];

  const updateOldBookshelf = await prisma.bookshelf.update({
    where: {
      id: oldBookshelf.id,
    },
    data: {
      bookIds: oldBookshelfBookIdsPostRemoval,
    },
  });
  const updateNewBookshelf = await prisma.bookshelf.update({
    where: {
      id: newBookshelf.id,
    },
    data: {
      bookIds: newBookshelfBookIdsPostAppend,
    },
  });
  return NextResponse.json({ message: 'Update successful' });
}
