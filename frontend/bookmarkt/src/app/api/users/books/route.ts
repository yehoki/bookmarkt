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
