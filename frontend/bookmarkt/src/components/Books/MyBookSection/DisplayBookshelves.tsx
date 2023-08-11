'use client';

import { Bookshelf } from '@prisma/client';
import DisplaySingleBookshelf from './DisplaySingleBookshelf';
import { parseBookshelfName } from '@/utils/helper';

interface DisplayBookshelvesProps {
  bookshelves: Bookshelf[];
  currentUserId: string;
}

const DisplayBookshelves: React.FC<DisplayBookshelvesProps> = ({
  bookshelves,
  currentUserId,
}) => {
  const allBooksCount = bookshelves.reduce(
    (acc, currentValue) => acc + currentValue.googleBooks.length,
    0
  );

  const bookshelfDisplay = () => {
    return bookshelves.map((bookshelf) => (
      <DisplaySingleBookshelf
        key={bookshelf.id}
        label={parseBookshelfName(bookshelf.name)}
        bookshelfName={bookshelf.name}
        bookshelfLength={bookshelf.googleBooks.length}
        currentUserId={currentUserId}
      />
    ));
  };
  return (
    <ul className="text-sm ">
      <DisplaySingleBookshelf
        label="all"
        bookshelfLength={allBooksCount}
        bookshelfName="All"
        currentUserId={currentUserId}
      />
      {bookshelfDisplay()}
    </ul>
  );
};

export default DisplayBookshelves;
