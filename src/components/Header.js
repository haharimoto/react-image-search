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
      <h4 className='text-center text-light'>Find Images</h4>
      <div className='header--form pt-1'>
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
