import { GoogleBookItemsInterface } from '@/actions/getBooksFromSearch';
import { create } from 'zustand';

interface ResultsStore {
  searchResults: GoogleBookItemsInterface[];
  resultSize: number;
  setResults: (results: GoogleBookItemsInterface[]) => void;
  setResultSize: (resultSize: number) => void;
  removeResults: () => void;
}

const useResultsStore = create<ResultsStore>((set) => ({
  searchResults: [],
  resultSize: 0,
  setResults: (results) => set({ searchResults: results }),
  setResultSize: (resultSize) => set({resultSize: resultSize}),
  removeResults: () => set({ searchResults: [] }),
}));

export default useResultsStore;
