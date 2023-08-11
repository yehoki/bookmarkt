'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { IconType } from 'react-icons';
import NavbarNotificationItem from '../Notifications/NavbarNotificationItem';

interface NavIconDropdownNotificationProps {
  icon: IconType;
}

const NavIconDropdownNotification: React.FC<
  NavIconDropdownNotificationProps
> = ({ icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
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
          {/* Notification Item */}
          <NavbarNotificationItem />
          <NavbarNotificationItem />
          <NavbarNotificationItem />
          <NavbarNotificationItem />
        </div>
      </div>
    </>
  );
};

export default NavIconDropdownNotification;
