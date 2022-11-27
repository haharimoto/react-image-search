import React from 'react'
import { useState } from 'react'

function Image(props) {
  const [status, setStatus] = useState(props.like)

  // if an image is liked, it will be appended to filtered array
  // then filtered array will be mapped to display liked images
  function appendObject() {
    console.log('appended')
    props.setFiltered(prevState => {
      if (status === true) {
        return [
          ...prevState,
          {id: "id"}
          // {id: props.key, img: props.urls.regular}
        ]
      }
    })
  }
  function toggleLike() {
    setStatus(prevState => !prevState)
    appendObject()
  }

  let check = Boolean(status)
  console.log(`check is ${check}`)
  // props.like is false by default?
  console.log(props.el)

  return (
    <div className='image'>
      <img src={props.urls.regular} alt="" loading='lazy' />
      <button className={status ? 'image--liked' : 'image--like'} onClick={toggleLike}>
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

// props.setFiltered(props.allImages.map(el => {
//   if (el.id === props.el.id) {
//     return {
//       ...el,
//       like: !el.like
//     }
//   }
//   return el
