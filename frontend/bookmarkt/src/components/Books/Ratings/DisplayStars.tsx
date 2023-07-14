'use client';

import { useState } from 'react';
import DisplayStar from './DisplayStar';

interface DisplayStarsProps {
  averageRating: number;
}

const DisplayStars: React.FC<DisplayStarsProps> = ({ averageRating }) => {
  return (
    <div className="flex">
      <DisplayStar currentRating={averageRating} starRating={1} />
      <DisplayStar currentRating={averageRating} starRating={2} />
      <DisplayStar currentRating={averageRating} starRating={3} />
      <DisplayStar currentRating={averageRating} starRating={4} />
      <DisplayStar currentRating={averageRating} starRating={5} />
    </div>
  );
};

export default DisplayStars;
