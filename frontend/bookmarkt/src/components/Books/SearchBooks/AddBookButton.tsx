'use client';

interface AddBookButtonProps {
  label: string;
  bookId: string;
  isOwned: boolean;
}

const AddBookButton: React.FC<AddBookButtonProps> = ({
  label,
  bookId,
  isOwned,
}) => {
  // fetch if book is read
  const isRead = false;

  return (
    <button
      onClick={() => {}}
      className="bg-[#409D69] text-sm text-white rounded-sm px-2 py-1"
    >
      {label}
    </button>
  );
};

export default AddBookButton;
