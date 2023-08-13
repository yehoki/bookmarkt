import { create } from 'zustand';

interface MobileUpdateProgressModalStore {
  isOn: boolean;
  onEnable: () => void;
  onDisable: () => void;
}

const useMobileUpdateProgressModal = create<MobileUpdateProgressModalStore>(
  (set) => ({
    isOn: false,
    onEnable: () => set({ isOn: true }),
    onDisable: () => set({ isOn: false }),
  })
);

export default useMobileUpdateProgressModal;
