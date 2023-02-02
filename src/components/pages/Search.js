import React from 'react'
import Navbar from '../Navbar'
// import Header from '../Header'
import Image from '../Image'
// import { useParams } from 'react-router-dom';
// import { useSearchParams } from "react-router-dom";
import { useMain } from '../Main.js'


function Query() {
  // const [searchParams, setSearchParams] = useSearchParams({})
  // console.log(searchParams)
  const allImages = useMain(state => state.allImages)


  return (
    <div>
      <Navbar />
      {/* <Header /> */}
      <div className='image-list mt-5 pb-5'>
        {allImages.map(el => (
          <Image
            key={el.id}
            // do need spread operator below for img's src to work in Image.js
            {...el}
            el={el}
          />
        ))}
      </div>
      {/* <button onClick={() => {setSearchParams({ hello: "world" })}}>Click This</button> */}
    </div>
  )
}

export default Query