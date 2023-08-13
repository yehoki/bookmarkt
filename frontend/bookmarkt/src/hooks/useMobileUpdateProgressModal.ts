import { create } from 'zustand';

interface MobileUpdateProgressModalStore {
  isOn: boolean;
  currentPageCount: number;
  currentProgress: number;
  currentComment: string;
  currentGoogleId: string;
  onEnable: () => void;
  onDisable: () => void;
  setCurrentPageCount: (pageCount: number) => void;
  setCurrentGoogleId: (googleId: string) => void;
  setCurrentProgress: (progress: number) => void;
  setCurrentComment: (comment: string) => void;
  onModalClose: () => void;
}

const useMobileUpdateProgressModal = create<MobileUpdateProgressModalStore>(
  (set) => ({
    isOn: false,
    currentPageCount: 0,
    currentGoogleId: '',
    currentComment: '',
    currentProgress: 0,
    onEnable: () => set({ isOn: true }),
    onDisable: () => set({ isOn: false }),
    setCurrentGoogleId: (googleId) => set({ currentGoogleId: googleId }),
    setCurrentPageCount: (pageCount) => set({ currentPageCount: pageCount }),
    setCurrentComment: (comment) =>
      set({
        currentComment: comment,
      }),
    setCurrentProgress: (progress) =>
      set({
        currentProgress: progress,
      }),
    onModalClose: () =>
      set({
        currentPageCount: 0,
        currentGoogleId: '',
        currentComment: '',
        currentProgress: 0,
      }),
  })
);

export default useMobileUpdateProgressModal;
