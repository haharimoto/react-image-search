import React from 'react'
import { Link } from 'react-router-dom'

function SharedHeaders() {
  return (
    <div className='shared-header-navbar'>
      <Link className='header--home' to='/'>🏚</Link>
      <Link className='header--favorites' to='/favorites'>❤</Link>
    </div>
  )
}

export default SharedHeaders
