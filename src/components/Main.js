import React from 'react'
import Header from './Header'
import Image from './Image'
import { useState, useEffect} from 'react'
// import InfiniteScroll from 'react-infinite-scroll-component'


function Main() {
  const [input, setInput] = useState('')
  const [allImages, setAllImages] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [page, setPage] = useState(1)
  console.log(page);

  // get
  useEffect(() => {
    if (localStorage.getItem('input')) {
      setInput(JSON.parse(localStorage.getItem('input')))
    }

    if (localStorage.getItem('allImages')) {
      setAllImages(JSON.parse(localStorage.getItem('allImages')))
      setTotalResults(JSON.parse(localStorage.getItem('totalResults')))
      setIsVisible(JSON.parse(localStorage.getItem('isVisible')))
      setPage(JSON.parse(localStorage.getItem('page')))
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

  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(page))
  }, [page])

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
      const res = await fetch(`https://api.unsplash.com/search/photos?&page=${page}&per_page=30&query=${input}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
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
    results = 'Total Results:' + totalResults + '+'
  } else if (totalResults > 0) {
    results = 'Total Results:' + totalResults
  } else {
    results = 'Nothing Found'
  }

  // pagination
  function handlePrev() {
    setPage(prevState => prevState - 1)
    fetchImages()
  }
  function handleNext() {
    setPage(prevState => prevState + 1)
    fetchImages()
  }

  return (
    <main>
      <Header
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {isVisible && <p className='main--results'>{results}</p>}
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
      <div className='pagination'>
        <button disabled={page === 1} onClick={handlePrev}>
          Prev
        </button>
        <p>{page}</p>
        <button onClick={handleNext}>
          Next
        </button>
      </div>
    </main>
  )
}

export default Main




      // {/* {isVisibleRef.current &&
      // <div className="main--random-image-list">
      //   <b>random images</b>
      // </div>} */}

      // {/* <InfiniteScroll
      //   dataLength={allImages.length} //This is important field to render the next data
      //   next={fetchImages}
      //   hasMore={true}
      //   loader={<h4>Loading...</h4>}
      // > */}
      // {/* </InfiniteScroll> */}
