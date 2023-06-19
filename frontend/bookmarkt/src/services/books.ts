import { BookType } from '@/models/book';
import { SITE_URL } from '@/utils/config';

const siteUrl = SITE_URL;

export async function addBook(bookData: Partial<BookType>) {
  const res = await fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });
  const data = await res.json();
  return data;
}
export async function getBooks() {
  const res = await fetch(`${siteUrl}/api/books`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const books = await res.json();
  return books;
}
