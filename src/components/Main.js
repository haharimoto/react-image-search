import React from 'react'
import Header from './Header'
import Image from './Image'
import { useState, useEffect } from 'react'
// import useFavorite from './pages/Favorites'
// import InfiniteScroll from 'react-infinite-scroll-component';


function Main() {
  const [input, setInput] = useState('')
  const [allImages, setAllImages] = useState([])
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || [])

  // const favorites = useFavorite(state => state.favorites)
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
  async function fetchImages() {
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?&per_page=10  &query=${input}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
      const data = await res.json();
      setAllImages(data.results)
    } catch(error) {
      alert("Sum ting wong");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchImages()
  }

  return (
    <main>
      <Header
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {/* <InfiniteScroll
        dataLength={allImages.length} //This is important field to render the next data
        next={fetchImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      > */}
        <div className='main--image-list mt-5 pb-5'>
          {allImages.map(el => (
            <Image
              key={el.id}
              // do need spread operator below for img's src to work in Image.js
              {...el}
              el={el}

              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))}
        </div>
      {/* </InfiniteScroll> */}
    </main>
  )
}

export default Main


// localStorage.setItem("favorites", JSON.stringify(favorites, function(key, value) {
//   if (key === '_self' || key === '_source') {
//     return null
//   }
//   return value
// }))
