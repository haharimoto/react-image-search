import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import create from 'zustand'
import { persist } from 'zustand/middleware'

// Zustand
let store = (set) => ({
  darkMode: 'light',
  toggle: () => set(state => ({
    darkMode: state.darkMode === 'light' ? 'dark' : 'light'
  }))
})
store = persist(store, { name: 'darkMode' })
export const useDarkMode = create(store)


function Navbar() {
  const darkMode = useDarkMode(state => state.darkMode)
  const toggle = useDarkMode(state => state.toggle)

  const location = useLocation()
  let navStyle
  if (location.pathname === '/') {
    navStyle = { height: 'auto' }
  } else {
    navStyle = { height: '126.26px' }
  }

  // clear 'allImages' from LocalStorage
  function emptySearchResult() {
    localStorage.removeItem('input')
    localStorage.removeItem('allImages')
    // reload only on home page
    if (location.pathname === '/') {
      window.location.reload()
    }
  }

  return (
    <div className='nav' style={navStyle}>
      <div className='nav--links'>
        <Link onClick={emptySearchResult} className='nav--home' to='/'>🏚</Link>
        <Link className='nav--favorites' to='/favorites'>❤</Link>
      </div>
      <div className='nav--toggle'>
        <label className='switch'>
          <input type="checkbox" checked={darkMode === 'dark'} onChange={toggle} />
          <span className="slider round"></span>
          {darkMode === 'light' ? 'light' : 'dark'}
        </label>
      </div>
    </div>

  )
}

export default Navbar
