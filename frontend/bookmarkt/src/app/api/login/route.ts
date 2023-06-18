import dbConnect from '@/lib/dbConnect';
import UserModel, { UserType } from '@/models/user';
import { NextResponse } from 'next/server';

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
    if (password !== user.password) {
      return NextResponse.json({ message: 'Incorrect password' });
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({
      error: err,
      message: 'Something went wrong when logging in',
    });
  }
}
