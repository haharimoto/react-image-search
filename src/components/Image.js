import React from 'react'
// import { useFavorite } from './pages/Favorites'


function Image(props) {
  // const favorites = useFavorite(state => state.favorites)
  // const setFavorites = useFavorite(state => state.setFavorites)

  // if image(el) exist in favorites array, remove el from favorites array
  // if not, append to favorites array
  const isLiked = props.favorites.find(el => el.id === props.el.id) ? true : false
  function handleLike() {
    if(isLiked) {
      props.setFavorites(props.favorites.filter(el => el.id !== props.el.id))
    } else {
      props.setFavorites([
        ...props.favorites,
        props.el
      ])
    }
  }
  // console.log(favorites);

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
