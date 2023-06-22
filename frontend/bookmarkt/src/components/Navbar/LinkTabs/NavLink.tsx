'use client';

import Link from 'next/link';

interface LinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavLink: React.FC<LinkProps> = ({ href, label, onClick }) => {
  return (
    <>
      <Link
        className="px-4
        flex
        items-center 
      text-[#382110] 
      hover:text-white 
      hover:bg-[#382110]
      focus:bg-[#382110]
      focus:text-white"
        href={href}
        onClick={onClick}
      >
        {label}
      </Link>
    </>
  );
};

export default NavLink;