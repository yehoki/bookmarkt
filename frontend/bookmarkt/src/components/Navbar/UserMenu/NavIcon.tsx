import Link from 'next/link';
import { IconType } from 'react-icons';

interface NavIconProps {
  icon: IconType;
  href?: string;
}

const NavIcon: React.FC<NavIconProps> = ({ icon: Icon, href }) => {
  return (
    <div className="flex items-center p-2 hover:bg-goodreads-brown cursor-pointer">
      <div className="p-[5px] text-goodreads-beige rounded-full bg-[#754E30]">
        {href ? (
          <Link href={href}>
            <Icon className="" size={20} />
          </Link>
        ) : (
          <Icon className="" size={20} />
        )}
      </div>
    </div>
  );
};

export default NavIcon;
