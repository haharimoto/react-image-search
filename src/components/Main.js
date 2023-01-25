import React from 'react'
import Header from './Header'
import Image from './Image'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
// import InfiniteScroll from 'react-infinite-scroll-component'


function Main() {
  const [input, setInput] = useState('')
  const [allImages, setAllImages] = useState([])
  const [totalResults, setTotalResults] = useState(null)
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [page, setPage] = useState(1)
  const paginationRef = useRef(false)

  // get
  useEffect(() => {
    if (localStorage.getItem('input')) {
      setInput(JSON.parse(localStorage.getItem('input')))
    }

    if (localStorage.getItem('allImages')) {
      setAllImages(JSON.parse(localStorage.getItem('allImages')))
      // setTotalResults(JSON.parse(localStorage.getItem('totalResults')))
      setPage(JSON.parse(localStorage.getItem('page')))
      paginationRef.current = true
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

  // useEffect(() => {
  //   localStorage.setItem('totalResults', JSON.stringify(totalResults))
  // }, [totalResults])


  function handleChange(event) {
    setInput(event.target.value)
  }

  // function handleSubmit(event) {
  //   event.preventDefault()
  //   fetch(`https://api.unsplash.com/search/photos?query=${input}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
  //     .then(res => res.json())
  //     .then(data => setAllImages(data.results))
  // }

  async function fetchImages() {
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?&page=${page}&per_page=30&query=${input}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
      const data = await res.json()
      if (data.total !== 0) {
        setAllImages(data.results)
        setTotalResults(data.total)
      }
    } catch(error) {
      setError(error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchImages()
    setPage(1)
    paginationRef.current = true
  }

  // error
  useEffect(() => {
    if (error) {
      setShowError(true)
      setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          setShowError(false)
        }, 1000)
      }, 5000)
    }
  }, [error])

  // total results
  // let results
  // if (totalResults >= 10000) {
  //   results = 'Total Results: ' + totalResults + '+'
  // } else if (totalResults > 0) {
  //   results = 'Total Results: ' + totalResults
  // } else if (totalResults === 0) {
  //   results = 'Nothing Found'
  // }

  // pagination
  useEffect(() => {
    if (paginationRef.current) {
      fetchImages()
    }
    localStorage.setItem('page', JSON.stringify(page))
  }, [page])

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

      {showError && <div className={`network-error ${fadeOut ? 'fade-out' : ''}`}>
        <i><FontAwesomeIcon icon={faTriangleExclamation} /></i>
        <div className='network-error--message'>
          <h5>Network Error</h5>
          <p>Please check your Internet connection and try again</p>
        </div>
      </div>}

      {/* <p className='main--results'>{totalResults}</p> */}
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

      {allImages.length !== 0 && <div className='main--pagination'>
        <button disabled={page === 1} onClick={handlePrev}>
          Prev
        </button>
        <h5 className='main--pagination--h5'>{page}</h5>
        <button disabled={totalResults < 31} onClick={handleNext}>
          Next
        </button>
      </div>}
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
