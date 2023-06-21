'use client';

import Link from 'next/link';

interface LinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<LinkProps> = ({ href, label }) => {
  return (
    <>
      <Link className="nav-btn" href={href}>
        {label}
      </Link>
    </>
  );
};

export default NavLink;
