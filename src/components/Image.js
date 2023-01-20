import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useFavorite } from './pages/Favorites'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faSolid } from '@fortawesome/fontawesome-free-solid'
import { faHeart as faRegular } from '@fortawesome/fontawesome-free-regular'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


function Image(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const favorites = useFavorite(state => state.favorites)
  const filter = useFavorite(state => state.filter)
  const add = useFavorite(state => state.add)
  // const imageContainerRef = useRef(null)

  // if image(el) exist in favorites array, remove el from favorites array
  // if not, append to favorites array
  const isLiked = favorites.find(el => el.id === props.el.id) ? true : false
  function handleLike() {
    if(isLiked) {
      filter(el => el.id !== props.el.id)
      //* why does this filter elements?
      // imageContainerRef.current.classList.add('delete-animation')
    } else {
      add(props.el)
    }
  }

  // // delete animation
  // useEffect(() => {
  //   function handleAnimationEnd () {
  //     imageContainerRef.current.classList.remove('delete-animation')
  //     imageContainerRef.current.removeEventListener('animationend', handleAnimationEnd)
  //   }
  //   imageContainerRef.current.addEventListener('animationend', handleAnimationEnd)
  // }, [])

  // Skeleton Loader
  const converter = (240 / props.width)
  const height = props.height * converter

  // function randomHeight(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1) + min)
  // }
  // const height = randomHeight(120, 300)

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

  // img src based on routes
  const location = useLocation()
  let src
  if (location.pathname === '/') {
    src = props.urls.small
  } else {
    src = props.urls.regular
  }

  // modal
  function handleModal() {
    setModal(prevState => !prevState)
  }

  // like or delete button
  let icon
  if (location.pathname === '/') {
    icon = faSolid
  } else {
    icon = faXmark
  }

  return (
    <div>
      {modal &&
        <div className="modal" onClick={handleModal}>
          <div className="modal-overlay"></div>
          <div className="modal-content">
            <img src={props.urls.full} alt="" />
          </div>
        </div>
      }

      <div className='image-container' style={{height: height}}>
        {isLoading
          ? <Skeleton height={height} />
          : <img src={src} onClick={handleModal} alt="" loading='lazy' style={{height: height}}/>
        }

        {isLiked
          ? <button className='image-container--liked' onClick={handleLike}><FontAwesomeIcon icon={icon} /></button>
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


// ref={imageContainerRef}
