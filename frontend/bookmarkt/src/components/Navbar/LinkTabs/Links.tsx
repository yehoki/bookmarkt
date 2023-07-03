'use client';

import NavLink from './NavLink';

const Links = () => {
  return (
    <div
      className="hidden 
    navOne:flex flex-row min-w-fit mx-[15px]"
    >
      <NavLink href="/" label="Home" />
      <NavLink href="/books" label="My Books" />
      <NavLink href="/" label="Browse" extraPadding="navOne:px-[15px]" />
      <NavLink href="/" label="Community" extraPadding="navOne:px-[15px]" />
    </div>
  );
};

export default Links;
