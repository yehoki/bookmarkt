'use client';

import Image from 'next/image';

interface HomeUpdateItemMobileProps {
  userName: string;
  bookTitle: string;
  bookAuthors: string[];
  googleBookId: string;
  imageUrl: string;
  reviewRating: number;
  reviewDescription: string;
}

const HomeUpdateItemMobile: React.FC<HomeUpdateItemMobileProps> = ({
  userName,
  bookTitle,
  bookAuthors,
  googleBookId,
  imageUrl,
  reviewRating,
  reviewDescription,
}) => {
  return (
    <div
      className="rounded-sm relative p-[10px] min-h-[50px] pl-[50px] bg-white border-[1px] border-neutral-500
            flex flex-col"
    >
      <div className="absolute rounded-full w-[30px] h-[30px] top-[10px] left-[10px] cursor-pointer border-[1px] border-neutral-300">
        <Image
          src="/images/empty-user.png"
          alt="User image"
          fill
          sizes="100vw"
          className="rounded-full"
        />
      </div>
      <div className="text-sm leading-1">
        <span className="text-goodreads-mybooks-green hover:underline cursor-pointer font-semibold">
          {userName}
        </span>{' '}
        rated a book {reviewRating}
      </div>
      <div className="text-xs text-neutral-300">When</div>
      <div className="flex items-center mt-2">
        <div className="relative w-[55px] h-[85px] aspect-[11/17] mr-1">
          <Image
            src={imageUrl !== '' ? imageUrl : '/images/empty-book.png'}
            fill
            sizes="(max-width: 768px) 55px"
            alt="empty book"
          />
        </div>
        <div>
          <div>{bookTitle}</div>
          <div className="text-neutral-400 font-light text-sm">
            {bookAuthors[0] ? bookAuthors[0] : bookAuthors}
          </div>
        </div>
      </div>
      <div>{reviewDescription}</div>
      <div className="flex gap-[2px] text-sm text-goodreads-mybooks-green">
        <div className="cursor-pointer hover:underline">Like</div>
        <div className="cursor-pointer hover:underline">Comment</div>
      </div>
    </div>
  );
};

export default HomeUpdateItemMobile;
