'use client';

import { BiSearch } from 'react-icons/bi';
const MobileSearch = () => {
  return (
    <button className="md:hidden text-goodreads-brown ml-4">
      <BiSearch size={20} />
    </button>
  );
};

export default MobileSearch;
