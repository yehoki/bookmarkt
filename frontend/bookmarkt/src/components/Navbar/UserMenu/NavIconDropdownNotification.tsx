'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { IconType } from 'react-icons';

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
        <div className="">
          {/* Notification Item */}
          <div className="border-t-[1px]">
            <div className="px-4 flex gap-4">
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
              <div className="text-sm">
                <span className="font-semibold">User,</span> text
                <div className="text-xs text-neutral-400">When</div>
              </div>
            </div>
          </div>
          <div className="border-t-[1px]">
            <div className="px-4">test</div>
          </div>
          <div className="border-t-[1px]">
            <div className="px-4">test</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavIconDropdownNotification;
