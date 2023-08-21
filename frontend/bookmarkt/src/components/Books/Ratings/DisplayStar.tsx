'use client';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface DisplayStarProps {
  currentRating: number;
  starRating: number;
  size?: number;
  lightOrange?: boolean;
}

const DisplayStar: React.FC<DisplayStarProps> = ({
  currentRating,
  starRating,
  size = 14,
  lightOrange,
}) => {
  return (
    <div className="relative">
      <AiFillStar
        size={size}
        className={`
      ${
        currentRating >= starRating
          ? lightOrange
            ? 'fill-[#e87400]'
            : 'fill-orange-600'
          : 'fill-gray-400'
      }`}
      />
    </div>
  );
};

export default DisplayStar;
