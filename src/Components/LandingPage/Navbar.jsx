import React from 'react'
import profileIcon from '../../assets/Navbar/profile_photo_parent.png'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav className='flex items-center justify-between py-5 px-[25px] bg-[#3a3636] w-full'>
        <h5 onClick={()=> navigate('/')} className='text-[#90f57c] font-bold text-[28px] cursor-pointer'>
            LitFind
        </h5>

        <div className='flex items-center justify-between w-[260px]'>
            <p onClick={()=> navigate('/litfind-booklist')} className='text-[#90f57c] font-semibold text-[18px] hover:text-[#ffa500] ease-in-out duration-200 cursor-pointer'>Booklist</p>
            <p onClick={()=> navigate('/litfind-wishlist')} className='text-[#90f57c] font-semibold text-[18px] hover:text-[#ffa500] ease-in-out duration-200 cursor-pointer'>Wishlist</p>
            <figure className='w-[35px] border border-[#90f57c] rounded-[50%]'>
                <img src={profileIcon} alt="" />
            </figure>
        </div>
    </nav>
  )
}

export default Navbar