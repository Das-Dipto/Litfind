import React, { Suspense } from 'react'
import Navbar from './Components/LandingPage/Navbar'
import Loading from "./Pages/Public/Loading/page"
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div className='relative min-h-[300vh] md:min-h-[100vh]'>
      <Navbar/>
      <Suspense fallback={<Loading/>}>
          <Outlet/>
      </Suspense>
      <Footer/>
    </div>
  )
}

export default App