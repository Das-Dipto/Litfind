import React, { Suspense } from 'react'
import Navbar from '../../../Components/LandingPage/Navbar'
import BooklistContainer from '../../../Components/BookListContainer/BooklistContainer'
import Footer from '../../../Components/Footer/Footer'

const page = () => {
  return (
    <div className='min-h-[100vh] relative'>
    <Suspense fallback={<div className='font-semibold text-[15px] p-4'>Loading...</div>}>
      <Navbar />
      <BooklistContainer />
      <Footer/>
    </Suspense>
    </div>
  )
}

export default page