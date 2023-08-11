'use client';

import Image from 'next/image';
import { Suspense, useCallback, useState } from 'react';
import { IconType } from 'react-icons';
import NavbarNotificationItem from '../Notifications/NavbarNotificationItem';
import { Notification, User } from '@prisma/client';

interface NavIconDropdownNotificationProps {
  icon: IconType;
  currentUser?: User | null;
}

type notificationDisplayType = {
  notificationId: string;
  userId: string;
  userImage: string;
  notificationDetails: string;
  notificationCreatedAt: Date;
};

type UserNotificationType = User & {
  notifications: Notification[];
};

const NavIconDropdownNotification: React.FC<
  NavIconDropdownNotificationProps
> = ({ icon: Icon, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<notificationDisplayType[]>(
    []
  );

  const toggleOpen = useCallback(async () => {
    if (currentUser && !isOpen) {
      const res = await fetch(`/api/users/notifications/${currentUser.id}`, {
        next: {
          revalidate: 60,
        },
      });
      const userData: UserNotificationType = await res.json();
      const userDataRefactored = userData.notifications.map((notification) => {
        return {
          notificationId: notification.id,
          userId: userData.id,
          userImage: userData.image ? userData.image : '/images/empty-user.png',
          notificationDetails: notification.notificationInfo,
          notificationCreatedAt: notification.createdAt,
        };
      });
      setNotifications(userDataRefactored);
    }
    setIsOpen((value) => !value);
  }, []);
  return (
    <>
      <div
        onClick={toggleOpen}
        onBlur={toggleOpen}
        className="flex items-center p-2 
    hover:bg-goodreads-brown cursor-pointer 
    relative"
      >
        <div
          className="p-[5px] text-goodreads-beige rounded-full bg-[#754E30]
      "
        >
          <Icon size={20} />
        </div>
      </div>
      <div
        className={`
    ${isOpen ? 'scale-100' : 'scale-0'}
    absolute 
    transition origin-top-right
    top-[50px] right-[186px] bg-white
    w-[330px] 
    text-sm`}
      >
        <div className="uppercase font-semibold text-xs px-4 py-2">
          Notifications
        </div>
        <div className="max-h-[380px] overflow-y-scroll">
          <Suspense fallback="...">
            {notifications.map((notification) => (
              <NavbarNotificationItem key={notification.notificationId} />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default NavIconDropdownNotification;
