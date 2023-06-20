'use client';
import { getBooks } from '@/services/books';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import DisplaySingleBook from './DisplaySingleBook';

const DisplayBooks = async () => {
  const { data: session } = useSession();
  // console.log(session, session!.user);
  // console.log(session, session!.user);
  const books = await getBooks();
  const displayBooks = books.map((book: any) => {
    return (
      <DisplaySingleBook
        key={book.id}
        book={{ title: book.title, author: book.author, id: book.id }}
      />
    );
  });
  return <>{displayBooks}</>;
};

export default DisplayBooks;
