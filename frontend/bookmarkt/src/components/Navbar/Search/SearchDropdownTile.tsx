'use client';

import Image from 'next/image';
import Link from 'next/link';

interface SearchDropdownTileProps {
  title: string;
  subtitle?: string;
  author?: string;
  id?: string;
  imageLink?: string;
  searchValue?: string;
  onClick?: () => void;
}

const SearchDropdownTile: React.FC<SearchDropdownTileProps> = ({
  title,
  subtitle,
  author,
  id,
  imageLink,
  onClick,
  searchValue,
}) => {
  return (
    <>
      {id ? (
        <Link
          className="hover:bg-goodreads-beige bg-white border-y-[1px] border-[#D8D8D8]"
          onClick={onClick}
          href={`/books/${id}`}
        >
          <div className="flex flex-row">
            <div className="p-1 pb-0 mr-2 max-h-[55px] overflow-y-hidden">
              {imageLink ? (
                <Image
                  src={imageLink}
                  alt={`${title} book cover`}
                  height={30}
                  width={50}
                />
              ) : (
                <Image
                  src="/images/empty-book.png"
                  alt={`${title} book cover`}
                  height={30}
                  width={50}
                />
              )}
            </div>
            <div className="flex flex-col justify-center min-w-[1%] break-words">
              <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                {title} {subtitle ? `(${subtitle})` : ''}
              </div>
              <div className="text-xs">{author ? `By ${author}` : ''}</div>
            </div>
          </div>
        </Link>
      ) : (
        <Link onClick={onClick} href={`/search?q=${searchValue}`}>
          <div className="bg-white border-[1px] w-full leading-8"></div>
          <>{title}</>
        </Link>
      )}
    </>
  );
};

export default SearchDropdownTile;
