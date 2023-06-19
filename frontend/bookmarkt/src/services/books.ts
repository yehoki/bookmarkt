import { BookType } from "@/models/book";

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
  const res = await fetch('/api/books', {
    method: 'GET',
    cache: 'no-store',
  });
  const books = await res.json();
  return books;
}