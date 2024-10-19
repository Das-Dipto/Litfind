import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SmallScreenNavbar = () => {

  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the appearance when the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div
    className={`flex flex-col gap-5 py-5 px-[25px] bg-[#3a3636] w-full transition-transform duration-500 ease-in-out 
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
  >
         <p onClick={()=> navigate('/litfind-booklist')} className='text-[#90f57c] font-semibold text-[18px] hover:text-[#ffa500] ease-in-out duration-200 cursor-pointer'>Booklist</p>
         <p onClick={()=> navigate('/litfind-wishlist')} className='text-[#90f57c] font-semibold text-[18px] hover:text-[#ffa500] ease-in-out duration-200 cursor-pointer'>Wishlist</p>
    </div>
  )
}

export default SmallScreenNavbar