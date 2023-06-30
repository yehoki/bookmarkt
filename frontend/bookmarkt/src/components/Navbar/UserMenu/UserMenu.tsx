'use client';

import { User } from '@prisma/client';
import { useCallback, useState } from 'react';
import NavIcon from './NavIcon';
import { BiConversation } from 'react-icons/bi';
import { BsFillBellFill, BsFillPeopleFill } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { HiUser } from 'react-icons/hi';
import NavLink from '../LinkTabs/NavLink';
import useRegisterMode from '@/hooks/useRegisterMode';
import NavIconDropdown from './NavIconDropdown';

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerMode = useRegisterMode();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="hidden relative md:flex mr-2 min-w-fit">
      <div className="flex flex-row">
        {currentUser ? (
          <>
            <NavIcon icon={BsFillBellFill} />
            <NavIcon icon={BiConversation} />
            <NavIcon icon={IoIosMail} />
            <NavIcon icon={BsFillPeopleFill} />
            <NavIconDropdown icon={HiUser} currentUser={currentUser} />
          </>
        ) : (
          <>
            <NavLink label="Sign In" href="/user/sign_in" />
            <NavLink
              label="Join"
              href="/user/sign_up"
              // onClick={registerMode.onOpen}
            />
          </>
        )}
      </div>
      {/* <div
        className="
      absolute
      rounded-xl
      w-3/4
      overflow-hidden
      right-0
      top-20
      text-sm
      bg-white
      "
      >
        <div
          className="
        flex flex-col
        "
        >
          <div>NAME</div>
          <div>Profile</div>
          <div>Friends</div>
          <hr />
          <div>Sign Out</div>
        </div>
      </div> */}
    </div>
  );
};

export default UserMenu;
