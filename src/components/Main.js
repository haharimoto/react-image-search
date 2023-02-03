import React from 'react'
import Header from './Header'
// import InfiniteScroll from 'react-infinite-scroll-component'


function Main() {
  // total results
  // let results
  // if (totalResults >= 10000) {
  //   results = 'Total Results: ' + totalResults + '+'
  // } else if (totalResults > 0) {
  //   results = 'Total Results: ' + totalResults
  // } else if (totalResults === 0) {
  //   results = 'Nothing Found'
  // }

  //* pages
  // function handlePrev() {
  //   setPage(prevState => prevState - 1)
  //   fetchImages()
  // }
  // function handleNext() {
  //   setPage(prevState => prevState + 1)
  //   fetchImages()
  // }
  return (
    <main>
      <Header />
      {/* {allImages.length !== 0 && <div className='main--pagination'>
        <button disabled={page === 1} onClick={handlePrev}>
          Prev
        </button>
        <h5 className='main--pagination--h5'>{page}</h5>
        <button disabled={totalResults < 31} onClick={handleNext}>
          Next
        </button>
      </div>} */}
    </main>
  )
}

export default Main


      // {/* <InfiniteScroll
      //   dataLength={allImages.length} //This is important field to render the next data
      //   next={fetchImages}
      //   hasMore={true}
      //   loader={<h4>Loading...</h4>}
      // > */}
      // {/* </InfiniteScroll> */}
