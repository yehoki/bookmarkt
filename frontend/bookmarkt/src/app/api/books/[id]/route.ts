import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import BookModel from '@/models/book';

export async function GET(req: Request) {
  await dbConnect();
  const id = req.url.slice(req.url.lastIndexOf('/') + 1);
  try {
    const book = await BookModel.findById(id);
    return NextResponse.json(book);
  } catch (exc) {
    return NextResponse.json({ error: 'error' });
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  const id = req.url.slice(req.url.lastIndexOf('/') + 1);
  try {
    const deleteBook = await BookModel.findByIdAndRemove(id);
    return NextResponse.json(deleteBook);
  } catch (exc) {
    return NextResponse.json({
      error: `There was an error deleting book with id: ${id} `,
    });
  }
  //
}
