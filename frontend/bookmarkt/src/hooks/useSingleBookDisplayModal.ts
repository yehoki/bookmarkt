import { Bookshelf } from '@prisma/client';
import { create } from 'zustand';

export interface BookshelfOptions {
  bookId: string;
  bookshelves: Bookshelf[];
  currentBookshelf: string;
}

export interface WebsiteOptions {
  ISBN: string;
  websites: {
    name: string;
    url: string;
  }[];
}

interface SingleBookDisplayModalStore {
  isOn: boolean;
  isAnimate: boolean;
  decideOption: 'none' | 'buy' | 'bookshelf';
  bookshelfOptions: BookshelfOptions;
  websiteOptions: WebsiteOptions;
  setBookshelfOptions: (bookshelfOptions: BookshelfOptions) => void;
  setWebsiteOptions: (websiteOptions: WebsiteOptions) => void;
  setDecideOption: (option: 'none' | 'buy' | 'bookshelf') => void;
  onEnable: () => void;
  onDisable: () => void;
  enableAnimate: () => void;
  disableAnimate: () => void;
}

const useSingleBookDisplayModal = create<SingleBookDisplayModalStore>(
  (set) => ({
    isOn: false,
    isAnimate: false,
    decideOption: 'none',
    bookshelfOptions: {
      bookId: '',
      bookshelves: [],
      currentBookshelf: '',
    },
    websiteOptions: {
      ISBN: '',
      websites: [],
    },
    setBookshelfOptions: (bookshelfOptions) =>
      set({ bookshelfOptions: bookshelfOptions }),
    setWebsiteOptions: (websiteOptions) =>
      set({ websiteOptions: websiteOptions }),
    setDecideOption: (option) => set({ decideOption: option }),
    onEnable: () => set({ isOn: true }),
    onDisable: () =>
      set({
        isOn: false,
        bookshelfOptions: {
          bookId: '',
          bookshelves: [],
          currentBookshelf: '',
        },
      }),
    enableAnimate: () => set({ isAnimate: true }),
    disableAnimate: () => set({ isAnimate: false }),
  })
);

export default useSingleBookDisplayModal;
