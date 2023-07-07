import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
interface IParams {
  userId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const userId = params.userId;
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user ID');
  }

  const userBooks = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      books: true,
    },
  });
  if (!userBooks) {
    return NextResponse.error();
  }
  return NextResponse.json(userBooks.books);
}
