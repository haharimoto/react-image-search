import React from 'react'
import Header from './Header'
// import InfiniteScroll from 'react-infinite-scroll-component'


function Main() {
  return (
    <main>
      <Header />
      <div className="main--empty"></div>
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
