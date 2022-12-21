import React from 'react'
import Navbar from '../Navbar'


function Error() {
  return (
    <div>
      <Navbar />
      <div className='error-message'>
        <h2>
          <div className='error-message--404'><b>404</b></div>
          Page not found
        </h2>
      </div>
    </div>
  )
}

export default Error
