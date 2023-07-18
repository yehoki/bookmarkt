'use client';

import useMobileSearch from '@/hooks/useMobileSearch';
import NavLink from './LinkTabs/NavLink';
import MobileSearchInput from './Search/MobileSearchInput';

const MobileDropdown = () => {
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
              href="/books"
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
