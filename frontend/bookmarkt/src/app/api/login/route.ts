import dbConnect from '@/lib/dbConnect';
import UserModel, { UserType } from '@/models/user';
import { NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  await dbConnect();

  const { username, password }: Partial<UserType> = await req.json();
  if (!username || !password) {
    return NextResponse.json({
      message: 'Missing login parameters',
    });
  }
  try {
    const user = await UserModel.findOne({ username });
    const checkPassword =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!(user && checkPassword)) {
      return new NextResponse(null, {
        status: 401,
        statusText: 'Invalid username or password',
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({
      error: err,
      message: 'Something went wrong when logging in',
    });
  }
}
