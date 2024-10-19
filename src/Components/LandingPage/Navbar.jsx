import React, { useState } from 'react'
import profileIcon from '../../assets/Navbar/profile_photo_parent.png'
import {useNavigate} from 'react-router-dom'
import './customDesign.css'
import SmallScreenNavbar from './SmallScreenNavbar'

const Navbar = () => {

  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
        <nav className='flex items-center justify-between py-5 px-[25px] bg-[#3a3636] w-full'>
            <h5 onClick={()=> navigate('/')} className='text-[#90f57c] font-bold text-[28px] cursor-pointer'>
                LitFind
            </h5>

            <div className='navbar-menu flex justify-end items-center gap-10 w-auto md:w-[400px] border border-red-500'>
                <p onClick={()=> navigate('/litfind-booklist')} className='text-[#90f57c] font-semibold text-[18px] hover:text-[#ffa500] ease-in-out duration-200 cursor-pointer'>Booklist</p>
                <p onClick={()=> navigate('/litfind-wishlist')} className='text-[#90f57c] font-semibold text-[18px] hover:text-[#ffa500] ease-in-out duration-200 cursor-pointer'>Wishlist</p>
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