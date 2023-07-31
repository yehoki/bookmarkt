'use client';
import Image from 'next/image';
import { HiUser } from 'react-icons/hi';

interface MobileUserMenuProps {
  currentUserImage: string;
}

const MobileUserMenu: React.FC<MobileUserMenuProps> = ({
  currentUserImage,
}) => {
  return (
    <button className="md:hidden relative flex items-center mr-4 hover:bg-goodreads-brown px-2">
      <div
        className=" 
    relative flex flex-row"
      >
        <div
          className={`
          ${currentUserImage !== '' ? '' : 'p-[5px]'}
          border-[1px] border-[#999999] 
          rounded-full text-goodreads-brown/20 bg-goodreads-beige
        `}
        >
          {currentUserImage !== '' ? (
            <div className="relative w-[30px] h-[30px] rounded-full">
              <Image
                src={currentUserImage}
                fill
                alt={`Current user image`}
                className="rounded-full"
              />
            </div>
          ) : (
            <HiUser size={20} />
          )}
        </div>
      </div>
    </button>
  );
};

export default MobileUserMenu;
