'use client';

interface MobileBoxProps {
  children: React.ReactNode;
}

const MobileBox: React.FC<MobileBoxProps> = ({ children }) => {
  return <div className="py-3 px-4 border-b-[1px]">{children}</div>;
};

export default MobileBox;
