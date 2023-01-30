import React from 'react'
import Navbar from './Navbar'
import { useMain } from './Main'


function Header(props) {
  const input = useMain(state => state.input)

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
            value={input}
          />
        </form>
      </div>
    </div>
  )
}

export default Header
