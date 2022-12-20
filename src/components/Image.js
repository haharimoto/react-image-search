import React from 'react'
import { useFavorite } from './pages/Favorites'


function Image(props) {
  const favorites = useFavorite(state => state.favorites)
  // const setFavorites = useFavorite(state => state.setFavorites)
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

  return (
    <div className='image'>
      <img src={props.urls.small} alt="" loading='lazy' />
      <button className={isLiked ? 'image--liked' : 'image--like'} onClick={handleLike}>
        ❤
      </button>
    </div>
  )
}

export default Image


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
