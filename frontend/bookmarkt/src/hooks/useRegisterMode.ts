import { create } from 'zustand';

interface RegisterModeStore {
  isOn: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterMode = create<RegisterModeStore>((set) => ({
  isOn: true,
  onOpen: () => set({ isOn: true }),
  onClose: () => set({ isOn: false }),
}));
export default useRegisterMode;
