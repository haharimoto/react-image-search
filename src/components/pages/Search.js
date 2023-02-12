import React from 'react'
import Header from '../Header'
import Image from '../Image'
// import { useSearchParams } from "react-router-dom";
import { useHeader } from '../Header';


function Search() {
  // const [searchParams, setSearchParams] = useSearchParams()
  // const page = searchParams.get('page') || 1
  const allImages = useHeader(state => state.allImages)
  // const totalResults = useHeader(state => state.totalResults)
  // const setTotalResults = useHeader(state => state.setTotalResults)
  console.log(allImages)
  console.log('Search.js rendered')


  return (
    <div>
      <Header />
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
      {/*
        {allImages.length !== 0 && <div className='main--pagination'>
          <button disabled={page === 1} onClick={handlePrev}>
            Prev
          </button>
          <h5 className='main--pagination--h5'>{page}</h5>
          <button disabled={totalResults < 31} onClick={handleNext}>
            Next
          </button>
        </div>}
      */}
    </div>
  )
}

export default Search
