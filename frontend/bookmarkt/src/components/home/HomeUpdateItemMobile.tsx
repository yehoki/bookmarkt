'use client';

import { getTimeDifference } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import DisplayStars from '../Books/Ratings/DisplayStars';

interface HomeUpdateItemMobileProps {
  userName: string;
  reviewId: string;
  userId: string;
  bookTitle: string;
  bookAuthors: string[];
  googleBookId: string;
  imageUrl: string;
  reviewRating: number;
  reviewDescription: string;
  reviewMadeAt: Date;
  userImage: string;
}

const HomeUpdateItemMobile: React.FC<HomeUpdateItemMobileProps> = ({
  userName,
  reviewId,
  userId,
  bookTitle,
  bookAuthors,
  googleBookId,
  reviewMadeAt,
  imageUrl,
  reviewRating,
  reviewDescription,
  userImage,
}) => {
  const timeAtRender = new Date();
  const timeDifference = getTimeDifference(
    timeAtRender.getTime(),
    reviewMadeAt.getTime()
  );
  return (
    <div
      className="rounded-sm relative p-[10px] min-h-[50px] 
      pl-[50px] bg-white border-[1px] border-neutral-500
      flex flex-col"
    >
      <div className="absolute rounded-full w-[30px] h-[30px] top-[10px] left-[10px] cursor-pointer border-[1px] border-neutral-300">
        <Link href={`/user/show/${userId}`}>
          <Image
            src={userImage !== '' ? userImage : '/images/empty-user.png'}
            alt="User image"
            fill
            sizes="100vw"
            className="rounded-full"
          />
        </Link>
      </div>
      <div className="text-sm leading-1 flex gap-1 items-center">
        <span className="text-goodreads-mybooks-green hover:underline cursor-pointer font-semibold">
          <Link href={`/user/show/${userId}`}>{userName}</Link>
        </span>
        rated a book <DisplayStars averageRating={reviewRating} size={12} />
      </div>
      <Suspense fallback="">
        <Link
          className="text-xs text-neutral-500
      hover:underline cursor-pointer"
          href={`/review/show/${reviewId}`}
        >
          {timeDifference}
        </Link>
      </Suspense>
      <div className="flex items-center mt-2">
        <div className="relative w-[55px] h-[85px] aspect-[11/17] mr-1">
          <Link href={`/books/${googleBookId}`}>
            <Image
              src={imageUrl !== '' ? imageUrl : '/images/empty-book.png'}
              fill
              sizes="(max-width: 768px) 55px"
              alt="empty book"
              placeholder="blur"
              blurDataURL="/images/empty-book.png"
            />
          </Link>
        </div>
        <div>
          <div>{bookTitle}</div>
          <div className="text-neutral-400 font-light text-sm">
            {bookAuthors[0] ? bookAuthors[0] : bookAuthors}
          </div>
        </div>
      </div>
      <div className="my-2 text-sm">{reviewDescription}</div>
      <div className="flex gap-[2px] text-sm text-goodreads-mybooks-green">
        {/* <div className="cursor-pointer hover:underline">Like</div>
          <div className="cursor-pointer hover:underline">Comment</div> */}
      </div>
    </div>
  );
};

export default HomeUpdateItemMobile;
