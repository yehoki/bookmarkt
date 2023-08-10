'use client';
import { useCallback, useState } from 'react';
import { IconType } from 'react-icons';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
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
        ${isOpen ? 'scale-100' : 'scale-0'}
        transition origin-top-right
      absolute -right-2
      top-[50px]
      bg-white
      shadow-md
      overflow-hidden
      text-sm
      pt-2 pb-1
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
            <Link className="" href={`/user/show/${currentUser.id}`}>
              <li className="cursor-pointer hover:underline px-4">Profile</li>
            </Link>
            <li className="px-4">Friends</li>
            <li className="px-4">Groups</li>
            <li className="px-4">Discussions</li>
            <li
              className="px-4 border-t-[1px] border-[#D8D8D8] cursor-pointer
              hover:underline
              "
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
