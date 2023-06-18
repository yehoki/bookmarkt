import BookForm from '@/components/BookForm';
import type { BookType } from '@/models/book';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

// export const dynamic = 'force-dynamic';

async function getBooks() {
  const res = await fetch('http://localhost:3000/api/books', {
    cache: 'no-store',
  });
  const books = await res.json();
  return books;
}

const Page = async () => {
  const books = await getBooks();
  return (
    <div>
      <BookForm />
      <ul>
        {books?.map((book: any) => {
          return <li key={book._id}>{book.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Page;
