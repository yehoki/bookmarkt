'use client';
import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

interface AddBookButtonProps {
  label: string;
  bookId: string;
  isOwned: boolean;
  onClick: () => void;
}

const AddBookButton: React.FC<AddBookButtonProps> = ({
  label,
  bookId,
  isOwned,
  onClick,
}) => {
  const [isBookshelfDropdown, setIsBookshelfDropdown] = useState(false);
  // fetch if book is read
  const display = isOwned
    ? 'Very long text that might have to be clipped'
    : 'Want to read';

  return (
    <div className="bg-[#409D69]/90  text-sm text-white rounded-sm">
      <div className="flex items-center justify-between">
        <div
          className="w-[105px] pr-2 pl-2 py-[3px] border-r-[1px] 
        font-lato text-left overflow-hidden text-ellipsis whitespace-nowrap
        hover:bg-[#409D69] rounded-bl-sm rounded-tl-sm"
        >
          {display}
        </div>
        <div
          className="px-2 py-2 hover:bg-[#409D69] rounded-tr-sm rounded-br-sm relative group
          cursor-pointer"
          onClick={() => {
            setIsBookshelfDropdown(!isBookshelfDropdown);
          }}
        >
          <AiFillCaretDown size={10} className="fill-white" />
          <div
            className={`absolute right-0 top-[26px]
            cursor-auto
      w-[180px] pl-[15px] bg-white 
      border-[1px] border-neutral-300 rounded-sm
      transform scale-0 group-hover:scale-100 delay-300 duration-150 ease-in-out origin-top
      z-10
      `}
          >
            Dropdown
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookButton;
