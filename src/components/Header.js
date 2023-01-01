import React from 'react'
import Navbar from './Navbar'
// import { useLocation } from 'react-router-dom'



function Header(props) {
  // const location = useLocation()
  // let style
  // if (location.pathname === '/') {
  //   style = { height: 'auto' }
  // } else {
  //   style = { height: '126.26px' }
  // }

  return (
    <div className='header'>
      <Navbar />
      <h2 className='text-center text-light'>Find Images</h2>
      <div className='header--form'>
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
