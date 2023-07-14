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
  userReview: number | null;
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

  const extractTextFromDescription = (description: string) => {
    const extractedDescription = description.replace(/<[^>]+>/g, '');
    return extractedDescription;
  };

  const slicedDescription = extractTextFromDescription(description).slice(
    0,
    200
  );

  return (
    <div className="relative group">
      <Link
        href={`/books/${googleId}`}
        className="
    relative
    shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          height={150}
          width={100}
          src={thumbnailUrl ? thumbnailUrl : '/images/empty-book.png'}
          alt={`${title} cover`}
        />
      </Link>
      <div
        className="hidden bg-white z-20 absolute
  right-[15px] top-0 text-xs rounded-sm px-[3px] 
  text-goodreads-mybooks-green hover:underline group-hover:block
  cursor-pointer"
        onClick={() => bookReviewModal.onOpen()}
      >
        edit
      </div>
      <div
        className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 
          text-black left-[102px] top-0 
          bg-white
          z-10 w-[380px] p-[10px] text-left
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
              reviewRating={userReview ? userReview : 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBook;
