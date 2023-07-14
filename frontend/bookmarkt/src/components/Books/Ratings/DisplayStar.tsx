'use client';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface DisplayStarProps {
  currentRating: number;
  starRating: number;
}

const DisplayStar: React.FC<DisplayStarProps> = ({
  currentRating,
  starRating,
}) => {
  return (
    <div className="relative">
      <AiFillStar
        size={14}
        className={`
      ${currentRating >= starRating ? 'fill-orange-600' : 'fill-gray-400'}`}
      />
    </div>
  );
};

export default DisplayStar;
