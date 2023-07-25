import { GoogleBookItemInterface } from "./googleRefactored/getBooksFromSearch";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
const googleAPIBaseUrl = 'https://www.googleapis.com/books/v1';

interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

export interface GoogleBookVolumeInfoType {
  title: string;
  subtitle?: string;
  authors: string[];
  publishedDate?: string;
  description?: string;
  imageLinks?: ImageLinks;
  industryIdentifiers: { type: 'ISBN_10' | 'ISBN_13'; identifier: string }[];
}

export interface SingleGoogleBookType {
  id: string;
  volumeInfo: GoogleBookVolumeInfoType;
}

// getSingleBook fetches an individual book and it's data from the Google Books API

export async function getSingleBook(googleId: string) {
  const partialResponse =
    'id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks,industryIdentifiers)';

  const res = await fetch(
    `${googleAPIBaseUrl}/volumes/${googleId}?fields=${partialResponse}&key=${GOOGLE_API_KEY}`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  if (!res.ok) {
    return null;
  }
  const bookInformation: GoogleBookItemInterface = await res.json();
  return bookInformation;
}
