import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { env } from '../../Configs/baseConfig';
import { hatch } from 'ldrs'
import './customDesign.css'; // for adding styles and transitions
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Pagination = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  hatch.register()

// Default values shown


  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const fetchBooks = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${env.EXTERNAL_URL}/books/?page=${page}`);
      const data = response.data;
      console.log('The results ', data.results);
      setBooks(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setTotalPages(Math.ceil(data.count / 32)); // Assuming 32 books per page
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const loveHandler = (book) => {
    // Retrieve the existing wishlist from localStorage or initialize it
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
    // Check if the book is already in the wishlist
    const isBookInWishlist = existingWishlist.some((item) => item.id === book.id);
  
    if (isBookInWishlist) {
      // If the book is in the wishlist, remove it
      const updatedWishlist = existingWishlist.filter((item) => item.id !== book.id);
  
      // Update localStorage with the new wishlist
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  
      // Show a toast message for removal
      toast(`${book.title} has been removed from your wishlist.`, {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      // If the book is not in the wishlist, add it
      const updatedWishlist = [...existingWishlist, {
        id: book.id,
        title: book.title,
        authors: book.authors.map(author => author.name).join(", "),
        genre: book.subjects[0] || 'N/A',
        cover: book.formats['image/jpeg']
      }];
  
      // Update localStorage with the new wishlist
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  
      // Show a toast message for adding
      toast(`${book.title} has been added to your wishlist.`,
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
    }
  };



  return (
    <div className="books-container">
      {/* Show Loader while loading */}
      {loading ? (
        <div className="loader h-[50vh] w-full flex justify-center items-center">
                <l-hatch
                  size="28"
                  stroke="4"
                  speed="3.5" 
                  color="black" 
                ></l-hatch>
        </div>
      ) : (
        <div className='w-[90%] mx-auto'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => navigate(`/book-information/${book.id}`)}
              className="p-5 book-card flex gap-10 transition-transform duration-500 hover:scale-105 bg-white hover:bg-blue-50 rounded-lg relative"
            >
              <figure className='w-[200px] h-[220px]'>
                <img src={book.formats['image/jpeg']} alt={book.title} className="book-cover w-full h-full object-cover" />
              </figure>
              <div>
                <h3 className="book-title font-bold text-[18px]">{book.title}</h3>
                <p className="book-author text-blue-500 mt-3">Author: {book.authors.map(author => author.name).join(", ")}</p>
                <p className="book-genre">Genre: {book.subjects[0] || 'N/A'}</p>
                <p className="book-id text-blue-800 font-semibold">ID: {book.id}</p>
                <span onClick={(e) => {
          e.stopPropagation();  // Prevents triggering the onClick for the parent div
          loveHandler(book);
        }} 
        className='heart-icon-nofill absolute right-7 bottom-4'
      >
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"  width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg>
                </span>
                
              </div>
            </div>
          ))}
          </div>

          <div className="pagination-container">
                              {/* Previous Button */}
                              <button
                                className={`pagination-button ${!prevPage ? 'disabled' : ''}`}
                                onClick={() => prevPage && handlePageChange(currentPage - 1)}
                                disabled={!prevPage}
                              >
                                Previous
                              </button>

                              {/* First 8 Page Buttons */}
                              {[...Array(totalPages).keys()]
                                .slice(0, 8)
                                .map((_, index) => (
                                  <button
                                    key={index + 1}
                                    className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                  >
                                    {index + 1}
                                  </button>
                              ))}

                              {/* Ellipsis if there are more than 8 pages */}
                              {/* Dropdown for remaining pages */}
                              {totalPages > 8 && (
                                <select
                                  className="pagination-dropdown"
                                  onChange={(e) => handlePageChange(Number(e.target.value))}
                                  defaultValue=""
                                >
                                  <option value="" disabled>Select Page</option>
                                  {[...Array(totalPages).keys()]
                                    .slice(8)
                                    .map((_, index) => (
                                      <option key={index + 9} value={index + 9}>
                                        {index + 9}
                                      </option>
                                  ))}
                                </select>
                              )}

                              {/* Next Button */}
                              <button
                                className={`pagination-button ${!nextPage ? 'disabled' : ''}`}
                                onClick={() => nextPage && handlePageChange(currentPage + 1)}
                                disabled={!nextPage}
                              >
                                Next
                              </button>
                            </div>
        </div>
      )}
     <Toaster />
    </div>
  );
};

export default Pagination;
