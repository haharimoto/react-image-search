import React from 'react'
import Navbar from './Navbar'
import create from 'zustand'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

// Zustand
let store = (set) => ({
  // input: '',
  // setInput: (value) => set({ input: value }),
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
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const page = searchParams.get('page') || 1
  const allImages = useMain(state => state.allImages)
  const setAllImages = useMain(state => state.setAllImages)
  // const totalResults = useMain(state => state.totalResults)
  const setTotalResults = useMain(state => state.setTotalResults)

  function handleChange(event) {
    // setInput(event.target.value)
    setSearchParams({query: event.target.value})
  }

  async function fetchImages() {
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?&page=${page}&per_page=30&query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
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
    fetchImages()
    setSearchParams({page: page})
    navigate(`/search?query=${query}&page=${page}`)
  }

  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/search' && allImages.length === 0) {
      fetchImages()
      navigate(`/search?query=${query}&page=${page}`)
    }
  }, [query])

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
            value={query}
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
