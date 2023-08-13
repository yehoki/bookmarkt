import { create } from 'zustand';

interface MobileUpdateProgressModalStore {
  isOn: boolean;
  currentPageCount: number;
  currentGoogleId: string;
  onEnable: () => void;
  onDisable: () => void;
  setCurrentPageCount: (pageCount: number) => void;
  setCurrentGoogleId: (googleId: string) => void;
  onModalClose: () => void;
}

const useMobileUpdateProgressModal = create<MobileUpdateProgressModalStore>(
  (set) => ({
    isOn: false,
    currentPageCount: 0,
    currentGoogleId: '',
    onEnable: () => set({ isOn: true }),
    onDisable: () => set({ isOn: false }),
    setCurrentGoogleId: (googleId) => set({ currentGoogleId: googleId }),
    setCurrentPageCount: (pageCount) => set({ currentPageCount: pageCount }),
    onModalClose: () =>
      set({
        currentPageCount: 0,
        currentGoogleId: '',
      }),
  })
);

export default useMobileUpdateProgressModal;
