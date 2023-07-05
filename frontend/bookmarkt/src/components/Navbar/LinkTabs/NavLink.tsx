'use client';

import Link from 'next/link';

interface LinkProps {
  href: string;
  label: string;
  extraPadding?: string;
  onClick?: () => void;
  disabledBreakpoint?: string;
}

const NavLink: React.FC<LinkProps> = ({
  href,
  label,
  onClick,
  extraPadding,
  disabledBreakpoint = '',
}) => {
  return (
    <>
      <Link
        className={`
        ${disabledBreakpoint === '' ? 'flex' : `hidden ${disabledBreakpoint}`}
        flex-auto md:flex-initial
        items-center
        justify-center
      text-[#382110] 
      hover:text-white 
      hover:bg-[#382110]
      px-4
      `}
        href={href}
        onClick={onClick}
      >
        <div className={`${extraPadding}`}>{label}</div>
      </Link>
    </>
  );
};

export default NavLink;
