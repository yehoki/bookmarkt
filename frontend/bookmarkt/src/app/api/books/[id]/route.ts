import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';

import prisma from '@/lib/prismadb';
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
    throw new Error('Invalid book ID');
  }

  // let currentUserBooks = [...(currentUser.bookIds || [])];
  // const bookInDb = await prisma.book.findMany({
  //   where: {
  //     googleId: bookGoogleId,
  //   },
  // });
}
