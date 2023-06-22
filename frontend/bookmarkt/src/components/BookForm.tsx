'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addBook } from '@/services/books';
type Props = {};

const BookForm = (props: Props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !author) return;
    console.log(title, author);
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
