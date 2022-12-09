import React from 'react'
import Image from './Image'
import { useState, useEffect } from 'react'

function Main() {
  const [input, setInput] = useState('')
  const [allImages, setAllImages] = useState([])
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || [])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
    console.log(favorites)
  }, [favorites])

  function handleChange(event) {
    setInput(event.target.value)
  }

  // display nothing by default
  // display image-list when user press search button
  // function handleSubmit(event) {
  //   event.preventDefault()
  //   // interpolate input state and .env variable to API
  //   fetch(`https://api.unsplash.com/search/photos?query=${input}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
  //     .then(res => res.json())
  //     .then(data => setAllImages(data.results))
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?&per_page=50&query=${input}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
      const data = await res.json();
      setAllImages(data.results)
    } catch(error) {
      alert("Sum ting wong");
    }
  }

  // use parameter 'id' to read specific one
  function isLiked(id) {
    return favorites.find(el => el.id === id) ? true : false
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

      <div className='main--image-list mt-5 pb-5'>
        {allImages.map(el => (
          <Image
            key={el.id}
            // do need spread operator below for img's src to work in Image.js
            {...el}
            el={el}
            isLiked={isLiked(el.id)}
            favorites={favorites}
            setFavorites={setFavorites}

          />
        ))}
      </div>
    </main>
  )
}

export default Main
