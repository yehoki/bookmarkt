'use client';

import {
  GoogleBookItemsInterface,
  GoogleBookReturnItemsInterface,
} from '@/actions/getBooksFromSearch';
import { parseAuthors } from '@/utils/helper';
import Image from 'next/image';
import AddBookButton from './AddBookButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RatingAndPublish from '../Ratings/RatingAndPublish';
import { Bookshelf } from '@prisma/client';
import { getSingleBookFromDB } from '@/actions/getSingleBookFromDB';

interface DisplaySingleBookProps {
  book: GoogleBookReturnItemsInterface;
  bookshelves: Bookshelf[];
}

const DisplaySingleBook: React.FC<DisplaySingleBookProps> = ({
  book,
  bookshelves,
}) => {
  const [isOwned, setIsOwned] = useState(book.isOwned ? book.isOwned : false);
  const router = useRouter();

  const handleAddBook = async () => {
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
          : {},
        publishedDate: book.volumeInfo.publishedDate
          ? book.volumeInfo.publishedDate
          : '',
        ISBN: book.volumeInfo.industryIdentifiers[1].identifier,
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
    router.refresh();
  };

  return (
    <div className="flex flex-row border-b-[1px] gap-2 p-[5px] text-xs">
      <Link href={`/books/${book.id}`}>
        <div className="relative block h-[75px] min-w-[50px] w-[50x]">
          <Image
            src={
              book.volumeInfo.imageLinks?.thumbnail
                ? book.volumeInfo.imageLinks?.thumbnail
                : '/images/empty-book.png'
            }
            alt={book.volumeInfo.title}
            fill
            sizes="(max-width: 1440px) 100vw"
          />
        </div>
      </Link>
      <div className="flex flex-col">
        <div className="text-[120%] font-bold">{book.volumeInfo.title}</div>
        <div>By {parseAuthors(book.volumeInfo.authors)}</div>
        <RatingAndPublish
          averageRating={0}
          publishedYear="2023"
          totalRatings={0}
        />
        <div className="flex flex-row gap-1">
          <AddBookButton
            label="Add book"
            bookId={book.id}
            isOwned={isOwned}
            onClick={handleAddBook}
            bookshelves={bookshelves}
            currentBookshelf={book.bookshelf ? book.bookshelf : ''}
          />
        </div>
        <div>Rate this book</div>
      </div>
    </div>
  );
};

export default DisplaySingleBook;
