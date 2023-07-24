'use client';

import Link from 'next/link';
import DisplayStars from '../Books/Ratings/DisplayStars';
import HomeUpdateBookDisplay from './HomeUpdateBookDIsplay';
import { extractTextFromDescription, getTimeDifference } from '@/utils/helper';
import { useEffect, useState } from 'react';

interface HomeUpdateItemProps {
  userName: string;
  bookTitle: string;
  googleBookId: string;
  bookDescription: string;
  imageUrl?: string;
  reviewRating: number;
  reviewDescription: string;
  authors?: string[];
  reviewMadeAt: Date;
}

const HomeUpdateItem: React.FC<HomeUpdateItemProps> = ({
  userName,
  reviewMadeAt,
  bookTitle,
  googleBookId,
  bookDescription,
  reviewRating,
  reviewDescription,
  authors,
  imageUrl,
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
  px-4 py-2 bg-white border-[1px] border-neutral-300
  rounded-sm text-sm
  relative
  "
    >
      <div className="absolute right-1  top-1">{timeDifference}</div>
      <div>
        <Link href={'/'} className="font-semibold hover:underline text-sm">
          {userName}
        </Link>{' '}
        reviewed{' '}
        <Link
          href={`/books/${googleBookId}`}
          className="font-semibold hover:underline text-sm "
        >
          {bookTitle}
        </Link>
      </div>
      <div className="flex items-center gap-1 text-sm text-neutral-400">
        Rating <DisplayStars averageRating={reviewRating} />
      </div>
      <div className="text-sm">{reviewDescription}</div>
      <HomeUpdateBookDisplay
        title={bookTitle}
        googleBookId={googleBookId}
        authors={authors}
        imageUrl={imageUrl}
        bookDescription={slicedText}
      />
    </div>
  );
};

export default HomeUpdateItem;
