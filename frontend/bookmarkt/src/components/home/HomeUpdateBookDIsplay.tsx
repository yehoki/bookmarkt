'use client';

import Image from 'next/image';
import Link from 'next/link';

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
      <Link href={`/books/${googleBookId}`}>
        <div className="relative h-[180px] min-w-[110px]">
          <Image
            src={imageUrl ? imageUrl : '/images/empty-book.png'}
            alt={`${title} cover`}
            fill
          />
        </div>
      </Link>
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold">
          <Link href={`/books/${googleBookId}`} className="hover:underline">
            {title}
          </Link>
        </div>
        <div>By {authors && authors[0] ? authors[0] : ''}</div>
        <div>
          {bookDescription}{' '}
          <Link
            className="text-goodreads-mybooks-green hover:underline"
            href={`/books/${googleBookId}`}
          >
            Continue reading
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeUpdateBookDisplay;
