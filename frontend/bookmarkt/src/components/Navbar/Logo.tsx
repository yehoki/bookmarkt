'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <div>
      <Image
        className="cursor-pointer"
        alt="Bookmarkt logo"
        height={50}
        width={140}
        src="/images/bookmarkt.png"
      />
    </div>
  );
};

export default Logo;
