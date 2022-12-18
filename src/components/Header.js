import React from 'react'
// import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <div className='header'>
      {/* <div className='header--navbar'>
        <Link className='header--navbar--home' to='/'>🏚</Link>
        <Link className='header--navbar--favorites' to='/favorites'>❤</Link>
      </div> */}
      <h4 className='text-center text-light pt-4'>Find Images</h4>
      <div className='header--form pt-1 pb-4'>
        <form onSubmit={props.handleSubmit}>
          <input
            className='header--form--input'
            autoComplete='off'
            type='text'
            placeholder='Search'
            onChange={props.handleChange}
            name='input'
            value={props.input}
          />
        </form>
      </div>
    </div>
  )
}

export default Header
