import dbConnect from '@/lib/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import BookModel, { BookType } from '@/models/book';
import { revalidateTag } from 'next/cache';
import { errorHandler } from '@/utils/errorHandler';

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const books = await BookModel.find({});
    if (books) {
      return NextResponse.json(books);
    } else {
      return NextResponse.json({ error: 'Cannot find any books' });
    }
  } catch (err) {
    if (err instanceof Error) {
      return errorHandler(err);
    }
    return NextResponse.json({ error: err });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  const { title, author }: Partial<BookType> = await req.json();
  console.log(title, author);
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
