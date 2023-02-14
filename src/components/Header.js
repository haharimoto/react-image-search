import React from 'react'
import Navbar from './Navbar'
import create from 'zustand'
import ErrorMsg, { useError } from './ErrorMsg'
import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

// Zustand
let store = (set) => ({
  input: '',
  setInput: (value) => set({ input: value }),
  allImages: [],
  setAllImages: (images) => set({ allImages: images}),
  totalResults: null,
  setTotalResults: (num) => set({ totalResults: num}),
})
export const useHeader = create(store)


function Header() {
  // global state and search params
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const page = Number(searchParams.get('page') || 1)

  const input = useHeader(state => state.input)
  const setInput = useHeader(state => state.setInput)
  const allImages = useHeader(state => state.allImages)
  const setAllImages = useHeader(state => state.setAllImages)
  const setTotalResults = useHeader(state => state.setTotalResults)

  const error = useError(state => state.error)
  const setError = useError(state => state.setError)
  const showError = useError(state => state.showError)
  const setShowError = useError(state => state.setShowError)
  // const fadeOut = useError(state => state.fadeOut)
  const setFadeOut = useError(state => state.setFadeOut)


  function handleChange(event) {
    setInput(event.target.value)
    // setSearchParams({query: event.target.value})
  }

  // async function fetchImages() {
  //   try {
  //     const res = await fetch(`https://api.unsplash.com/search/photos?&page=${page}&per_page=30&query=${input}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
  //     const data = await res.json()
  //     if (data.total !== 0) {
  //       setAllImages(data.results)
  //       setTotalResults(data.total)
  //     } else {
  //       setAllImages([])
  //       setTotalResults(0)
  //     }
  //   } catch(error) {
  //     setError(error)
  //   }
  // }

  const fetchImages = useMemo(
    () => async function fetchImages() {
      try {
        const res = await fetch(`https://api.unsplash.com/search/photos?&page=${page}&per_page=30&query=${input}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
        const data = await res.json()
        if (data.total !== 0) {
          setAllImages(data.results)
          setTotalResults(data.total)
        } else {
          setAllImages([])
          setTotalResults(0)
        }
      } catch(error) {
        setError(error)
      }
    },
    [input, page, setAllImages, setTotalResults, setError]
  )

  let navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    navigate(`/search?query=${input}&page=1`)
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
    // eslint-disable-next-line
  }, [searchParams, fetchImages])

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
  }, [error, setFadeOut, setShowError])


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

      {showError && <ErrorMsg />}
    </div>
  )
}

export default Header
