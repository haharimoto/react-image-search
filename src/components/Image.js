import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useFavorite } from './pages/Favorites'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function Image(props) {
  const [isLoading, setIsLoading] = useState(true)
  const favorites = useFavorite(state => state.favorites)
  const filter = useFavorite(state => state.filter)
  const add = useFavorite(state => state.add)

  // if image(el) exist in favorites array, remove el from favorites array
  // if not, append to favorites array
  const isLiked = favorites.find(el => el.id === props.el.id) ? true : false
  function handleLike() {
    if(isLiked) {
      filter(el => el.id !== props.el.id)
    } else {
      add(props.el)
    }
  }

  // Skeleton Loader
  function randomHeight(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const height = randomHeight(120, 300)

  useEffect(() => {
    const image = new window.Image()
    image.src = props.urls.small
    image.onload = () => setIsLoading(false)
    image.onerror = () => setIsLoading(false)
    return () => {
      image.onload = null
      image.onerror = null
    }
  }, [props.urls.small])

  return (
    <div>
      <div className='image'>
        {isLoading?
          <Skeleton height={height} /> :
          <img src={props.urls.small} alt="" loading='lazy' />
        }
        <button className={isLiked ? 'image--liked' : 'image--like'} onClick={handleLike}>
          ❤
        </button>
      </div>
    </div>
  )
}

export default Image





//* without Zustand, local state
// const isLiked = favorites.find(el => el.id === props.el.id) ? true : false
// function handleLike() {
//   if(isLiked) {
//     setFavorites(favorites.filter(el => el.id !== props.el.id))
//   } else {
//     setFavorites([
//       ...favorites,
//       props.el
//     ])
//   }
// }

//* harder way to setup skeleton
// implement skeleton loader for each image
// height = height of div.image
// no need to worry about width bc of masonry grid

// const [divHeight, setDivHeight] = useState(0)
// const ref = useRef(null)

// useEffect(() => {
//   setDivHeight(ref.current.offsetHeight)
// }, [])
