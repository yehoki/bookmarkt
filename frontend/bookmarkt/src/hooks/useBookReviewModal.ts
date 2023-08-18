import { create } from 'zustand';

export type BookDetails = {
  googleBookId: string;
  bookId: string;
  authors: string[];
  bookTitle: string;
  thumbnailUrl?: string;
  userRating: number;
  userReview?: string;
  userReviewId: string;
};

interface BookReviewModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  bookDetails: BookDetails;
  setBookDetails: (bookDetails:BookDetails) => void;
  clearBookDetails: () => void;
}

const useBookReviewModal = create<BookReviewModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  bookDetails: {
    googleBookId: '',
    bookTitle: '',
    bookId: '',
    authors: [],
    thumbnailUrl: '',
    userRating: 0,
    userReviewId: ''
  },
  setBookDetails: (bookDetails:BookDetails) => set({bookDetails: bookDetails}),
  clearBookDetails: () => set({bookDetails:{
    googleBookId: '',
    bookTitle: '',
    bookId: '',
    authors: [],
    thumbnailUrl: '',
    userRating: 0, 
    userReviewId: ''
  }})
}));

export default useBookReviewModal;
