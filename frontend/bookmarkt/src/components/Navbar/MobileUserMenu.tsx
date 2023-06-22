'use client';
import { HiUser } from 'react-icons/hi';
const MobileUserMenu = () => {
  return (
    <button className="md:hidden relative flex items-center mr-4 hover:bg-goodreads-brown px-2">
      <div
        className=" 
    relative flex flex-row"
      >
        <div
          className="p-[5px] border-[1px] border-[#999999] 
          rounded-full text-goodreads-brown/20 bg-goodreads-beige
        "
        >
          <HiUser size={20} />
        </div>
      </div>
    </button>
  );
};

export default MobileUserMenu;
