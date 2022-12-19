import React from 'react'
import Navbar from '../Navbar'
// import create from 'zustand'
// import { persist } from 'zustand/middleware'


// Zustand
// export const useFavorite = create((set) => ({
//   favorites: JSON.parse(localStorage.getItem("favorites")) || [],
//   setFavorites: (favorites) => set({favorites}),
// }))


function Favorites() {

  return (
    <div>
      <Navbar />
      <div className='favorites'>
      Favorites
      </div>
    </div>
  )
}

export default Favorites

  // Zustand EXAMPLE:
  // bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
