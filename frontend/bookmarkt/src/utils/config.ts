import dotenv from 'dotenv';
const config = dotenv.config();

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.NEXT_PUBLIC_MONGODB_URI;

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3000'
    : 'SampleWebsite';

const JWT_SECRET =
  process.env.NEXT_PUBLIC_JWT_SECRET === undefined
    ? 'secret'
    : process.env.NEXT_PUBLIC_JWT_SECRET;

const GOOGLE_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_API !== undefined
    ? process.env.NEXT_PUBLIC_GOOGLE_API
    : '';

export { MONGODB_URI, SITE_URL, JWT_SECRET, GOOGLE_API_KEY };
