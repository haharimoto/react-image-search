import React from 'react'

function Image(props) {
  function handleLike() {
    // if props.isLiked is true, remove el from favorites array
    // if false, append el to favorites array
    // ?props.isLiked is false by default
    props.isLiked ?
    props.setFavorites(props.favorites.filter(el => el.id !== props.el.id)) :
    props.setFavorites(prevState => {
      return [
        ...prevState,
        { id: props.id, isLiked: true, img: props.urls.regular }
      ]
    })
  }

  return (
    <div className='image'>
      <img src={props.urls.regular} alt="" loading='lazy' />
      <button className={props.isLiked ? 'image--liked' : 'image--like'} onClick={handleLike}>
        ❤
      </button>
    </div>
  )
}

export default Image


// below does not work

// props.status = props.like
// props.setStatus(prevState => !prevState)
// cannot do this bc 'read only property error'

// function appendObject() {
//   console.log('appended')
//   props.setFiltered(prevState => {
//     if (status === true) {
//       return [
//         ...prevState,

//        props.image,
//         // {id: props.key, img: props.urls.regular}
//       ]
//     }
//   })
// }
