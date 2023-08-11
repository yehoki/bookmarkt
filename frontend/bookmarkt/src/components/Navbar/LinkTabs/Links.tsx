'use client';

import NavLink from './NavLink';

interface LinksProps {
  currentUserId: string;
}

const Links: React.FC<LinksProps> = ({ currentUserId }) => {
  return (
    <div
      className="hidden 
    navOne:flex flex-row min-w-fit mx-[15px]"
    >
      <NavLink href="/" label="Home" />
      <NavLink
        href={`${
          currentUserId === ''
            ? '/user/sign_up'
            : `/books/user/${currentUserId}`
        }`}
        label="My Books"
      />
      <NavLink href="/" label="Browse" extraPadding="navOne:px-[15px]" />
      <NavLink href="/" label="Community" extraPadding="navOne:px-[15px]" />
    </div>
  );
};

export default Links;
