'use client';

import Image from 'next/image';
import DisplayStars from '../../Ratings/DisplayStars';
import { ReviewData } from '@prisma/client';

interface MobileMyBookProps {
  title: string;
  author: string[];
  reviewData: ReviewData;
  thumbnail: string;
  pageCount: number;
}

const MobileMyBook: React.FC<MobileMyBookProps> = ({
  title,
  author,
  reviewData,
  thumbnail,
  pageCount,
}) => {
  return (
    <li className="flex gap-2 py-4 border-b-[1px] px-4 min-h-[184px]">
      <div className="relative w-[75px] h-[120px] aspect-[8/5] border">
        <Image
          src={thumbnail === '' ? '/images/empty-book.png' : thumbnail}
          fill
          alt="Book image"
        />
      </div>
      <div className="text-sm">
        <h3 className="py-1 text-base ">{title}</h3>
        <h4 className="text-xs text-neutral-400 pb-1">
          By <span className="text-goodreads-mybooks-green">{author[0]}</span>
        </h4>
        <div className="flex items-center text-neutral-400 text-xs pb-1">
          <DisplayStars averageRating={reviewData.averageReview} size={12} />
          <span className="ml-1">
            {reviewData.averageReview} · {reviewData.totalReviews} ratings · ###
            reviews
          </span>
        </div>
        <button
          className="
                  mt-2
                px-3 py-3 leading-none
                bg-goodreads-beige hover:bg-[#ede6d6]
                active:bg-goodreads-brown/20
                border-goodreads-brown/20 border rounded-sm"
        >
          Update progress
        </button>
      </div>
    </li>
  );
};

export default MobileMyBook;
