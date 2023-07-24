'use client';

import { Bookshelf } from '@prisma/client';
import DisplaySingleBookshelf from './DisplaySingleBookshelf';
import { parseBookshelfName } from '@/utils/helper';

interface DisplayBookshelvesProps {
  bookshelves: Bookshelf[];
}

const DisplayBookshelves: React.FC<DisplayBookshelvesProps> = ({
  bookshelves,
}) => {
  const allBooksCount = bookshelves.reduce(
    (acc, currentValue) => acc + currentValue.books.length,
    0
  );

  const bookshelfDisplay = () => {
    return bookshelves.map((bookshelf) => (
      <DisplaySingleBookshelf
        key={bookshelf.id}
        label={parseBookshelfName(bookshelf.name)}
        bookshelfName={bookshelf.name}
        bookshelfLength={bookshelf.books.length}
      />
    ));
  };
  return (
    <ul className="text-sm ">
      <DisplaySingleBookshelf
        label="all"
        bookshelfLength={allBooksCount}
        bookshelfName="All"
      />
      {bookshelfDisplay()}
    </ul>
  );
};

export default DisplayBookshelves;
