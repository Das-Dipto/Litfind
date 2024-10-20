import React, { useEffect, useState } from 'react';
import './customDesign.css';
import { toast } from 'react-toastify';
import bookCoverImage from '../../../assets/Navbar/demobook.png'

const Page = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch wishlist from localStorage when the component mounts
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeBookFromWishlist = (id) => {
    // Remove book from wishlist and update localStorage
    const updatedWishlist = wishlist.filter((book) => book.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    toast('Item removed from wishlist');
  };

  return (
    <div className="wishlist-page p-5">
      <h1 className="text-2xl font-bold mb-8 text-center">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((book) => (
            <div
              key={book.id}
              className="wishlist-card p-5 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 relative"
            >
              <figure className="h-[220px]">
                <img src={book.cover ? book.cover : bookCoverImage} alt={book.title} className="w-full h-full object-cover rounded-md" />
              </figure>
              <div className="p-3">
                <h3 className="font-bold text-[18px] mb-2">{book.title}</h3>
                <p className="text-blue-500">Author: {book.authors}</p>
                <p className="text-gray-500">Genre: {book.genre}</p>
              </div>
              <button
                title={`Remove this book from wishlist`}
                onClick={() => removeBookFromWishlist(book.id)}
                className="remove-button absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition duration-300"
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M256 48C141.3 48 48 141.3 48 256s93.3 208 208 208 208-93.3 208-208S370.7 48 256 48zm-24 320c-13.3 0-24-10.7-24-24V216c0-13.3 10.7-24 24-24s24 10.7 24 24v128c0 13.3-10.7 24-24 24zm0-192c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Page;
