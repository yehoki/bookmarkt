'use client';

import Link from 'next/link';

interface LinkProps {
  href: string;
  label: string;
  extraPadding?: string;
  onClick?: () => void;
}

const NavLink: React.FC<LinkProps> = ({
  href,
  label,
  onClick,
  extraPadding,
}) => {
  return (
    <>
      <Link
        className="
        flex
        items-center 
      text-[#382110] 
      hover:text-white 
      hover:bg-[#382110]
      focus:bg-[#382110]
      focus:text-white
      px-4
      "
        href={href}
        onClick={onClick}
      >
        <div className={`${extraPadding}`}>{label}</div>
      </Link>
    </>
  );
};

export default NavLink;
