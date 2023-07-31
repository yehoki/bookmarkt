'use client';

import Link from 'next/link';
import DisplayStars from '../Books/Ratings/DisplayStars';
import HomeUpdateBookDisplay from './HomeUpdateBookDisplay';
import { extractTextFromDescription, getTimeDifference } from '@/utils/helper';
import Image from 'next/image';
import { Bookshelf } from '@prisma/client';
import { Suspense } from 'react';

interface HomeUpdateItemProps {
  userName: string;
  userId: string;
  bookTitle: string;
  googleBookId: string;
  bookDescription: string;
  imageUrl?: string;
  reviewRating: number;
  reviewDescription: string;
  authors?: string[];
  reviewMadeAt: Date;
  bookshelves: Bookshelf[];
  currentBookshelf: string;
  userReview: number;
}

const HomeUpdateItem: React.FC<HomeUpdateItemProps> = ({
  userName,
  userId,
  reviewMadeAt,
  bookTitle,
  googleBookId,
  bookDescription,
  reviewRating,
  reviewDescription,
  authors,
  imageUrl,
  bookshelves,
  currentBookshelf,
  userReview,
}) => {
  const extractedText = extractTextFromDescription(bookDescription);
  const timeAtRender = new Date();
  const timeDifference = getTimeDifference(
    timeAtRender.getTime(),
    reviewMadeAt.getTime()
  );
  const slicedText = extractedText.slice(0, 175) + '...';
  return (
    <div
      className="
  pl-8 pr-2 py-3 bg-white border-[1px] border-neutral-300
  rounded-sm text-sm
  relative
  "
    >
      <div className="absolute -left-5 top-1">
        <div
          className="relative w-10 h-10 rounded-full 
        border-[1px] border-neutral-200"
        >
          <Image
            fill
            src="/images/empty-user.png"
            alt="User profile image"
            className="rounded-full"
          />
        </div>
      </div>
      <div
        className="absolute right-1 top-1 text-neutral-500
      hover:underline cursor-pointer"
      >
        <Suspense fallback="...">{timeDifference}</Suspense>
      </div>
      <div className="flex gap-1 pr-10 ">
        <Link
          href={`/user/show/${userId}`}
          className="font-semibold hover:underline text-sm"
        >
          {userName}
        </Link>
        {reviewDescription === '' ? (
          <div className="flex gap-1 items-center">
            rated a book <DisplayStars averageRating={reviewRating} />
          </div>
        ) : (
          <div className="flex gap-1">
            reviewed{' '}
            <Link
              href={`/books/${googleBookId}`}
              className="font-semibold hover:underline text-sm "
            >
              {bookTitle}
            </Link>
          </div>
        )}
      </div>
      {reviewDescription !== '' && (
        <div className="flex items-center gap-1 text-sm text-neutral-400">
          Rating <DisplayStars averageRating={reviewRating} />
        </div>
      )}
      <div className="text-sm mb-2">{reviewDescription}</div>
      <HomeUpdateBookDisplay
        title={bookTitle}
        googleBookId={googleBookId}
        authors={authors}
        imageUrl={imageUrl}
        bookDescription={slicedText}
        borderOff={reviewDescription === ''}
        bookshelves={bookshelves}
        currentBookshelf={currentBookshelf}
        userBookReview={userReview}
      />
    </div>
  );
};

export default HomeUpdateItem;
