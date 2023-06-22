'use client';

import { User } from '@prisma/client';
import { useCallback, useState } from 'react';
import NavIcon from './NavIcon';
import { BiConversation } from 'react-icons/bi';
import { BsFillBellFill, BsFillPeopleFill } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { HiUser } from 'react-icons/hi';
import NavLink from './NavLink';
import { signIn } from 'next-auth/react';
import useRegisterMode from '@/hooks/registerMode';

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
    <div className="hidden relative md:flex items-center mr-2 min-w-fit">
      <div className="flex flex-row gap-2">
        {currentUser ? (
          <>
            <NavIcon icon={BsFillBellFill} />
            <NavIcon icon={BiConversation} />
            <NavIcon icon={IoIosMail} />
            <NavIcon icon={BsFillPeopleFill} />
            <NavIcon icon={HiUser} />
          </>
        ) : (
          <>
            <button onClick={() => signIn()}>Login</button>
            <NavLink label="Login" href="/login" />
            <NavLink
              label="Sign up"
              href="/register"
              onClick={registerMode.onOpen}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
