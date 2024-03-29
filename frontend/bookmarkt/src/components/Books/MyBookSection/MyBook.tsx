'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import RatingAndPublish from '../Ratings/RatingAndPublish';
import SingleBookReviews from '../SingleBook/SingleBookReviews';
import useBookReviewModal from '@/hooks/useBookReviewModal';
import { Bookshelf } from '@prisma/client';
import AddBookButton from '../SearchBooks/AddBookButton';
import { extractYearFromDate } from '@/utils/helper';
import { useRouter } from 'next/navigation';

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
    reviewId: string;
  };
  description: string;
  isCurrentUser: boolean;
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
  isCurrentUser,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookShowing, setIsBookShowing] = useState(false);
  const [isRatingHovering, setIsRatingHovering] = useState(false);
  const [userRating, setUserRating] = useState(userReview.rating);
  const bookReviewModal = useBookReviewModal();

  const router = useRouter();

  useEffect(() => {
    setUserRating(userReview.rating);
  }, [userReview, router]);

  const handleEditReview = () => {
    bookReviewModal.setBookDetails({
      googleBookId: googleId,
      bookId: id,
      authors: authors,
      bookTitle: title,
      thumbnailUrl: thumbnailUrl,
      userRating: userRating,
      userReview: userReview.review,
      userReviewId: userReview.reviewId,
    });
    bookReviewModal.onOpen();
  };

  const currentBookshelf = () => {
    const singleBookshelf = bookshelves.filter((bookshelf) => {
      return bookshelf.googleBooks.find(
        (book) => book.googleBookId === googleId
      );
    });
    if (singleBookshelf.length !== 0) {
      return singleBookshelf[0].name;
    }
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

  const handleClearRating = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (userReview.reviewId !== '') {
        const res = await fetch(`/api/review/${userReview.reviewId}/rating`, {
          method: 'DELETE',
        });
        console.log(res);
        if (!res.ok) {
          console.log('Could not clear book rating');
        }
        return router.refresh();
      }
    },
    [userReview, router]
  );

  const myRatingComponent = useCallback(() => {
    if (isRatingHovering) {
      return (
        <button
          className="text-goodreads-mybooks-green cursor-pointer"
          onClick={handleClearRating}
        >
          Clear rating
        </button>
      );
    }
    return <p>My rating:</p>;
  }, [isRatingHovering, handleClearRating]);

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
      {isCurrentUser && (
        <div
          className="hidden bg-white z-20 absolute
  right-0 top-0 text-xs rounded-sm px-[3px] 
  text-goodreads-mybooks-green hover:underline group-hover:block
  cursor-pointer"
          onClick={handleEditReview}
        >
          edit
        </div>
      )}
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
              bookId={googleId}
              bookshelves={bookshelves}
              currentBookshelf={currentBookshelf()}
            />
          </div>
          <div className="flex gap-4 items-center text-xs  whitespace-nowrap">
            {userReview.rating ? (
              <span
                onMouseOver={() => setIsRatingHovering(true)}
                onMouseLeave={() => setIsRatingHovering(false)}
              >
                {myRatingComponent()}
              </span>
            ) : (
              <span>Rate this book</span>
            )}
            <SingleBookReviews
              bookId={googleId}
              reviewRating={userRating}
              size={18}
              backgroundGray
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBook;
