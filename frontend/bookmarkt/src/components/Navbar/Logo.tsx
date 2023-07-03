'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    // <div className="min-w-fit">
    <>
      <Link
        href="/"
        className="cursor-pointer py-[15px] 
        mx-4
        navOne:mx-0
        px-16 
        block
        relative
        h-[50px]
        w-[140px]
        my-auto
        "
      >
        <Image alt="Bookmarkt logo" fill src="/images/bookmarkt.svg" />
      </Link>
    </>

    // </div>
  );
};

export default Logo;
