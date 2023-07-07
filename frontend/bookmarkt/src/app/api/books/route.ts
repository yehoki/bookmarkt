import {  NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

// Retrieves all the books currently in the DB
export async function GET(req: Request) {
  const allBooks = await prisma.book.findMany({});
  if (!allBooks) {
    return NextResponse.error();
  }
  return NextResponse.json(allBooks);
}
