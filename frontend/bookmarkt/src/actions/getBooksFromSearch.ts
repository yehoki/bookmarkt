import { parseQuery } from '@/utils/helper';
import { GOOGLE_API_KEY } from '@/utils/config';
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

export interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

export interface VolumeInfo {
  authors?: string[];
  description?: string;
  imageLinks?: ImageLinks;
  pageCount: number;
  publishedDate?: string;
  subtitle?: string;
  title: string;
  industryIdentifiers?: {
    type: 'ISBN_10' | 'ISBN_13';
    identifier: string;
  }[];
}

export interface GoogleBookItemInterface {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface GoogleSearchBooksInterface {
  totalItems: number;
  items: GoogleBookItemInterface[];
}

export async function getBooksFromSearch(query: string, maxResults = 10) {
  const partialResponse =
    'totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks,industryIdentifiers))';

  const res = await fetch(
    `${googleAPIBaseUrl}/volumes/?q=${parseQuery(
      query
    )}&fields=${partialResponse}&key=${GOOGLE_API_KEY}&maxResults=${maxResults}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60*10,
      },
    }
  );

  if (!res.ok) {
    return null;
  }
  const books: GoogleSearchBooksInterface = await res.json();
  return books;
}
