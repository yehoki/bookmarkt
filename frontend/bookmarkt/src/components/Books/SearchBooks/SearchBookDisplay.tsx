'use client';

// import { GoogleBookItemsInterface } from '@/actions/getBooksFromSearch';
import Image from 'next/image';
import DisplaySingleBook from './DisplaySingleBook';
import { Bookshelf } from '@prisma/client';
import { GoogleBookItemInterface } from '@/actions/googleRefactored/getBooksFromSearch';

interface SearchDisplayBook extends GoogleBookItemInterface {
  bookshelf?: string;
}

interface SearchBookDisplayProps {
  books: SearchDisplayBook[];
  resultSize: number;
  bookshelves: Bookshelf[];
}

const SearchBookDisplay: React.FC<SearchBookDisplayProps> = ({
  books,
  resultSize,
  bookshelves,
}) => {
  const allBooks = books.map((book) => {
    return (
      <DisplaySingleBook bookshelves={bookshelves} book={book} key={book.id} />
    );
  });
  return (
    <div>
      <div>Page 1 of about {resultSize} results</div>
      <hr className="border-[1px]" />
      <div className="flex flex-col text-sm">{allBooks}</div>
    </div>
  );
};

export default SearchBookDisplay;
