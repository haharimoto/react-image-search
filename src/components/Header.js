import React from 'react'
import Navbar from './Navbar'
import create from 'zustand'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useSearchParams, createSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

// Zustand
let store = (set) => ({
  input: '',
  setInput: (value) => set({ input: value }),
  allImages: [],
  setAllImages: (images) => set({ allImages: images}),
  totalResults: null,
  setTotalResults: (num) => set({ totalResults: num}),
})
export const useMain = create(store)

function Header() {
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [page, setPage] = useState(1)
  let navigate = useNavigate()
  // const [searchParams, setSearchParams] = useSearchParams()
  // const query = searchParams.get('query') || ''
  const input = useMain(state => state.input)
  const setInput = useMain(state => state.setInput)
  const setAllImages = useMain(state => state.setAllImages)
  // const totalResults = useMain(state => state.totalResults)
  const setTotalResults = useMain(state => state.setTotalResults)

  function handleChange(event) {
    setInput(event.target.value)
    // setSearchParams(createSearchParams({query: event.target.value}))
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


  return (
    <div className='header'>
      <Navbar />
      <h2 className='header--heading text-center text-light'>Find Images</h2>
      <div className='header--form'>
        <form onSubmit={handleSubmit}>
          <input
            className='header--form--input'
            autoComplete='off'
            type='text'
            placeholder='Search'
            onChange={handleChange}
            name='input'
            value={input}
          />
        </form>
      </div>

      {showError && <div className={`network-error ${fadeOut ? 'fade-out' : ''}`}>
        <i><FontAwesomeIcon icon={faTriangleExclamation} /></i>
        <div className='network-error--message'>
          <h5>Network Error</h5>
          <p>Please check your Internet connection and try again</p>
        </div>
      </div>}
    </div>
  )
}

export default Header

// useEffect(() => {
//   const query = new URLSearchParams(window.location.search).get('query')
//   console.log(query);
//   if (query) {
//     setInput(query)
//     fetchImages()
//     navigate(`/search?query=${query}`)
//   }
// }, [window.location.search])
