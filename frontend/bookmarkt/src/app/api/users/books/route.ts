import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

// Gets the currentUser's bookList
export async function GET(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const currentUserBooks = await prisma.user.findFirst({
    where: {
      id: currentUser.id,
    },
    select: {
      books: true,
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
  const {
    id,
    title,
    subtitle,
    author,
    description,
    imageLinks,
    publishedDate,
  } = body;
  if (!id || !title) {
    return NextResponse.error();
  }

  const findBook = await prisma.book.findFirst({
    where: {
      googleId: id,
    },
  });

  const currentBooks = [...(currentUser.bookIds || [])];

  if (!findBook) {
    // When the new book does not exist
    const newBook = await prisma.book.create({
      data: {
        googleId: id,
        title: title,
        subtitle: subtitle,
        author: author,
        description: description,
        publishedDate: publishedDate,
        imageLinks: imageLinks,
        reviewData: {
          averageReview: 0,
          totalReviews: 0,
        },
      },
    });
    currentBooks.push(newBook.id);
    const updateUserBooks = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        bookIds: currentBooks,
      },
    });
    return NextResponse.json({
      user: { ...updateUserBooks },
      book: { ...newBook },
    });
  }

  if (!currentUser.bookIds.includes(findBook.id)) {
    currentBooks.push(findBook.id);
    const updateUserBooks = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        bookIds: currentBooks,
      },
    });
    return NextResponse.json({
      user: { ...updateUserBooks },
      book: { ...findBook },
    });
  }
}
