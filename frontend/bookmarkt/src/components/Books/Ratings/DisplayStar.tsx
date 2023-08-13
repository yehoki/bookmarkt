'use client';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface DisplayStarProps {
  currentRating: number;
  starRating: number;
  size?: number;
}

const DisplayStar: React.FC<DisplayStarProps> = ({
  currentRating,
  starRating,
  size = 14,
}) => {
  return (
    <div className="relative">
      <AiFillStar
        size={size}
        className={`
      ${currentRating >= starRating ? 'fill-orange-600' : 'fill-gray-400'}`}
      />
    </div>
  );
};

export default DisplayStar;
