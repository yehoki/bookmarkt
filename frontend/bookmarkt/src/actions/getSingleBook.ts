import { GoogleBookItemInterface } from "./getBooksFromSearch";
import { GOOGLE_API_KEY } from "@/utils/config";


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
  pageCount: number;
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
    'id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks,industryIdentifiers,pageCount)';

  const res = await fetch(
    `${googleAPIBaseUrl}/volumes/${googleId}?fields=${partialResponse}&key=${GOOGLE_API_KEY}`,
    {
      next: {
        revalidate: 60*60*24
      },
    }
  );
  if (!res.ok) {
    return null;
  }
  const bookInformation: GoogleBookItemInterface = await res.json();
  return bookInformation;
}
