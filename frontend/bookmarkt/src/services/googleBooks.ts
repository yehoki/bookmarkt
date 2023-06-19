import { GOOGLE_API_KEY } from '@/utils/config';
import { parseQuery } from '@/utils/helper';
const googleAPIBaseUrl = 'https://www.googleapis.com/books/v1/';
const API_KEY = GOOGLE_API_KEY;

export async function getGoogleBooksByQuery(query: string) {
  const partialResponse =
    'totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDate,description,imageLinks))';
  const res = await fetch(
    `${googleAPIBaseUrl}volumes/?q=${parseQuery(
      query
    )}&fields=${partialResponse}&key=${API_KEY}&maxResults=20`,
    {
      cache: 'no-store',
    }
  );
  const booksFromQuery = await res.json();
  return booksFromQuery;
}
