import dbConnect from '@/lib/dbConnect';
import { UserType } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/user'

export async function GET(req: NextRequest) {
  await dbConnect();

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
  await dbConnect();
  const { name, username, password }: Partial<UserType> = await req.json();
  if (!name || !username || !password) {
    return NextResponse.json({ message: 'Missing required data' });
  }
  const user = new UserModel({
    name,
    username,
    password,
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


