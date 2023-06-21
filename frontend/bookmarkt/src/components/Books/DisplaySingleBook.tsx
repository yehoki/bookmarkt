'use client';
import Link from 'next/link';
import React from 'react';

type Props = {};

const DisplaySingleBook = ({
  book,
}: {
  book: { title: string; author: string; id: string };
}) => {
  return (
    <Link className="p-2 m-2 border" href={`/books/${book.id}`}>
      {book.title} by {book.author}
    </Link>
  );
};

export default DisplaySingleBook;
