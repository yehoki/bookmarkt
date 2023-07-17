'use client';

import Link from 'next/link';
import DisplayStars from '../Books/Ratings/DisplayStars';
import HomeUpdateBookDisplay from './HomeUpdateBookDIsplay';

interface HomeUpdateItemProps {
  userName: string;
  bookTitle: string;
  googleBookId: string;
  imageUrl?: string;
  reviewRating: number;
  reviewDescription: string;
  authors?: string[];
}

const HomeUpdateItem: React.FC<HomeUpdateItemProps> = ({
  userName,
  bookTitle,
  googleBookId,
  reviewRating,
  reviewDescription,
  authors,
  imageUrl,
}) => {
  return (
    <div
      className="
  px-4 py-2 bg-white border-[1px] border-neutral-300
  rounded-sm text-sm
  "
    >
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
      />
    </div>
  );
};

export default HomeUpdateItem;
