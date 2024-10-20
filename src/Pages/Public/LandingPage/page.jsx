import React, { Suspense } from 'react'
import Navbar from '../../../Components/LandingPage/Navbar'
import BooklistContainer from '../../../Components/BookListContainer/BooklistContainer'
import Footer from '../../../Components/Footer/Footer'

const page = () => {
  return (
    <div className='min-h-[100vh] relative'>
      <Navbar />
      <BooklistContainer />
      <Footer/>
    </div>
  )
}

export default page