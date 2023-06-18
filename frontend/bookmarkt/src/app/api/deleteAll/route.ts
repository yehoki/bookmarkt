import dbConnect from '@/lib/dbConnect';
import BookModel from '@/models/book';
import UserModel from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  await dbConnect();

  try {
    await BookModel.deleteMany({});
    await UserModel.deleteMany({});
    return NextResponse.json({message: 'Done deleting'})
  } catch (exc) {
    console.log(exc);
    return NextResponse.json({message: 'something went wrong'})
  }
}
