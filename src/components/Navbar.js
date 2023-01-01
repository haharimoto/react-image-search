import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/fontawesome-free-solid'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

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
    navStyle = { height: '149.43px' }
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

  // dark mode
  let lightStyle
  if (darkMode === 'light') {
    lightStyle = { 'fontWeight': 'bold', 'transition': '0.4s' }
  } else {
    lightStyle = { 'fontWeight': 'normal', 'opacity': '20%', 'transition': '0.4s' }
  }

  let darkStyle
  if (darkMode === 'dark') {
    darkStyle = { 'fontWeight': 'bold', 'transition': '0.4s' }
  } else {
    darkStyle = { 'fontWeight': 'normal', 'opacity': '20%', 'transition': '0.4s' }
  }

  return (
    <div className='nav' style={navStyle}>
      <div className='nav--links'>
        <Link onClick={emptySearchResult} className='nav--home' to='/'>
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link className='nav--favorites' to='/favorites'>
          <FontAwesomeIcon icon={faHeart} />
        </Link>
      </div>

      <div className='nav--toggle'>
        <p style={lightStyle}>Light</p>
        <label className='nav--toggle--switch'>
          <input type="checkbox" checked={darkMode === 'dark'} onChange={toggle} />
          <span className="nav--toggle--slider round"></span>
        </label>
        <p style={darkStyle}>Dark</p>
      </div>
    </div>

  )
}

export default Navbar


// {darkMode === 'light' ? 'light' : 'dark'}
