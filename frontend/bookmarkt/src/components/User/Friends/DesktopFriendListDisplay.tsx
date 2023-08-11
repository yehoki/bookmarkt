'use client';

import { ImageLinks } from '@/actions/getBooksFromSearch';
import Image from 'next/image';
import Link from 'next/link';
import { StringMappingType } from 'typescript';

interface DesktopFriendListDisplayProps {
  name: string;
  id: string;
  image: string;
  bookCount: number;
  friendCount: number;
  bookData?: {
    bookId: string;
    imageLinks?: ImageLinks;
    title: string;
  };
}

const DesktopFriendListDisplay: React.FC<DesktopFriendListDisplayProps> = ({
  name,
  id,
  image,
  bookCount,
  friendCount,
  bookData,
}) => {
  return (
    <div className="flex w-full mb-1 text-xs border-b-[1px] py-1">
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
      <div className="flex-1">
        {bookData ? (
          <>
            <div className="flex gap-2">
              <div className="relative w-[50px] h-[75px] aspect-[2/3]">
                <Link href={`/books/${bookData.bookId}`}>
                  <Image
                    src={
                      bookData.imageLinks && bookData.imageLinks.thumbnail
                        ? bookData.imageLinks.thumbnail
                        : '/images/empty-book.png'
                    }
                    alt={`${bookData.title} cover`}
                    fill
                  />
                </Link>
              </div>
              <div className="text-xs">
                <div className="text-neutral-400">Currently reading:</div>
                <div>
                  <Link
                    className="text-goodreads-mybooks-green 
                  hover:underline"
                    href={`/books/${bookData.bookId}`}
                  >
                    {bookData.title}
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="flex-1"> Compare books</div>
    </div>
  );
};

export default DesktopFriendListDisplay;
