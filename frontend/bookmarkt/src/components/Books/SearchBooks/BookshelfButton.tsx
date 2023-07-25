'use client';

import { FaCheck } from 'react-icons/fa';

interface BookshelfButtonProps {
  displayBookshelfName: string;
}

const BookshelfButton: React.FC<BookshelfButtonProps> = ({
  displayBookshelfName,
}) => {
  return (
    <div className="flex items-center gap-[2px]">
      <FaCheck size={14} className="fill-green-800" />
      <div className="font-lato text-left overflow-hidden text-ellipsis whitespace-nowrap">
        {displayBookshelfName}
      </div>
    </div>
  );
};

export default BookshelfButton;
