import React from 'react'
import Navbar from './Navbar'
import create from 'zustand'
import ErrorMsg, { useError } from './ErrorMsg'
import { useDarkMode } from './Navbar'
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

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
  // global state and search params, and some others
  let navigate = useNavigate()
  const inputRef = useRef(null)
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const page = Number(searchParams.get('page') || 1)

  const input = useHeader(state => state.input)
  const setInput = useHeader(state => state.setInput)
  const setAllImages = useHeader(state => state.setAllImages)
  const setTotalResults = useHeader(state => state.setTotalResults)

  const error = useError(state => state.error)
  const setError = useError(state => state.setError)
  const showError = useError(state => state.showError)
  const setShowError = useError(state => state.setShowError)
  const setFadeOut = useError(state => state.setFadeOut)

  const darkMode = useDarkMode(state => state.darkMode)

  function handleChange(event) {
    setInput(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    navigate(`/search?query=${input}&page=1`)
  }

  let realShit
  if (input === '') {
    realShit = query
  } else {
    realShit = input
  }

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(`https://api.unsplash.com/search/photos?&page=${page}&per_page=30&query=${realShit}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
        const data = await res.json()
        if (data.total === 0) {
          setTotalResults(0)
        } else {
          setAllImages(data.results)
          setTotalResults(data.total)
        }
      } catch(error) {
        setError(error)
      }
    }
    fetchImages()
    // eslint-disable-next-line
  }, [searchParams])

  // input
  useEffect(() => {
    inputRef.current.focus()
  }, [])

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
            className={`header--form--input ${darkMode === 'dark' && 'dark'}`}
            autoComplete='off'
            type='text'
            placeholder='Search'
            onChange={handleChange}
            name='input'
            value={input}
            ref={inputRef}
          />
        </form>
      </div>

      {showError && <ErrorMsg />}
    </div>
  )
}

export default Header
