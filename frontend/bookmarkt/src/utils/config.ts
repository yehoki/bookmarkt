import dotenv from 'dotenv';
const config = dotenv.config();

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'SampleWebsite';

const JWT_SECRET =
  process.env.JWT_SECRET === undefined ? 'secret' : process.env.JWT_SECRET;

export { MONGODB_URI, SITE_URL, JWT_SECRET };
