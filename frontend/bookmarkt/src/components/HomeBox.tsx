'use client';

import React from 'react';

interface HomeBoxProps {
  bottomBorder?: boolean;
  topBorder?: boolean;
  children: React.ReactNode;
  heading: string;
  onlyTwoRows?: boolean;
}

const HomeBox: React.FC<HomeBoxProps> = ({
  bottomBorder,
  topBorder,
  children,
  heading,
  onlyTwoRows,
}) => {
  return (
    <div
      className={`
    ${onlyTwoRows ? 'hidden md:block navOne:hidden' : ''}
    py-2 
    ${bottomBorder ? 'border-b-[1px]' : 'border-none'}`}
    >
      <div className="uppercase font-semibold">{heading}</div>
      {children}
    </div>
  );
};

export default HomeBox;
