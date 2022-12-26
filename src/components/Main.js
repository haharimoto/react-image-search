import React from 'react'
import Header from './Header'
import Image from './Image'
import { useState, useEffect } from 'react'


function Main() {
  const [input, setInput] = useState('')
  const [allImages, setAllImages] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // get
  useEffect(() => {
    if (localStorage.getItem('input')) {
      setInput(JSON.parse(localStorage.getItem('input')))
    }

    if (localStorage.getItem('allImages')) {
      setAllImages(JSON.parse(localStorage.getItem('allImages')))
      setTotalResults(JSON.parse(localStorage.getItem('totalResults')))
      setIsVisible(JSON.parse(localStorage.getItem('isVisible')))
    }
  }, [])

  // set
  //* dryer?
  useEffect(() => {
    localStorage.setItem('input', JSON.stringify(input))
  }, [input])

  useEffect(() => {
    localStorage.setItem('allImages', JSON.stringify(allImages))
  }, [allImages])

  useEffect(() => {
    localStorage.setItem('totalResults', JSON.stringify(totalResults))
  }, [totalResults])

  useEffect(() => {
    localStorage.setItem('isVisible', JSON.stringify(isVisible))
  }, [isVisible])


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
      const res = await fetch(`https://api.unsplash.com/search/photos?&per_page=50&query=${input}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
      const data = await res.json();
      setAllImages(data.results)
      setTotalResults(data.total)
      setIsVisible(true)
    } catch(error) {
      alert("Sum ting wong");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchImages()
  }

  // total results
  let results
  if (totalResults >= 10000) {
    results = totalResults + '+'
  } else if (totalResults > 0) {
    results = totalResults
  } else {
    results = 'Nothing Found'
  }

  return (
    <main>
      <Header
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {/* {isVisibleRef.current &&
      <div className="main--random-image-list">
        <b>random images</b>
      </div>} */}

      {/* <InfiniteScroll
        dataLength={allImages.length} //This is important field to render the next data
        next={fetchImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      > */}

      {isVisible && <p className='main--results'>Total Results: {results}</p>}
      <div className='main--image-list mt-5 pb-5'>
        {allImages.map(el => (
          <Image
            key={el.id}
            // do need spread operator below for img's src to work in Image.js
            {...el}
            el={el}
          />
        ))}
      </div>
      {/* </InfiniteScroll> */}
    </main>
  )
}

export default Main
