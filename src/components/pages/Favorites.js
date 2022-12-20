import React from 'react'
import Navbar from '../Navbar'
import Image from '../Image'
import create from 'zustand'
import { persist } from 'zustand/middleware'


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
  return (
    <div>
      <Navbar />

      <div className='favorites mt-5 pb-5'>
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

  //* JSON parse and stringify not working properly
  // export const useFavorite = create((set) => ({
  //   // favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  //   favorites: [],
  //   filter: (imageObj) => set(state => ({favorites: state.favorites.filter(imageObj)})),
  //   add: (imageObj) => set(state => ({favorites: [...state.favorites, imageObj]})),

  // }))
