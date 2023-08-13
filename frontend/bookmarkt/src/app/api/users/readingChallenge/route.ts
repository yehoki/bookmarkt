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
  console.log(body, target, typeof target);
  if (!target || typeof target !== 'number') {
    return NextResponse.error();
  }
  console.log('POST');
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
  console.log('POST 2');
  if (!setUserReadingChallenge) {
    return NextResponse.error();
  }
  console.log('POST 3');
  return NextResponse.json(setUserReadingChallenge);
}
