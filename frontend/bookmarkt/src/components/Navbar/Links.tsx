'use client';

import NavLink from './NavLink';

const Links = () => {
  return (
    <div className="hidden lg:flex flex-row justify-around">
      <NavLink href="/" label="Home" />
      <NavLink href="/books" label="My Books" />
      <NavLink href="/" label="Browse" />
      <NavLink href="/" label="Community" />
    </div>
  );
};

export default Links;
