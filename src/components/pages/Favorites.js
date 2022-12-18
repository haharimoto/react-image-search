import React from 'react'
// import SharedHeader from '../SharedHeader'
import create from 'zustand'


// Zustand
export const useFavorite = create((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  setFavorites: (favorites) => set({favorites})
}))


function Favorites() {

  return (
    <div>
      {/* <SharedHeader /> */}
      <div className='favorite-images'>


      </div>
    </div>
  )
}

export default Favorites


  // Zustand EXAMPLE:
  // bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
