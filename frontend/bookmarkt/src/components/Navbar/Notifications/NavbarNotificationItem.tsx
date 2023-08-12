'use client';

import Image from 'next/image';
import Link from 'next/link';

interface NavbarNotificationItemProps {
  userId: string;
  fromUserId: string;
  userName: string;
  userImage: string;
  notificationInfo: string;
  notificationCreatedAt: Date;
}

const NavbarNotificationItem: React.FC<NavbarNotificationItemProps> = ({
  userId,
  fromUserId,
  userImage,
  notificationInfo,
  notificationCreatedAt,
  userName,
}) => {
  return (
    <div className="border-t-[1px]">
      <div className="px-4 py-2 flex gap-4">
        <div>
          <div className="relative w-[30px] h-[30px]">
            <Link href={`/user/show/${fromUserId}`}>
              <Image
                src="/images/empty-user.png"
                fill
                alt="User image"
                className="rounded-full border"
              />
            </Link>
          </div>
        </div>
        <div className="text-sm text-goodreads-mybooks-green font-normal leading-4">
          <Link className="hover:underline" href={`/user/show/${fromUserId}`}>
            <span className="font-bold">{userName}</span>
          </Link>{' '}
          <Link className="hover:underline" href={`/user/show/${fromUserId}`}>
            {notificationInfo}
          </Link>
          <div className="text-xs text-neutral-400">When</div>
        </div>
      </div>
    </div>
  );
};

export default NavbarNotificationItem;
