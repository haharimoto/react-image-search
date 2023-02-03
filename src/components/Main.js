import React from 'react'
import Header from './Header'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import create from 'zustand'
// import { persist } from 'zustand/middleware'
import { useNavigate } from 'react-router-dom';
// import InfiniteScroll from 'react-infinite-scroll-component'


// Zustand
let store = (set) => ({
  input: '',
  setInput: (value) => set({ input: value }),
  allImages: [],
  setAllImages: (images) => set({ allImages: images}),
  totalResults: null,
  setTotalResults: (num) => set({ totalResults: num}),
})
// store = persist(store, { name: 'input' })
export const useMain = create(store)


function Main() {
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [page, setPage] = useState(1)

  let navigate = useNavigate()
  const input = useMain(state => state.input)
  const setInput = useMain(state => state.setInput)
  // const allImages = useMain(state => state.allImages)
  const setAllImages = useMain(state => state.setAllImages)
  // const totalResults = useMain(state => state.totalResults)
  const setTotalResults = useMain(state => state.setTotalResults)

  function handleChange(event) {
    setInput(event.target.value)
  }

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
    navigate(`/search?query=${input}`)
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


  //* pages
  // function handlePrev() {
  //   setPage(prevState => prevState - 1)
  //   fetchImages()
  // }
  // function handleNext() {
  //   setPage(prevState => prevState + 1)
  //   fetchImages()
  // }


  return (
    <main>
      <Header
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

      {/* {allImages.length !== 0 && <div className='main--pagination'>
        <button disabled={page === 1} onClick={handlePrev}>
          Prev
        </button>
        <h5 className='main--pagination--h5'>{page}</h5>
        <button disabled={totalResults < 31} onClick={handleNext}>
          Next
        </button>
      </div>} */}
    </main>
  )
}

export default Main


      // {/* <InfiniteScroll
      //   dataLength={allImages.length} //This is important field to render the next data
      //   next={fetchImages}
      //   hasMore={true}
      //   loader={<h4>Loading...</h4>}
      // > */}
      // {/* </InfiniteScroll> */}
