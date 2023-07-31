'use client';
import { useCallback, useState } from 'react';
import { IconType } from 'react-icons';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import Image from 'next/image';
interface NavIconDropdownProps {
  icon: IconType;
  currentUser: User;
}

const NavIconDropdown: React.FC<NavIconDropdownProps> = ({
  icon: Icon,
  currentUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <>
      <div
        className={`flex p-2 items-center
        hover:bg-goodreads-brown
        ${isOpen ? 'bg-goodreads-brown' : 'bg-transparent'} outline-none
    cursor-pointer
        `}
        onClick={toggleOpen}
        onBlur={toggleOpen}
      >
        <div
          className={`
  ${currentUser.image ? 'p-0' : 'p-[5px]'}
    rounded-full 
    text-goodreads-brown/20
    bg-goodreads-beige
    border-[1px]
    border-[#D8D8D8]
    transition
    `}
        >
          {currentUser.image ? (
            <div className="relative w-[30px] h-[30px]">
              <Image
                src={currentUser.image}
                alt="Current user image"
                fill
                className="rounded-full"
              />
            </div>
          ) : (
            <Icon size={20} />
          )}
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
              {currentUser.name !== null ? currentUser.name : 'Name'}
            </span>
          </div>
          <ul>
            <li className="px-4">Profile</li>
            <li className="px-4">Friends</li>
            <li className="px-4">Groups</li>
            <li className="px-4">Discussions</li>
            <li
              className="px-4 border-t-[1px] border-[#D8D8D8] cursor-pointer"
              onClick={() => signOut()}
            >
              Sign out
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavIconDropdown;
