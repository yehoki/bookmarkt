'use client';

import { BookType } from '@/models/book';
import { getBooks } from '@/services/books';
import { useSession } from 'next-auth/react';
import MyBook from './MyBook';

const DisplayMyBooks = async () => {
  // const {data: session} = useSession()

  const books = await getBooks();
  if (!books) return null;

  const displayBooks = books.map((book: BookType) => {
    return <MyBook key={book.id} title={book.title} />;
  });

  return <>{displayBooks}</>;
};

export default DisplayMyBooks;
