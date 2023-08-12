'use client';

import Image from 'next/image';
import { Suspense, useCallback, useState } from 'react';
import { IconType } from 'react-icons';
import NavbarNotificationItem from '../Notifications/NavbarNotificationItem';
import { Notification, User } from '@prisma/client';
import useNavbarDropdown, { NavbarSelection } from '@/hooks/useNavbarDropdown';

interface NavIconDropdownNotificationProps {
  icon: IconType;
  currentUser?: User | null;
}

type notificationDisplayType = {
  notificationId: string;
  userId: string;
  fromUserId: string;
  userName: string;
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
  const [notifications, setNotifications] = useState<notificationDisplayType[]>(
    []
  );
  const navbarDropdown = useNavbarDropdown();

  const toggleOpen = useCallback(async () => {
    if (
      currentUser &&
      navbarDropdown.selection !== NavbarSelection.NOTIFICATION
    ) {
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
          fromUserId: notification.fromUserId,
          userImage: userData.image ? userData.image : '/images/empty-user.png',
          notificationDetails: notification.notificationInfo,
          notificationCreatedAt: notification.createdAt,
          userName: notification.userName ? notification.userName : 'User',
        };
      });
      setNotifications(userDataRefactored);
    }
    if (navbarDropdown.selection === NavbarSelection.NONE) {
      navbarDropdown.onOpen(NavbarSelection.NOTIFICATION);
    } else if (navbarDropdown.selection === NavbarSelection.NOTIFICATION) {
      navbarDropdown.onClose();
    } else {
      navbarDropdown.onOpen(NavbarSelection.NOTIFICATION);
    }
  }, [navbarDropdown, currentUser]);
  return (
    <>
      <div
        onClick={toggleOpen}
        className={`flex items-center p-2 
    hover:bg-goodreads-brown cursor-pointer 
    relative
    ${
      navbarDropdown.selection === NavbarSelection.NOTIFICATION
        ? 'bg-goodreads-brown'
        : 'bg-transparent'
    }
    `}
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
    ${
      navbarDropdown.selection === NavbarSelection.NOTIFICATION
        ? 'scale-100'
        : 'scale-0'
    }
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
              <NavbarNotificationItem
                key={notification.notificationId}
                userId={notification.userId}
                fromUserId={notification.fromUserId}
                userImage={notification.userImage}
                notificationInfo={notification.notificationDetails}
                notificationCreatedAt={notification.notificationCreatedAt}
                userName={notification.userName}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default NavIconDropdownNotification;
