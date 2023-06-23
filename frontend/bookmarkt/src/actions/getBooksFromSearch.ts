import { parseQuery } from '@/utils/helper';
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
const googleAPIBaseUrl = 'https://www.googleapis.com/books/v1';

export interface GoogleBookItemsInterface {
    id: string;
    volumeInfo: {
      authors?: string[]
      description?: string;
      imageLinks?: {
        thumbnail?: string;
      };
      publishedDate?: string;
      subtitle?: string;
      title: string;
    }
}

export interface GoogleBookInterface {
  totalItems: number;
  items: GoogleBookItemsInterface[]; 
}


export async function getBooksFromSearch(query: string) {
  const partialResponse =
    'totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks))';
  const res = await fetch(
    `${googleAPIBaseUrl}/volumes/?q=${parseQuery(
      query
    )}&fields=${partialResponse}&key=${GOOGLE_API_KEY}&maxResults=20`
  );
  if (!res.ok){
    return null;
  }
  const books:GoogleBookInterface = await res.json();
  return books;
}


