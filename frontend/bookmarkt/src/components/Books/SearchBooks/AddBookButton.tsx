'use client';

interface AddBookButtonProps {
  label: string;
  bookId: string;
  isOwned: boolean;
  onClick: () => void;
}

const AddBookButton: React.FC<AddBookButtonProps> = ({
  label,
  bookId,
  isOwned,
  onClick,
}) => {
  // fetch if book is read
  const display = isOwned ? 'Test' : 'Add book';

  return (
    <button
      onClick={onClick}
      className="bg-[#409D69] text-sm text-white rounded-sm px-2 py-1"
    >
      {display}
    </button>
  );
};

export default AddBookButton;
