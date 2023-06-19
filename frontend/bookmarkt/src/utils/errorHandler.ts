import { NextResponse } from 'next/server';

export const errorHandler = (err: Error) => {
  if (err.name === 'CastError') {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Malformatted id',
      headers: { 'Content-Type': 'text/plain' },
    });
  } else if (err.name === 'ValidationError') {
    return new NextResponse(null, {
      status: 400,
      statusText: err.message,
    });
  } else if (err.name === 'JsonWebTokenError') {
    return new NextResponse(null, {
      status: 400,
      statusText: err.message,
    });
  } else if (err.name === 'TokenExpiredError') {
    return new NextResponse(null, {
      status: 401,
      statusText: 'Token expired',
    });
  }
};
