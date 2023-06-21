import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from './models/user';

// const userExtractor = async (req: NextRequest, res, next) => {
// const token = req.headers.get('token');
// if(token) {
// const decodedToken = jwt.verify(token, process.env.SECRET);
// const user = await UserModel.findById(decodedToken)
// }
// }

const requestLogger = (req: Request) => {
  console.log('Method:', req.method);
  console.log('Path:', req.url);
  console.log('Body:', req.body);
  const origin = req.headers.get('origin');
  if (origin) {
    console.log('Origin:', origin);
  }
  console.log('---');
};

export function middleware(req: Request) {
  requestLogger(req);

  // Token Extractor
  const authorization = req.headers.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.headers.set('token', authorization.replace('Bearer ', ''));
  }

  // User Extractor

  const token = req.headers.get('token');

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
