import React from 'react'
import Header from './Header'
// import InfiniteScroll from 'react-infinite-scroll-component'


function Main() {
  return (
    <main>
      <Header />
      <div className="main--guide">
        <div className="main--guide--details">
          <h1>How to use our Website</h1>
          <ol>
            <li>
              <span className="main--guide--details--step-number">1</span>
              <div className='main--guide--details--description'>Search Any Image</div>
            </li>
            <li>
              <span className="main--guide--details--step-number">2</span>
              <div className='main--guide--details--description'>Like Images</div>
            </li>
            <li>
              <span className="main--guide--details--step-number">3</span>
              <div className='main--guide--details--description'>View Liked Images on Favorites Page</div>
            </li>
          </ol>
        </div>
      </div>
    </main>
  )
}

export default Main
