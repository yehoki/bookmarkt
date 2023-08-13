'use client';

import useNavbarDropdown, { NavbarSelection } from '@/hooks/useNavbarDropdown';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoutingHandleProps {}

const RoutingHandle: React.FC<RoutingHandleProps> = ({}) => {
  // Closes nav dropdown whenever route is changed
  const router = useRouter();
  const navbarDropdown = useNavbarDropdown();
  useEffect(() => {
    if (navbarDropdown.selection !== NavbarSelection.NONE) {
      navbarDropdown.onClose();
    }
  }, [router]);

  return <></>;
};

export default RoutingHandle;
