'use client';

import { useState } from 'react';
import DisplayStar from './DisplayStar';

interface DisplayStarsProps {
  averageRating: number;
  size?: number;
  lightOrange?: boolean;
}

const DisplayStars: React.FC<DisplayStarsProps> = ({
  averageRating,
  size,
  lightOrange,
}) => {
  return (
    <div className="flex">
      <DisplayStar
        lightOrange={lightOrange}
        size={size}
        currentRating={averageRating}
        starRating={1}
      />
      <DisplayStar
        lightOrange={lightOrange}
        size={size}
        currentRating={averageRating}
        starRating={2}
      />
      <DisplayStar
        lightOrange={lightOrange}
        size={size}
        currentRating={averageRating}
        starRating={3}
      />
      <DisplayStar
        lightOrange={lightOrange}
        size={size}
        currentRating={averageRating}
        starRating={4}
      />
      <DisplayStar
        lightOrange={lightOrange}
        size={size}
        currentRating={averageRating}
        starRating={5}
      />
    </div>
  );
};

export default DisplayStars;
