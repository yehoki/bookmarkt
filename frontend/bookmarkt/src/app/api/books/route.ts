import dbConnect from '@/lib/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import BookModel from '@/models/book';
export async function GET(req: Request) {
  await dbConnect();
  try {
    const books = await BookModel.find({});
    if (books) {
      return NextResponse.json(books);
    } else {
      return NextResponse.json({ error: 'Cannot find any books' });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json('Testing, mongo connected');
  }
}
