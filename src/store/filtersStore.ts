import { create } from 'zustand'

interface FilterState {
  searchText: string
  searchPlace: string
  currentPage: number
  totalPages: number
  nbResults: number
}

interface FilterAction {
  setSearchText: (searchText: FilterState['searchText']) => void
  setSearchPlace: (searchPlace: FilterState['searchPlace']) => void
  setCurrentPage: (currentPage: FilterState['currentPage']) => void
  setTotalPages: (totalPages: FilterState['totalPages']) => void
  setNbResults: (nbResults: FilterState['nbResults']) => void
  reset: () => void
}

const initialState: FilterState = {
  searchText: '',
  searchPlace: '',
  currentPage: 1,
  totalPages: 0,
  nbResults: 0,
}

export const useFilterStore = create<FilterState & FilterAction>((set) => ({
  ...initialState,
  setSearchText: (searchText) => set(() => ({ searchText })),
  setSearchPlace: (searchPlace) => set(() => ({ searchPlace })),
  setCurrentPage: (currentPage) => set(() => ({ currentPage })),
  setTotalPages: (totalPages) => set(() => ({ totalPages })),
  setNbResults: (nbResults) => set(() => ({ nbResults })),
  reset: () => {
    set(initialState)
  },
}))

export const useSearchText = () => useFilterStore((state) => state.searchText)
export const useSetSearchText = () => useFilterStore((state) => state.setSearchText)

export const useSearchPlace = () => useFilterStore((state) => state.searchPlace)
export const useSetSearchPlace = () => useFilterStore((state) => state.setSearchPlace)

export const useCurrentPage = () => useFilterStore((state) => state.currentPage)
export const useSetCurrentPage = () => useFilterStore((state) => state.setCurrentPage)

export const useTotalPages = () => useFilterStore((state) => state.totalPages)
export const useSetTotalPages = () => useFilterStore((state) => state.setTotalPages)

export const useNbResults = () => useFilterStore((state) => state.nbResults)
export const useSetNbResults = () => useFilterStore((state) => state.setNbResults)

export const useResetFilterStore = () => useFilterStore((state) => state.reset)
