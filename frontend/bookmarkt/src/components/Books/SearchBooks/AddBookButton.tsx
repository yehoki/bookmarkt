'use client';
import { Bookshelf } from '@prisma/client';
import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';

interface AddBookButtonProps {
  label: string;
  bookId: string;
  isOwned: boolean;
  onClick: () => void;
  bookshelves: Bookshelf[];
  currentBookshelf: string;
}

const AddBookButton: React.FC<AddBookButtonProps> = ({
  label,
  bookId,
  isOwned,
  onClick,
  bookshelves,
  currentBookshelf,
}) => {
  const [isBookshelfDropdown, setIsBookshelfDropdown] = useState(false);
  // fetch if book is read
  const display =
    currentBookshelf !== '' ? (
      <div className="flex items-center gap-[2px]">
        <FaCheck size={14} className="fill-green-800" />
        {currentBookshelf}
      </div>
    ) : (
      'Want to read'
    );

  const bookshelfNames = bookshelves.map((bookshelf) => (
    <li
      className="hover:bg-neutral-300 pl-[15px] text-xs py-[1px]
      cursor-pointer"
      key={bookshelf.id}
      onClick={() => {
        setIsBookshelfDropdown(true);
      }}
    >
      {bookshelf.name}
    </li>
  ));

  return (
    <div className="bg-[#409D69]/90 text-[13px] text-white rounded-sm">
      <div className="flex items-center justify-between">
        <div
          className={`w-[105px] pr-1 pl-2 py-[5px] border-r-[1px] 
        font-lato text-left overflow-hidden text-ellipsis whitespace-nowrap
        ${
          currentBookshelf === ''
            ? 'hover:bg-[#409D69] border-neutral-600'
            : 'bg-[#F2F2F2] text-black border-none'
        } rounded-bl-sm rounded-tl-sm`}
        >
          {display}
        </div>
        <div
          className="px-2 py-2 hover:bg-[#409D69] rounded-tr-sm rounded-br-sm relative group
          cursor-pointer"
          onClick={(e) => {
            setIsBookshelfDropdown(!isBookshelfDropdown);
          }}
          // onMouseEnter={() => setIsBookshelfDropdown(true)}
          // onMouseLeave={() => {
          //   setTimeout(() => {
          //     setIsBookshelfDropdown(false);
          //   }, 500);
          // }}
        >
          <AiFillCaretDown size={10} className="fill-white" />
          <div
            className={`absolute right-0 top-[26px]
            cursor-auto w-[180px] z-10
          bg-white text-black
            border-[1px] border-neutral-300 rounded-sm
            ${
              isBookshelfDropdown
                ? 'scale-100 origin-top-right delay-150 duration-300 transform ease-in-out'
                : 'scale-0 origin-top-right duration-300 transform ease-in-out'
            }`}
          >
            <ul className="mt-[2px]">{bookshelfNames}</ul>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookButton;
