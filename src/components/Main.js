import React from 'react'
import Image from './Image'
import { useState, useEffect } from 'react'

function Main() {
  const [input, setInput] = useState('')
  const [allImages, setAllImages] = useState([])
  const [filtered, setFiltered] = useState([])
  // ?filtered array is undefined after appending
  // ?likely due to not being able to access specific object(el)
  // ?error: 'react state is not iteratable' after 2nd toggle

  useEffect(() => {
    console.log(filtered)
  }, [filtered])

  function handleChange(event) {
    setInput(event.target.value)
  }

  // display nothing by default
  // display image-list when user press search button
  function handleSubmit(event) {
    event.preventDefault()
    // interpolate input state and .env variable to API
    fetch(`https://api.unsplash.com/search/photos?query=${input}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
      .then(res => res.json())
      .then(data => setAllImages(data.results))
  }

  return (
    <main>
      <div className='main--top'>
        <h4 className='text-center text-light pt-4'>Find Images</h4>
        <div className='main--form pt-1 pb-4'>
          <form onSubmit={handleSubmit}>
            <input
              className='form--input'
              autoComplete='off'
              type='text'
              placeholder='Search'
              onChange={handleChange}
              name='input'
              value={input}
            />
            <button className='form--button'>
              🍳
            </button>
          </form>
        </div>
      </div>

      <div className='main--image-list mt-5 mx-2 pb-5'>
        {allImages.map(el => (
          <Image
            key={el.id}
            {...el}
            el={el}
            like={el.liked_by_user}
            setFiltered={setFiltered}
          />
        ))}
      </div>
    </main>
  )
}

export default Main
