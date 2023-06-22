import { IconType } from 'react-icons';

interface NavIconProps {
  icon: IconType;
}

const NavIcon: React.FC<NavIconProps> = ({ icon: Icon }) => {
  return (
    <div className="mx-2 p-[7px] rounded-full text-goodreads-beige bg-goodreads-brown/30">
      <Icon size={18} />
    </div>
  );
};

export default NavIcon;
