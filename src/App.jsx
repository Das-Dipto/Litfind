import React, { Suspense } from 'react'
import Navbar from './Components/LandingPage/Navbar'
import Loading from "./Pages/Public/Loading/page"
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar/>
      <Suspense fallback={<Loading/>}>
          <Outlet/>
      </Suspense>
    </>
  )
}

export default App