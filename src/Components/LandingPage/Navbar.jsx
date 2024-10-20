import React, { useState } from 'react'
import profileIcon from '../../assets/Navbar/profile_photo_parent.png'
import {useLocation, useNavigate} from 'react-router-dom'
import './customDesign.css'
import SmallScreenNavbar from './SmallScreenNavbar'

const Navbar = () => {

  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const location = useLocation();

  return (
    <>
        <nav className='flex items-center justify-between py-5 px-[25px] bg-[#3a3636] w-full'>
            <h5 onClick={()=> navigate('/home')} className='text-[#90f57c] font-bold text-[28px] cursor-pointer'>
                LitFind
            </h5>

            <div className='navbar-menu flex justify-end items-center gap-10 w-auto md:w-[400px]'>
            <p
        onClick={() => navigate('/litfind-booklist')}
        className={`font-semibold text-[18px] cursor-pointer ease-in-out duration-200 ${
          location.pathname === '/litfind-booklist' ? 'text-[#ffa500]' : 'text-[#90f57c]'
        } hover:text-[#ffa500]`}
      >
        Booklist
      </p>
      <p
        onClick={() => navigate('/litfind-wishlist')}
        className={`font-semibold text-[18px] cursor-pointer ease-in-out duration-200 ${
          location.pathname === '/litfind-wishlist' ? 'text-[#ffa500]' : 'text-[#90f57c]'
        } hover:text-[#ffa500]`}
      >
        Wishlist
      </p>
                <figure className='w-[35px] border border-[#90f57c] rounded-[50%]'>
                    <img src={profileIcon} alt="" />
                </figure>
                <span className='hamburger-icon' onClick={()=> setIsDrawerOpen(prev => !prev)}>
                    <svg stroke="currentColor" fill="#fff" strokeWidth="0" viewBox="0 0 512 512"  width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path></svg>
                </span>
            </div>
        </nav>

        {isDrawerOpen && <SmallScreenNavbar/>}
    
    </>
  )
}

export default Navbar