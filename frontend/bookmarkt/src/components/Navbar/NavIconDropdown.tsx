'use client';
import { useCallback, useState } from 'react';
import { IconType } from 'react-icons';

interface NavIconDropdownProps {
  icon: IconType;
}

const NavIconDropdown: React.FC<NavIconDropdownProps> = ({ icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <>
      <div
        className="flex p-2 items-center
        hover:bg-goodreads-brown
        active:bg-goodreads-brown outline-none
    cursor-pointer
        "
        contentEditable
        onClick={toggleOpen}
        onBlur={toggleOpen}
      >
        <div
          className="
    p-[5px]
    rounded-full 
    text-goodreads-beige 
    bg-goodreads-brown/30
    transition
    "
        >
          <Icon size={20} />
        </div>
      </div>

      <div
        className={`
        ${isOpen ? 'block' : 'hidden'}
      absolute -right-2
      top-[50px]
      bg-white
      shadow-md
      overflow-hidden
      text-sm
      py-2
      w-[250px]
      `}
      >
        <div
          className="
        flex flex-col
        justify-center
        leading-8
        "
        >
          <div>
            <span className="px-4 font-semibold text-md uppercase">
              Your Name
            </span>
          </div>
          <ul>
            <li className="px-4">Profile</li>
            <li className="px-4">Friends</li>
            <li className="px-4">Groups</li>
            <li className="px-4">Discussions</li>
            <li className="px-4 border-t-[1px] border-[#D8D8D8]">Sign out</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavIconDropdown;
