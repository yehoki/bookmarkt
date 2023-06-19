import { MONGODB_URI } from '@/utils/config';
import mongoose from 'mongoose';

const DBURL = MONGODB_URI;

if (!DBURL) {
  throw new Error('Oops mongo not working');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(DBURL!).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
