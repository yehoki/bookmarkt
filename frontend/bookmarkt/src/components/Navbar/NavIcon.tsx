import { IconType } from 'react-icons';

interface NavIconProps {
  icon: IconType;
}

const NavIcon: React.FC<NavIconProps> = ({ icon: Icon }) => {
  return (
    <div className="p-[5px] rounded-full text-goodreads-beige bg-goodreads-brown/30">
      <Icon size={20} />
    </div>
  );
};

export default NavIcon;
