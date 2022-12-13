import React from 'react'
import { Link } from 'react-router-dom'

function SharedHeaders() {
  return (
    <div className='shared-header-navbar'>
      <Link className='shared-header-navbar--home' to='/'>🏚</Link>
      <Link className='shared-header-navbar--favorites' to='/favorites'>❤</Link>
    </div>
  )
}

export default SharedHeaders
