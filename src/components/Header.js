import React from 'react'

function Header(props) {
  return (
    <div className='header'>
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
          <button className='header--form--button'>
            🍳
          </button>
        </form>
      </div>
    </div>
  )
}

export default Header
