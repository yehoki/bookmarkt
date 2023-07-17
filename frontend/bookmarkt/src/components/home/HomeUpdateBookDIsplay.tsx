'use client';

import Image from 'next/image';

interface HomeUpdateBookDisplayProps {
  title: string;
  googleBookId: string;
  authors?: string[];
  bookDescription?: string;
  imageUrl?: string;
}

const HomeUpdateBookDisplay: React.FC<HomeUpdateBookDisplayProps> = ({
  title,
  googleBookId,
  authors,
  bookDescription,
  imageUrl,
}) => {
  return (
    <div className="p-2 border-neutral-300 border-[1px] flex gap-1">
      <div className="relative h-[180px] min-w-[110px]">
        <Image
          src={imageUrl ? imageUrl : '/images/empty-book.png'}
          alt={`${title} cover`}
          fill
        />
      </div>
      <div>
        <div>{title}</div>
        <div>By {authors && authors[0] ? authors[0] : ''}</div>
      </div>
    </div>
  );
};

export default HomeUpdateBookDisplay;
