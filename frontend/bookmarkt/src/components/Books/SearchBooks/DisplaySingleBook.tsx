'use client';

import { GoogleBookItemsInterface } from '@/actions/getBooksFromSearch';
import { parseAuthors } from '@/utils/helper';
import Image from 'next/image';

interface DisplaySingleBookProps {
  book: GoogleBookItemsInterface;
}

const DisplaySingleBook: React.FC<DisplaySingleBookProps> = ({ book }) => {
  return (
    <div className="flex flex-row border-b-[1px] gap-2 p-[5px] text-xs">
      <div className="relative block h-[75px] w-[50px]">
        {book.volumeInfo.imageLinks?.thumbnail && (
          <Image
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
            fill
          />
        )}
      </div>
      <div className="flex flex-col">
        <div className="text-[120%] font-bold">{book.volumeInfo.title}</div>
        <div>By {parseAuthors(book.volumeInfo.authors)}</div>
        <div>Ratings</div>
        <div>buttons</div>
        <div>Rate this book</div>
      </div>
    </div>
  );
};

export default DisplaySingleBook;
