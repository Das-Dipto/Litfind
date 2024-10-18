import React from 'react'
import { useParams } from 'react-router-dom'

const Page = () => {

  const { id } = useParams();

  return (
    <div className='font-semibold'>Bookid- {id}</div>
  )
}

export default Page