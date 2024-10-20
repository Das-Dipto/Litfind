import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SmallScreenNavbar = () => {

  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Trigger the appearance when the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div
    className={`flex flex-col gap-5 py-5 px-[25px] bg-[#3a3636] w-full transition-transform duration-500 ease-in-out 
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
  >
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
    </div>
  )
}

export default SmallScreenNavbar