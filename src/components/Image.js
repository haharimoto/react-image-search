import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useFavorite } from './pages/Favorites'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faSolid } from '@fortawesome/fontawesome-free-solid'
import { faHeart as faRegular } from '@fortawesome/fontawesome-free-regular'


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
  }, [props.urls.small, props.urls.regular])

  // img src
  const location = useLocation()
  let src
  if (location.pathname === '/') {
    src = props.urls.small
  } else {
    src = props.urls.regular
  }

  return (
    <div>
      <div className='image-container'>
        {isLoading
          ? <Skeleton height={height} />
          : <img src={src} alt="" loading='lazy'/>
        }

        {isLiked
          ? <button className='image-container--liked' onClick={handleLike}><FontAwesomeIcon icon={faSolid} /></button>
          : <button className='image-container--like' onClick={handleLike}><FontAwesomeIcon icon={faRegular} /></button>
        }
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
