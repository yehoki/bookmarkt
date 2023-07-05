'use client';

import {
  GoogleBookItemsInterface,
  GoogleBookReturnItemsInterface,
} from '@/actions/getBooksFromSearch';
import { parseAuthors } from '@/utils/helper';
import Image from 'next/image';
import AddBookButton from './AddBookButton';
import { useState } from 'react';

interface DisplaySingleBookProps {
  book: GoogleBookReturnItemsInterface;
}

const DisplaySingleBook: React.FC<DisplaySingleBookProps> = ({ book }) => {
  const [isOwned, setIsOwned] = useState(book.isOwned ? book.isOwned : false);

  const handleAddBook = async () => {
    console.log('BOOK', book);
    const test = await fetch('http://localhost:3000/api/users/books', {
      method: 'POST',
      body: JSON.stringify({
        id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors : [],
        subtitle: book.volumeInfo.subtitle ? book.volumeInfo.subtitle : '',
        description: book.volumeInfo.description
          ? book.volumeInfo.description
          : '',
        imageLinks: book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks
          : [],
        publishedDate: book.volumeInfo.publishedDate
          ? book.volumeInfo.publishedDate
          : '',
      }),
    });
    const data = await test.json();
    if (data && data.user && data.book && data.user.bookIds && data.book.id) {
      if (data.user.bookIds.includes(data.book.id)) {
        setIsOwned(true);
      } else {
        setIsOwned(false);
      }
    }
  };

  return (
    <div className="flex flex-row border-b-[1px] gap-2 p-[5px] text-xs">
      <div className="relative block h-[75px] min-w-[50px] w-[50x]">
        {book.volumeInfo.imageLinks?.thumbnail && (
          <Image
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
            fill
            sizes="(max-width: 1440px) 100vw"
          />
        )}
      </div>
      <div className="flex flex-col">
        <div className="text-[120%] font-bold">{book.volumeInfo.title}</div>
        <div>By {parseAuthors(book.volumeInfo.authors)}</div>
        <div>Ratings</div>
        <div className="flex flex-row gap-1">
          <AddBookButton
            label="Add book"
            bookId={book.id}
            isOwned={isOwned}
            onClick={handleAddBook}
          />
        </div>
        <div>Rate this book</div>
      </div>
    </div>
  );
};

export default DisplaySingleBook;
