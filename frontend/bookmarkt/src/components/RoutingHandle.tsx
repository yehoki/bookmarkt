'use client';

import useMobileSearch from '@/hooks/useMobileSearch';
import useNavbarDropdown, { NavbarSelection } from '@/hooks/useNavbarDropdown';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoutingHandleProps {}

const RoutingHandle: React.FC<RoutingHandleProps> = ({}) => {
  // Closes nav dropdown whenever route is changed
  const router = useRouter();
  const navbarDropdown = useNavbarDropdown();
  const mobileSearch = useMobileSearch();
  useEffect(() => {
    if (navbarDropdown.selection !== NavbarSelection.NONE) {
      navbarDropdown.onClose();
    }
    if (mobileSearch.isOpen) {
      mobileSearch.onClose();
    }
  }, [router]);

  return <></>;
};

export default RoutingHandle;
