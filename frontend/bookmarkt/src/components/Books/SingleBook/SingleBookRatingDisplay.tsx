'use client';

import ReviewStar from '@/components/ReviewStar';
import DisplayStars from '../Ratings/DisplayStars';

interface SingleBookRatingDisplayProps {
  margin?: boolean;
  averageRating: number;
}

const SingleBookRatingDisplay: React.FC<SingleBookRatingDisplayProps> = ({
  margin,
  averageRating,
}) => {
  return (
    <div
      className={`flex justify-center mb-4 
      rounded-md hover:bg-[#f4f4f4] transition
    w-fit 
    ${!margin ? 'mx-auto px-4 py-4' : 'px-2 py-2'}
    `}
    >
      <a href="#community-reviews" className="flex flex-col items-center">
        <div className="flex items-center gap-4">
          <DisplayStars averageRating={averageRating} size={32} lightOrange />
          <span className="text-3xl">{averageRating}</span>
        </div>
        <div className="text-sm text-neutral-400">
          XXX ratings · XXX reviews
        </div>
      </a>
    </div>
  );
};

export default SingleBookRatingDisplay;
