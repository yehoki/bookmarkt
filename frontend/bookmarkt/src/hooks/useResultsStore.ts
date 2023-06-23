import { GoogleBookItemsInterface } from '@/actions/getBooksFromSearch';
import { create } from 'zustand';

interface ResultsStore {
  searchResults: GoogleBookItemsInterface[];
  setResults: (results: GoogleBookItemsInterface[]) => void;
  removeResults: () => void;
}

const useResultsStore = create<ResultsStore>((set) => ({
  searchResults: [],
  setResults: (results) => set({ searchResults: results }),
  removeResults: () => set({ searchResults: [] }),
}));

export default useResultsStore;
