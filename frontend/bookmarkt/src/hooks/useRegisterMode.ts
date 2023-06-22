import { create } from 'zustand';

interface RegisterModeStore {
  isOn: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterMode = create<RegisterModeStore>((set) => ({
  isOn: false,
  onOpen: () => set({ isOn: true }),
  onClose: () => set({ isOn: false }),
}));
export default useRegisterMode;
