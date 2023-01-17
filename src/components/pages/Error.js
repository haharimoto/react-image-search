import React from 'react'
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons'


function Error() {
  return (
    <div className='error'>
      <Navbar />
      <div className='error-message'>
        <h2>
          <i><FontAwesomeIcon icon={faFaceFrown} /></i>
          <br />
          <div className='error-message--404'><b>404</b></div>
          Page not found
        </h2>
      </div>
    </div>
  )
}

export default Error
