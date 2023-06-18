import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  console.log('Testing Middleware');
  console.log(req.method);
  console.log(req.url);

  const origin = req.headers.get('origin');
  console.log(origin);

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
