import dbConnect from '@/lib/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import BookModel, { BookType } from '@/models/book';
import { revalidateTag } from 'next/cache';
import { errorHandler } from '@/utils/errorHandler';
import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

export async function GET(req: NextRequest) {
  try {
    const books = await prisma.book.findMany({});
    return NextResponse.json(books);
  } catch (err: any) {
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, author }: Partial<BookType> = await req.json();
  console.log(title, author);

  // const {title, author}

  if (!title || !author) {
    return NextResponse.json({ message: 'Missing required data' });
  }
  const book: Partial<BookType> = {
    title,
    author,
  };
  try {
    const savedBook = await BookModel.create(book);
    return NextResponse.json(savedBook);
  } catch (err) {
    if (err instanceof Error) {
      return errorHandler(err);
    }
    return NextResponse.json({ error: err });
  }
}
