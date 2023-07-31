import { create } from 'zustand';

interface AddBookButtonStore {
  isEnabled: boolean;
  onDisable: () => void;
  onEnable: () => void;
}

const useAddBookButton = create<AddBookButtonStore>((set) => ({
  isEnabled: true,
  onDisable: () => set({ isEnabled: false }),
  onEnable: () => set({ isEnabled: true }),
}));

export default useAddBookButton;
