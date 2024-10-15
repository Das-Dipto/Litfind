import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from './Utils/ThemeContext/ThemeContext.jsx';
import './index.css'

const Loading = React.lazy(()=> import("./Pages/Public/Loading/page.jsx"));
const LandingPage = React.lazy(()=> import("./Pages/Public/LandingPage/page.jsx"))

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LandingPage />
      </Suspense>
    ),
    // errorElement: <ErrorPage />,
  },
])



createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <HelmetProvider>
      <RouterProvider router={MainRouter} />
    </HelmetProvider>
  </ThemeProvider>
 
)
