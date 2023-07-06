'use client';

import NavLink from './LinkTabs/NavLink';

const MobileDropdown = () => {
  return (
    <div className="md:mx-auto">
      <div className="flex flex-row md:justify-center min-w-fit">
        <NavLink
          href="/"
          label="Home"
          extraPadding="py-3 px-[15px]"
          disabledBreakpoint="md:flex"
        />
        <NavLink href="/books" label="My books" extraPadding="py-3 px-[15px]" />
        <NavLink href="/" label="Browse" extraPadding="px-[15px]" />
        <NavLink href="/" label="Community" extraPadding="px-[15px]" />
      </div>
    </div>
  );
};

export default MobileDropdown;
