import { UserType } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/user';
import bcrypt from 'bcrypt';

export async function GET(req: NextRequest) {

  try {
    const users = await UserModel.find({});
    if (users) {
      return NextResponse.json(users);
    } else {
      return NextResponse.json({
        error: 'Cannot find any users',
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err });
  }
}

export async function POST(req: Request) {
  const { name, username, password }: Partial<UserType> = await req.json();
  if (!name || !username || !password) {
    return NextResponse.json({ message: 'Missing required data', status: 400 });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new UserModel({
    name,
    username,
    passwordHash
  });
  try {
    const savedUser = await UserModel.create(user);
    return NextResponse.json(savedUser);
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}
