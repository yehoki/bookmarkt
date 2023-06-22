import { parseQuery } from '@/utils/helper';
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;
const googleAPIBaseUrl = 'https://www.googleapis.com/books/v1';

export async function getBooksFromSearch(query: string) {
  const partialResponse =
    'totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks))';
  const res = await fetch(
    `${googleAPIBaseUrl}/volumes/?q=${parseQuery(
      query
    )}&fields=${partialResponse}&key=${GOOGLE_API_KEY}&maxResults=5`
  );
  if (!res.ok){
    return null;
  }
  const books = await res.json();
  return books;
}
