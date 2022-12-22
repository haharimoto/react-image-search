import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


function Navbar() {
  // conditional render style based on different routes
  const location = useLocation()
  let style
  if (location.pathname === '/') {
    style = { height: 'auto' }
  } else {
    style = { height: '126.26px' }
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
    <div className='nav' style={style}>
      <Link onClick={emptySearchResult} className='nav--home' to='/'>🏚</Link>
      <Link className='nav--favorites' to='/favorites'>❤</Link>
    </div>

  )
}

export default Navbar
