import React from 'react'
import Navbar from './Navbar'


function Header(props) {
  return (
    <div className='header'>
      <Navbar />
      <h2 className='header--heading text-center text-light'>Find Images</h2>
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
