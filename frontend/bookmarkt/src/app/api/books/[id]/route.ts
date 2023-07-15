import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';

import prisma from '@/lib/prismadb';
// id === Google Book ID
interface IParams {
  id: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const bookId = params.id;
  if (!bookId || typeof bookId !== 'string') {
    throw new Error('Invalid book ID');
  }
  const findBook = await prisma.book.findFirst({
    where: {
      googleId: bookId,
    },
  });
  if (!findBook) {
    return NextResponse.error();
  }
  return NextResponse.json(findBook);
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { id } = params;
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid book ID');
  }

  const findBook = await prisma.book.findFirst({
    where: {
      googleId: id,
    },
  });

  // Prevents duplicate book post
  if (findBook) {
    return NextResponse.error();
  }

  const body = await req.json();
  const {
    title,
    subtitle,
    authors,
    description,
    imageLinks,
    publishedDate,
    ISBN,
  } = body;

  if (!title) {
    return NextResponse.error();
  }

  const newBook = await prisma.book.create({
    data: {
      googleId: id,
      title: title,
      subtitle: subtitle,
      author: authors,
      description: description,
      publishedDate: publishedDate,
      imageLinks: imageLinks,
      reviewData: {
        averageReview: 0,
        totalReviews: 0,
      },
      ISBN: ISBN,
    },
  });
  return NextResponse.json(newBook);
  // let currentUserBooks = [...(currentUser.bookIds || [])];
  // const bookInDb = await prisma.book.findMany({
  //   where: {
  //     googleId: bookGoogleId,
  //   },
  // });
}
