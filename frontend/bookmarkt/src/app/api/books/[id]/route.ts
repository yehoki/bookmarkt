import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import BookModel from '@/models/book';
import { errorHandler } from '@/utils/errorHandler';
import getCurrentUser from '@/actions/getCurrentUser';

import prisma from '@/lib/prismadb';

export async function GET(req: Request) {
  await dbConnect();
  const id = req.url.slice(req.url.lastIndexOf('/') + 1);
  try {
    const book = await BookModel.findById(id);
    return NextResponse.json(book);
  } catch (err) {
    if (err instanceof Error) {
      return errorHandler(err);
    }
    return NextResponse.json({ error: err });
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  const id = req.url.slice(req.url.lastIndexOf('/') + 1);
  try {
    const deleteBook = await BookModel.findByIdAndRemove(id);
    return NextResponse.json(deleteBook);
  } catch (err) {
    return NextResponse.json({
      error: `There was an error deleting book with id: ${id} `,
    });
  }
  //
}

interface IParams {
  bookGoogleId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { bookGoogleId } = params;
  if (!bookGoogleId || typeof bookGoogleId !== 'string') {
    throw new Error('Inavlid book ID');
  }

  let currentUserBooks = [...(currentUser.bookIds || [])];
  const bookInDb = await prisma.book.findMany({
    where: {
      googleId: bookGoogleId,
    },
  });
}
