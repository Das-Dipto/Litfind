import React, { Children, StrictMode, Suspense } from 'react'
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
import LandingPage from './Pages/Public/LandingPage/page.jsx'
import ErrorPage from './Pages/Public/ErrorPage/Page.jsx';

const Loading = React.lazy(()=> import("./Pages/Public/Loading/page.jsx"));
// const LandingPage = React.lazy(()=> import("./Pages/Public/LandingPage/page.jsx"))
// const LandingPage = import("./Pages/Public/LandingPage/page.jsx")

const BookList = React.lazy(()=> import("./Pages/Private/Booklist/Page.jsx"));
const WishList = React.lazy(()=> import("./Pages/Private/Wishlist/Page.jsx"));

const SingleBookInformation = React.lazy(()=> import("./Pages/Private/BookInformation/Page.jsx"));

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path:"/home",
    element:<LandingPage/>
  },
  {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/litfind-booklist",  // The leading "/" is not needed here when using children
          element: <BookList />,
        },
        {
          path: "/litfind-wishlist",
          element: <WishList />,
        },
        {
          path:"/book-information/:id",
          element:<SingleBookInformation/>
        }
      ],
   // Uncomment if you want to add an error page
  },
  {
    path: "*", // Catch-all route for handling unknown routes
    element: <ErrorPage />,
  },
    // errorElement: <ErrorPage />,
])



createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <HelmetProvider>
      <RouterProvider router={MainRouter} />
    </HelmetProvider>
  </ThemeProvider>
 
)
