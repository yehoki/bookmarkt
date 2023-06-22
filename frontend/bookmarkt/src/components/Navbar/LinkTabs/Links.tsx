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
      <NavLink href="/" label="Browse" />
      <NavLink href="/" label="Community" />
    </div>
  );
};

export default Links;
