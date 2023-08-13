import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { ReadingChallenge } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { target } = body;
  if (!target || typeof target !== 'number') {
    return NextResponse.error();
  }
  const readingChallengeInfo: ReadingChallenge = {
    target: target,
    current: 0,
  };
  const setUserReadingChallenge = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      readingChallenge: readingChallengeInfo,
    },
  });
  if (!setUserReadingChallenge) {
    return NextResponse.error();
  }
  return NextResponse.json(setUserReadingChallenge);
}
