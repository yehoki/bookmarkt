'use client';

import useMobileSearch from '@/hooks/useMobileSearch';
import NavLink from './LinkTabs/NavLink';
import MobileSearchInput from './Search/MobileSearchInput';

interface MobileDropdownProps {
  currentUserId: string;
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({ currentUserId }) => {
  const mobileSearch = useMobileSearch();
  return (
    <div className="md:mx-auto">
      <div className="flex flex-row md:justify-center min-w-fit">
        {mobileSearch.isOpen ? (
          <>
            <MobileSearchInput />
          </>
        ) : (
          <>
            <NavLink
              href="/"
              label="Home"
              extraPadding="py-3 px-[15px]"
              disabledBreakpoint="md:flex"
            />
            <NavLink
              href={`${
                currentUserId === ''
                  ? '/user/sign_up'
                  : `/books/user/${currentUserId}`
              }`}
              label="My books"
              extraPadding="py-3 px-[15px]"
            />
            <NavLink href="/" label="Browse" extraPadding="px-[15px]" />
            <NavLink href="/" label="Community" extraPadding="px-[15px]" />
          </>
        )}
      </div>
    </div>
  );
};

export default MobileDropdown;
