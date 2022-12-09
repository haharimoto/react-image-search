import create from 'zustand'


const useStore = create((set) => ({
  input: '',
  setInput: (input) => set((state) => ({
    ...state,
    input
  })),
  allImages: [],
  setAllImages: (allImages) => set((state) => ({
    ...state,
    allImages
  })),
  favorites: [],
  setFavorites: (favorites) => set((state) => ({
    ...state,
    favorites
  }))
}))

export default useStore

// () => JSON.parse(localStorage.getItem("favorites")) ||

// const input = useStore((state) => state.input)
// const setInput = useStore((state) => state.setInput)
// const allImages = useStore((state) => state.allImages)
// const setAllImages = useStore((state) => state.setAllImages)
// const favorites = useStore((state) => state.favorites)
// const setFavorites = useStore((state) => state.setFavorites)
