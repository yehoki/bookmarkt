import { create } from 'zustand';

interface BookReviewModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  bookDetails: {
    googleBookId: string;
  };
}

const useBookReviewModal = create<BookReviewModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  bookDetails: {
    googleBookId: '',
  },
}));

export default useBookReviewModal;
