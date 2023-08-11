'use client';

import Image from 'next/image';

interface NavbarNotificationItemProps {}

const NavbarNotificationItem: React.FC<NavbarNotificationItemProps> = ({}) => {
  return (
    <div className="border-t-[1px]">
      <div className="px-4 py-2 flex gap-4">
        <div>
          <div className="relative w-[30px] h-[30px]">
            <Image
              src="/images/empty-user.png"
              fill
              alt="User image"
              className="rounded-full border"
            />
          </div>
        </div>
        <div className="text-sm font-normal leading-4">
          <span className="font-bold">User,</span> Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Impedit laboriosam ducimus enim ipsam
          corporis. Earum perferendis maxime excepturi ad voluptatem cum
          laboriosam, pariatur necessitatibus ut, esse iure, quaerat deleniti.
          Beatae?
          <div className="text-xs text-neutral-400">When</div>
        </div>
      </div>
    </div>
  );
};

export default NavbarNotificationItem;
