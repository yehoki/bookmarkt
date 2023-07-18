import { create } from 'zustand';

interface MobileSearchStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMobileSearch = create<MobileSearchStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMobileSearch;
