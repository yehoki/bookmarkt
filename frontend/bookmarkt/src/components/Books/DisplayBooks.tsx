import { getBooks } from '@/services/books';
import Link from 'next/link';
import React from 'react';

const DisplayBooks = async () => {
  const books = await getBooks();
  const displayBooks = books.map((book: any) => {
    return (
      <li key={book.id}>
        <Link href={`/books/${book.id}`}>{book.title}</Link>
      </li>
    );
  });
  return <ul>{displayBooks}</ul>;
};

export default DisplayBooks;
