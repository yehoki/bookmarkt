import { create } from 'zustand';

interface UserStore {
  userEmail: string;
  setUser: (user: string) => void;
  deleteUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  userEmail: '',
  setUser: (user) => set({ userEmail: user }),
  deleteUser: () => set({ userEmail: '' }),
}));
export default useUserStore;
