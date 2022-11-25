import React from 'react'

function Image(props) {
  function handleFavorite() {
    console.log('favorite')
  }

  return (
    <div className='image'>
      <img src={props.urls.regular} alt="" loading='lazy' />
      <button className='image--favorite' onClick={handleFavorite}>
        ❤
      </button>
    </div>
  )
}

export default Image
