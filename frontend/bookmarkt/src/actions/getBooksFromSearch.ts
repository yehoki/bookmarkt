import { parseQuery } from '@/utils/helper';
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
  isOwned?: boolean;
  volumeInfo: {
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    publishedDate?: string;
    subtitle?: string;
    title: string;
    industryIdentifiers: {
      type: 'ISBN_10' | 'ISBN_13';
      identifier: string;
    }[];
  };
}

export interface GoogleBookReturnInterface {
  totalItems: number;
  items: GoogleBookReturnItemsInterface[];
}

export async function getBooksFromSearch(query: string, maxResults=20) {
  const partialResponse =
    'totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks,industryIdentifiers))';
  const res = await fetch(
    `${googleAPIBaseUrl}/volumes/?q=${parseQuery(
      query
    )}&fields=${partialResponse}&key=${GOOGLE_API_KEY}&maxResults=${maxResults}`
  );
  if (!res.ok) {
    return null;
  }
  const books: GoogleBookReturnInterface = await res.json();
  return books;
}
