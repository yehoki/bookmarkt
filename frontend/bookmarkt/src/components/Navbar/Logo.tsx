'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    // <div className="min-w-fit">
    <>
      <Image
        className="cursor-pointer py-[15px] 
        mx-4
        navOne:mx-0 
        "
        alt="Bookmarkt logo"
        width={140}
        height={50}
        src="/images/bookmarkt.svg"
      />
    </>

    // </div>
  );
};

export default Logo;
