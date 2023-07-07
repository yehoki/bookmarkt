import { ImageLinks } from '@prisma/client';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
const googleAPIBaseUrl = 'https://www.googleapis.com/books/v1';

export interface GoogleBookVolumeInfoType {
  title: string;
  subtitle?: string;
  authors: string[];
  publishedDate?: string;
  description?: string;
  imageLinks?: ImageLinks;
}

export interface SingleGoogleBookType {
  id: string;
  volumeInfo: GoogleBookVolumeInfoType;
}

export async function getSingleBook(googleId: string) {
  const partialResponse =
    'id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks)';

  const res = await fetch(
    `${googleAPIBaseUrl}/volumes/${googleId}?fields=${partialResponse}&key=${GOOGLE_API_KEY}`
  );
  if (!res.ok) {
    return null;
  }
  const bookInformation: SingleGoogleBookType = await res.json();
  return bookInformation;
}
