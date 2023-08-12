import { create } from 'zustand';

export enum NavbarSelection {
  NONE,
  NOTIFICATION,
  USERMENU,
}

interface NavbarDropdownStore {
  selection: NavbarSelection;
  onOpen: (value: NavbarSelection) => void;
  onClose: () => void;
}

const useNavbarDropdown = create<NavbarDropdownStore>((set) => ({
  selection: NavbarSelection.NONE,
  onOpen: (value) => set({ selection: value }),
  onClose: () => set({ selection: NavbarSelection.NONE }),
}));

export default useNavbarDropdown;
