import { parseQuery } from '@/utils/helper';
import { getGoogleBooksFromUser } from './getGoogleBooksFromUser';
import getCurrentUser from './getCurrentUser';
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
const googleAPIBaseUrl = 'https://www.googleapis.com/books/v1';

export interface GoogleBookItemsInterface {
  id: string;
  volumeInfo: {
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    publishedDate?: string;
    subtitle?: string;
    title: string;
  };
}

export interface GoogleBookInterface {
  totalItems: number;
  items: GoogleBookItemsInterface[];
}

export interface GoogleBookReturnItemsInterface {
  id: string;
  volumeInfo: {
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    publishedDate?: string;
    subtitle?: string;
    title: string;
  };
  userOwns: boolean;
}

export interface GoogleBookReturnInterface {
  totalItems: number;
  items: GoogleBookReturnItemsInterface[];
}

export async function getBooksFromSearch(query: string) {
  const partialResponse =
    'totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks))';
  const res = await fetch(
    `${googleAPIBaseUrl}/volumes/?q=${parseQuery(
      query
    )}&fields=${partialResponse}&key=${GOOGLE_API_KEY}&maxResults=20`
  );
  if (!res.ok) {
    return null;
  }
  const books: GoogleBookInterface = await res.json();

  // const user = await getCurrentUser();
  // Set books into db
  const userBooks: GoogleBookReturnInterface | null = await getGoogleBooksFromUser(books);
  return books;
}
