'use client';

import Image from 'next/image';
import Link from 'next/link';

interface DesktopFriendListDisplayProps {
  name: string;
  id: string;
  image: string;
  bookCount: number;
  friendCount: number;
}

const DesktopFriendListDisplay: React.FC<DesktopFriendListDisplayProps> = ({
  name,
  id,
  image,
  bookCount,
  friendCount,
}) => {
  return (
    <div className="flex w-full my-1 text-xs">
      <div className="flex gap-4 flex-1 ">
        <div className="relative w-[50px] h-[66px]">
          <Image
            alt="Image"
            src={image === '' ? `/images/empty-user.png` : image}
            fill
          />
        </div>
        <div className="text-xs text-goodreads-mybooks-green">
          <div>
            <Link
              className="font-semibold hover:underline"
              href={`/user/show/${id}`}
            >
              {name}
            </Link>
          </div>
          <div className="font-lighter">
            {bookCount} Books | {friendCount} Friends
          </div>
        </div>
      </div>
      <div className="flex-1">Currently reading</div>
      <div className="flex-1"> Compare books</div>
    </div>
  );
};

export default DesktopFriendListDisplay;
