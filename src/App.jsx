import React, { Suspense } from 'react'
import Navbar from './Components/LandingPage/Navbar'
import Loading from "./Pages/Public/Loading/page"
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <>
      <Navbar/>
      <Suspense fallback={<Loading/>}>
          <Outlet/>
      </Suspense>
      <Footer/>
    </>
  )
}

export default App