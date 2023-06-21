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
        height={100}
        width={160}
        src="/images/bookmarkt.png"
      />
    </div>
  );
};

export default Logo;
