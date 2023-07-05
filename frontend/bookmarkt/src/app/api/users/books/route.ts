import getCurrentUser, { getSession } from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // const currentUserBooks = await prisma.user.findMany({
    //   where: {
    //     id: currentUser.id,
    //   },
    //   select: {
    //     books: true,
    //   },
    // });
    return NextResponse.json([]);
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function POST(req: NextRequest) {
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
    const newBook = await prisma.book.create({
      data: {
        googleId: id,
        title: title,
        subtitle: subtitle,
        author: author,
        description: description,
        publishedDate: publishedDate,
        imageLinks: imageLinks,
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

  return NextResponse.json({ message: 'Something went wrong' });
}
