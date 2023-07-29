import dotenv from 'dotenv';
const config = dotenv.config();

const MONGODB_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PRODUCTION_MONGODB_URI
    : process.env.NEXT_PUBLIC_MONGODB_URI;

const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL !== undefined
      ? process.env.NEXT_PUBLIC_PRODUCTION_URL
      : ''
    : 'http://localhost:3000';

const JWT_SECRET =
  process.env.NEXT_PUBLIC_JWT_SECRET === undefined
    ? 'secret'
    : process.env.NEXT_PUBLIC_JWT_SECRET;


const GOOGLE_API_KEY =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PRODUCTION_GOOGLE_API !== undefined
      ? process.env.NEXT_PUBLIC_PRODUCTION_GOOGLE_API
      : ''
    : process.env.NEXT_PUBLIC_GOOGLE_API !== undefined
    ? process.env.NEXT_PUBLIC_GOOGLE_API
    : '';

export { MONGODB_URI, SITE_URL, JWT_SECRET, GOOGLE_API_KEY };
