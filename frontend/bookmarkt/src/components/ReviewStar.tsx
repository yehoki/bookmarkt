'use client';

import { Dispatch, SetStateAction } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface ReviewStarProps {
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  setRating: Dispatch<SetStateAction<number>>;
  currentRating: number;
  size?: number;
  backgroundGray?: boolean;
}

const ReviewStar: React.FC<ReviewStarProps> = ({
  rating,
  setRating,
  currentRating,
  size,
  backgroundGray,
}) => {
  return (
    <div
      className="relative transition cursor-pointer group"
      onMouseOver={() => setRating(rating)}
    >
      <AiOutlineStar
        size={size ? size : 28}
        className={`absolute -left-[2px] -top-[2px]
        ${
          rating <= currentRating
            ? 'fill-yellow-500 opacity-80'
            : backgroundGray
            ? 'fill-[#d6d6d6]'
            : 'fill-neutral-500'
        }
        
        `}
      />
      <AiFillStar
        size={size ? size - 4 : 24}
        className={`${
          rating <= currentRating
            ? 'fill-yellow-500 opacity-80'
            : backgroundGray
            ? 'fill-[#d6d6d6]'
            : 'fill-white'
        }`}
      />
    </div>
  );
};

export default ReviewStar;
