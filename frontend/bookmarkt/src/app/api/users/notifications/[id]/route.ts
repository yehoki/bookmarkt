import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  id: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const userId = params.id;
  if (!userId || typeof userId !== 'string' || userId === '') {
    return NextResponse.error();
  }

  const userNotifications = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      notifications: true,
    },
  });
  console.log(userNotifications)
  if (userNotifications) {
    return NextResponse.json(userNotifications);
  }
  return NextResponse.error();
}
