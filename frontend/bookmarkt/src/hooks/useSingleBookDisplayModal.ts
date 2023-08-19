import { create } from 'zustand';

interface SingleBookDisplayModalStore {
  isOn: boolean;
  isAnimate: boolean;
  onEnable: () => void;
  onDisable: () => void;
  enableAnimate: () => void;
  disableAnimate: () => void;
}

const useSingleBookDisplayModal = create<SingleBookDisplayModalStore>(
  (set) => ({
    isOn: false,
    isAnimate: false,
    onEnable: () => set({ isOn: true }),
    onDisable: () => set({ isOn: false }),
    enableAnimate: () => set({isAnimate: true}),
    disableAnimate: () => set({isAnimate: false})
  })
);

export default useSingleBookDisplayModal