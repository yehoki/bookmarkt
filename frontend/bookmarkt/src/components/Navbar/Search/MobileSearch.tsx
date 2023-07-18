'use client';

import useMobileSearch from '@/hooks/useMobileSearch';
import { BiSearch } from 'react-icons/bi';
const MobileSearch = () => {
  const mobileSearch = useMobileSearch();
  const handleSearchButtonPress = () => {
    mobileSearch.isOpen ? mobileSearch.onClose() : mobileSearch.onOpen();
  };
  return (
    <button
      onClick={handleSearchButtonPress}
      className="md:hidden text-goodreads-brown ml-4"
    >
      <BiSearch size={20} />
    </button>
  );
};

export default MobileSearch;
