import { IconType } from 'react-icons';

interface NavIconProps {
  icon: IconType;
}

const NavIcon: React.FC<NavIconProps> = ({ icon: Icon }) => {
  return (
    <div className="flex items-center p-2">
      <div className="p-[5px] rounded-full text-goodreads-beige bg-goodreads-brown/30">
        <Icon size={20} />
      </div>
    </div>
  );
};

export default NavIcon;
