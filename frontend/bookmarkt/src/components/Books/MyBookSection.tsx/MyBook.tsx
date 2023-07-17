'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import RatingAndPublish from '../Ratings/RatingAndPublish';
import SingleBookReviews from '../SingleBook/SingleBookReviews';
import useBookReviewModal from '@/hooks/useBookReviewModal';

interface MyBookProps {
  title: string;
  id: string;
  googleId: string;
  authors: string[];
  thumbnailUrl?: string;
  reviewData: {
    totalReviews: number;
    averageReview: number;
  };
  userReview: {
    rating: number;
    review?: string;
  };
  description: string;
}

const MyBook: React.FC<MyBookProps> = ({
  title,
  id,
  googleId,
  authors,
  thumbnailUrl,
  reviewData,
  userReview,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
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

  const extractTextFromDescription = (description: string) => {
    const extractedDescription = description.replace(/<[^>]+>/g, '');
    return extractedDescription;
  };

  const slicedDescription = extractTextFromDescription(description).slice(
    0,
    200
  );

  return (
    <div className="relative group w-[100px]">
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
        className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 
        text-sm md:text-base  
        text-black -left-[100px] md:left-[102px]     md:top-0 
          bg-white
          z-10 w-[240px] md:w-[380px] p-[10px] text-left
          transition delay-700 "
      >
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm">By {authors[0]}</div>
        <RatingAndPublish
          totalRatings={reviewData.totalReviews}
          averageRating={reviewData.averageReview}
          publishedYear="2023"
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
          <div>read button</div>
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
