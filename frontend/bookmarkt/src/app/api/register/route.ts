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
      bookshelves: [
        {
          name: 'Read',
          bookIds: [],
          isDefault: true,
        },
        {
          name: 'Currently reading',
          bookIds: [],
          isDefault: true,
        },
        {
          name: 'Want to read',
          bookIds: [],
          isDefault: true,
        },
      ],
    },
  });
  return NextResponse.json(user);
}
