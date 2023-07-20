'use client';

import {
  GoogleBookItemsInterface,
  GoogleBookReturnItemsInterface,
} from '@/actions/getBooksFromSearch';
import Image from 'next/image';
import DisplaySingleBook from './DisplaySingleBook';

interface SearchBookDisplayProps {
  books: GoogleBookReturnItemsInterface[];
  resultSize: number;
}

const SearchBookDisplay: React.FC<SearchBookDisplayProps> = ({
  books,
  resultSize,
}) => {
  const allBooks = books.map((book: GoogleBookReturnItemsInterface) => {
    return <DisplaySingleBook book={book} key={book.id} />;
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
