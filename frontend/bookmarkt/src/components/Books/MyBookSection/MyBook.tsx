'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import RatingAndPublish from '../Ratings/RatingAndPublish';
import SingleBookReviews from '../SingleBook/SingleBookReviews';
import useBookReviewModal from '@/hooks/useBookReviewModal';
import { Bookshelf } from '@prisma/client';
import AddBookButton from '../SearchBooks/AddBookButton';
import { extractYearFromDate } from '@/utils/helper';

interface MyBookProps {
  bookshelves: Bookshelf[];
  title: string;
  id: string;
  googleId: string;
  authors: string[];
  thumbnailUrl?: string;
  reviewData: {
    totalReviews: number;
    averageReview: number;
  };
  publishedDate: string;
  userReview: {
    rating: number;
    review?: string;
  };
  description: string;
}

const MyBook: React.FC<MyBookProps> = ({
  bookshelves,
  title,
  id,
  googleId,
  authors,
  thumbnailUrl,
  reviewData,
  userReview,
  description,
  publishedDate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookShowing, setIsBookShowing] = useState(false);
  const bookReviewModal = useBookReviewModal();

  const handleEditReview = () => {
    bookReviewModal.setBookDetails({
      googleBookId: googleId,
      bookId: id,
      authors: authors,
      bookTitle: title,
      thumbnailUrl: thumbnailUrl,
      userRating: userReview.rating,
      userReview: userReview.review,
    });
    bookReviewModal.onOpen();
  };

  const currentBookshelf = () => {
    // const singleBookshelf = bookshelves.filter((bookshelf) => {
    //   return bookshelf.googleBooks.find((book) => book.googleBookId === googleId);
    // });
    // if (singleBookshelf.length !== 0) {
    //   return singleBookshelf[0].name;
    // }
    return '';
  };

  const extractTextFromDescription = (description: string) => {
    const extractedDescription = description.replace(/<[^>]+>/g, '');
    return extractedDescription;
  };

  const slicedDescription = extractTextFromDescription(description).slice(
    0,
    200
  );

  return (
    <div
      className="relative group w-[100px]"
      onMouseEnter={() => setIsBookShowing(true)}
      onMouseLeave={() => setIsBookShowing(false)}
    >
      <Link
        href={`/books/${googleId}`}
        className="
    relative
    shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[100px] h-[150px]">
          <Image
            fill
            src={thumbnailUrl ? thumbnailUrl : '/images/empty-book.png'}
            alt={`${title} cover`}
          />
        </div>
      </Link>
      <div
        className="hidden bg-white z-20 absolute
  right-0 top-0 text-xs rounded-sm px-[3px] 
  text-goodreads-mybooks-green hover:underline group-hover:block
  cursor-pointer"
        onClick={handleEditReview}
      >
        edit
      </div>
      <div
        className={`
        ${
          isBookShowing
            ? 'scale-100 origin-top-left'
            : 'scale-0 origin-top-left'
        }
        absolute
        text-sm md:text-base  
        text-black -left-[100px] navOne:left-[102px] navOne:top-0 
          bg-white
          z-10 w-[240px] md:w-[380px] p-[10px] text-left
          transition delay-300 `}
      >
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm">By {authors[0]}</div>
        <RatingAndPublish
          totalRatings={reviewData.totalReviews}
          averageRating={reviewData.averageReview}
          publishedYear={extractYearFromDate(publishedDate)}
        />
        <div className="overflow-hidden">
          {isExpanded ? (
            <div>
              {extractTextFromDescription(description)}{' '}
              <button
                onClick={() => setIsExpanded(false)}
                className="hover:underline text-neutral-500"
              >
                (less)
              </button>
            </div>
          ) : (
            <div>
              {slicedDescription}{' '}
              <button
                onClick={() => setIsExpanded(true)}
                className="hover:underline text-neutral-500"
              >
                ...more
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <AddBookButton
              label=""
              bookId={googleId}
              isOwned={false}
              onClick={() => console.log('test')}
              bookshelves={bookshelves}
              currentBookshelf={currentBookshelf()}
            />
          </div>
          <div>
            <SingleBookReviews
              bookId={googleId}
              reviewRating={userReview ? userReview.rating : 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBook;
