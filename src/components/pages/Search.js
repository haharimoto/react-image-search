import React from 'react'
import Header from '../Header'
import Image from '../Image'
import { useHeader } from '../Header';
import { useSearchParams } from 'react-router-dom';


function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const allImages = useHeader(state => state.allImages)
  const totalResults = useHeader(state => state.totalResults)
  // console.log(allImages)
  // console.log('Search.js rendered')

  // pages
  function handlePrev() {
    setSearchParams(params => {
      params.set("page", Math.max(1, page - 1))
      return params
    })
  }

  function handleNext() {
    setSearchParams(params => {
      params.set("page", page + 1)
      return params
    })
  }


  return (
    <div>
      <Header />
      {/* {totalResults === 0 && <p>Nothing Found</p>} */}

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

      {allImages.length !== 0 && <div className='pagination'>
        <button disabled={page === 1} onClick={handlePrev}>
          Prev
        </button>
        <h5 className='pagination--h5'>{page}</h5>
        <button disabled={totalResults < 31} onClick={handleNext}>
          Next
        </button>
      </div>}
    </div>
  )
}

export default Search
