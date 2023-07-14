'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import RatingAndPublish from '../Ratings/RatingAndPublish';
import SingleBookReviews from '../SingleBook/SingleBookReviews';

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

  const extractTextFromDescription = (description: string) => {
    const newDoc = document.createElement('span');
    newDoc.innerHTML = description;
    return newDoc.textContent || newDoc.innerText;
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
              {extractTextFromDescription(description)}
              <button
                onClick={() => setIsExpanded(false)}
                className="hover:underline"
              >
                (less)
              </button>
            </div>
          ) : (
            <div>
              {slicedDescription}
              <button
                onClick={() => setIsExpanded(true)}
                className="hover:underline"
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
