'use client';

interface SearchDropdownTileProps {
  label: string;
}

const SearchDropdownTile: React.FC<SearchDropdownTileProps> = ({ label }) => {
  return <div className="bg-white border-[1px] w-full leading-8">{label}</div>;
};

export default SearchDropdownTile;
