import React from 'react'
import Navbar from './Navbar'
import create from 'zustand'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
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
  // local state
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  // global state and search params
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const page = searchParams.get('page') || 1
  const input = useMain(state => state.input)
  const setInput = useMain(state => state.setInput)
  const allImages = useMain(state => state.allImages)
  const setAllImages = useMain(state => state.setAllImages)
  // const totalResults = useMain(state => state.totalResults)
  const setTotalResults = useMain(state => state.setTotalResults)

  function handleChange(event) {
    setInput(event.target.value)
    // setSearchParams({query: event.target.value})
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

  let navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    navigate(`/search?query=${input}&page=1`)
    fetchImages()
  }

  // this useEffect causes Search.js to render 3 times
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/search' && allImages.length === 0) {
      if (query) {
        setInput(query)
      }
      navigate(`/search?query=${input}&page=${page}`)
      fetchImages()
    }

    // need this to deal with page not refreshing when submitting
    if (location.pathname === '/search' && allImages.length !== 0) {
      fetchImages()
    }
    //* eslint
    // eslint-disable-next-line
  }, [searchParams])

  // useEffect(() => {
  //   if (location.pathname === '/search?query=dark&page=2') {
  //     console.log('dark, page2');
  //   }
  // }, [page])

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
