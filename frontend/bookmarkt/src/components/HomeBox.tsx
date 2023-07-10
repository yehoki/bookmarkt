'use client';

import React from 'react';

interface HomeBoxProps {
  bottomBorder?: boolean;
  topBorder?: boolean;
  children: React.ReactNode;
  heading: string;
}

const HomeBox: React.FC<HomeBoxProps> = ({
  bottomBorder,
  topBorder,
  children,
  heading,
}) => {
  return (
    <div className="py-2 border-b-[1px]">
      <div className="uppercase ">{heading}</div>
      {children}
    </div>
  );
};

export default HomeBox;
