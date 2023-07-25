import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await prisma.review.deleteMany({});
    await prisma.bookshelf.deleteMany({});
    await prisma.bookData.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.account.deleteMany({});
    return NextResponse.json({ message: 'Done deleting' });
  } catch (exc) {
    console.log(exc);
    return NextResponse.json({ message: 'something went wrong' });
  }
}
