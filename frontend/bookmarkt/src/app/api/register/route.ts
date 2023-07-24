import bcrypt from 'bcrypt';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  const defaultBookshelves = await prisma.bookshelf.createMany({
    data: [
      {
        name: 'Read',
        books: [],
        isDefault: true,
        userId: user.id,
      },
      {
        name: 'Currently reading',
        books: [],
        isDefault: true,
        userId: user.id,
      },
      {
        name: 'Want to read',
        books: [],
        isDefault: true,
        userId: user.id,
      },
    ],
  });

  const userBookshelves = await prisma.bookshelf.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  const userBookshelfIds = userBookshelves.map((bookshelf) => bookshelf.id);

  const updateUserBookshelfIds = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      bookshelfIds: [...userBookshelfIds] || [],
    },
  });

  return NextResponse.json(user);
}
