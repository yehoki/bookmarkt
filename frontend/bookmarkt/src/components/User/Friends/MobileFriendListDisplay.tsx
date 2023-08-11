'use client';

import Image from 'next/image';
import Link from 'next/link';

interface MobileFriendListDisplayProps {
  name: string;
  id: string;
  image: string;
  bookCount: number;
}

const MobileFriendListDisplay: React.FC<MobileFriendListDisplayProps> = ({
  name,
  id,
  image,
  bookCount,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-[30px] h-[30px]">
        <Link href={`/user/show/${id}`}>
          <Image
            className="rounded-md"
            src={image !== '' ? image : '/images/empty-user.png'}
            fill
            alt={`${name} profile image`}
          />
        </Link>
      </div>
      <div>
        <div className="text-sm font-bold text-goodreads-mybooks-green hover:underline">
          <Link href={`/user/show/${id}`}>{name}</Link>
        </div>
        <div className="text-sm text-neutral-400">
          {bookCount} {bookCount === 1 ? 'Book' : 'Books'}
        </div>
      </div>
    </div>
  );
};

export default MobileFriendListDisplay;
