import React from 'react';
import './customDesign.css'; // Import the CSS for the footer
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer absolute w-full bottom-[-200px] left-0 right-0">
      <div className="footer-content flex flex-wrap justify-between items-center">
        <h1 onClick={()=> navigate('/home')} className="footer-title cursor-pointer text-[#90f57c] font-bold">LitFind</h1>
        <div className='flex flex-wrap gap-4 items-center'>
            <span className="footer-quote cursor-pointer">Mission</span>
            <span className="footer-quote cursor-pointer">Vision</span>
            <span className="footer-quote cursor-pointer">Services</span>
            <span className="footer-quote cursor-pointer">About us</span>
        </div>
      </div>
        <p className="footer-rights">© {new Date().getFullYear()} LitFind. All rights reserved. Powered by- 
            <span onClick={() => window.open('https://zeptoapps.com/', '_blank')} className='inline-block cursor-pointer'>
                <span className='font-semibold text-[#3784f8] ms-[1px]'>Zepto</span>
                <span className='font-semibold text-[orange] ms-[1.50px]'>Apps</span>
            </span>
        </p>
    </footer>
  );
};

export default Footer;
