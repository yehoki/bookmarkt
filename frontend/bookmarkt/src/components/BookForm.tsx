'use client';

// import { addBook } from '@/app/books/page';
// import { BookType } from '@/models/book';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookType } from '@/models/book';
type Props = {};

async function addBook(bookData: Partial<BookType>) {
  const res = await fetch('http://localhost:3000/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });
  const data = await res.json();
  return data;
}

const BookForm = (props: Props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !author) return;
    console.log(title, author);
    await addBook({
      title: title,
      author: author,
    });
    setTitle('');
    setAuthor('');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        type="text"
        name="bookTitle"
      />
      <input
        type="text"
        name="bookAuthor"
        value={author}
        onChange={(e) => setAuthor(e.currentTarget.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default BookForm;
