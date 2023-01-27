import React from 'react'
// import { useParams } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";


function Query() {
  const [searchParams, setSearchParams] = useSearchParams({})
  console.log(searchParams)

  return (
   <div>
    <p>QUERY</p>
    <button onClick={() => {setSearchParams({ hello: "world" })}}>Click This</button>
   </div>
  )
}

export default Query
