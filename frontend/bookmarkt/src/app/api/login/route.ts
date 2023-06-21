import dbConnect from '@/lib/dbConnect';
import UserModel, { UserType } from '@/models/user';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '@/utils/config';
import { errorHandler } from '@/utils/errorHandler';
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
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, JWT_SECRET, {
      expiresIn: 4 * 60 * 60,
    });
    return NextResponse.json({
      ...userForToken,
      token,
    });
  } catch (err) {
    if (err instanceof Error) {
      return errorHandler(err);
    }
    return NextResponse.json({
      error: err,
      message: 'Something went wrong when logging in',
    });
  }
}
