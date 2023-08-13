'use client';

import { useState } from 'react';
import DisplayStar from './DisplayStar';

interface DisplayStarsProps {
  averageRating: number;
  size?: number;
}

const DisplayStars: React.FC<DisplayStarsProps> = ({ averageRating, size }) => {
  return (
    <div className="flex">
      <DisplayStar size={size} currentRating={averageRating} starRating={1} />
      <DisplayStar size={size} currentRating={averageRating} starRating={2} />
      <DisplayStar size={size} currentRating={averageRating} starRating={3} />
      <DisplayStar size={size} currentRating={averageRating} starRating={4} />
      <DisplayStar size={size} currentRating={averageRating} starRating={5} />
    </div>
  );
};

export default DisplayStars;
