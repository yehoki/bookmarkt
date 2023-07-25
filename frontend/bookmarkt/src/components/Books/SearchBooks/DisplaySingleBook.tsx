'use client';

import { extractYearFromDate, parseAuthors } from '@/utils/helper';
import Image from 'next/image';
import AddBookButton from './AddBookButton';
import Link from 'next/link';
import RatingAndPublish from '../Ratings/RatingAndPublish';
import { Bookshelf } from '@prisma/client';
import { SearchDisplayBook } from './SearchBookDisplay';

interface DisplaySingleBookProps {
  book: SearchDisplayBook;
  bookshelves: Bookshelf[];
}

const DisplaySingleBook: React.FC<DisplaySingleBookProps> = ({
  book,
  bookshelves,
}) => {
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
          averageRating={book.reviewData.averageReview}
          publishedYear={
            book.volumeInfo.publishedDate
              ? extractYearFromDate(book.volumeInfo.publishedDate)
              : 'unknown'
          }
          totalRatings={book.reviewData.totalReviews}
        />
        <div className="flex flex-row gap-1">
          <AddBookButton
            bookId={book.id}
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
