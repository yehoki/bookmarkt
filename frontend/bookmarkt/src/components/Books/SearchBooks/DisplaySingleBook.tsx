'use client';

import { GoogleBookItemsInterface } from '@/actions/getBooksFromSearch';
import { parseAuthors } from '@/utils/helper';
import Image from 'next/image';
import AddBookButton from './AddBookButton';

interface DisplaySingleBookProps {
  book: GoogleBookItemsInterface;
}

const DisplaySingleBook: React.FC<DisplaySingleBookProps> = ({ book }) => {
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
          <AddBookButton label="Add book" bookId={book.id} isOwned />
        </div>
        <div>Rate this book</div>
      </div>
    </div>
  );
};

export default DisplaySingleBook;
