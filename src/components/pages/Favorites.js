import React from 'react'
import Navbar from '../Navbar'
import Image from '../Image'
import create from 'zustand'
import { useEffect } from 'react'
import { persist } from 'zustand/middleware'
import ErrorMsg, { useError } from '../ErrorMsg'


// Zustand
let store = (set) => ({
  favorites: [],
  filter: (condition) => set(state => ({favorites: state.favorites.filter(condition)})),
  add: (imageObj) => set(state => ({favorites: [...state.favorites, imageObj]})),
})
store = persist(store, { name: 'favorites' })
export const useFavorite = create(store)


function Favorites() {
  const favorites = useFavorite(state => state.favorites)
  const showError = useError(state => state.showError)
  const setShowError = useError(state => state.setShowError)
  // const [isOnline, setIsOnline] = useState(window.navigator.onLine)

  useEffect(() => {
    window.addEventListener('online', () => setShowError(false))
    window.addEventListener('offline', () => setShowError(true))

    return () => {
      window.removeEventListener('online', () => setShowError(false))
      window.removeEventListener('offline', () => setShowError(true))
    }
    //* eslint
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Navbar />
      {showError && <ErrorMsg />}

      <div className='favorites-image-list mt-5 pb-5'>
        {favorites.map(el => (
          <Image
            key={el.id}
            {...el}
            el={el}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites







  //* Zustand EXAMPLE:
  // bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),

  //* not right
  // setFavorites: (favorites) => set({favorites}),
