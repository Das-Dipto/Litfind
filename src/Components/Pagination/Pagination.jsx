import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { env } from '../../Configs/baseConfig';
import { hatch } from 'ldrs'
import './customDesign.css'; // for adding styles and transitions
import { useNavigate } from 'react-router-dom';

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
          <div className="grid grid-cols-2 gap-[1rem]">
          {books.map((book) => (
      <div
        key={book.id}
        onClick={() => navigate(`/book-information/${book.id}`)}
        className="p-5 book-card flex gap-10 transition-transform duration-500 hover:scale-105 bg-white hover:bg-blue-50 rounded-lg"
      >
        <figure className='w-[200px] h-[220px]'>
          <img src={book.formats['image/jpeg']} alt={book.title} className="book-cover w-full h-full object-cover" />
        </figure>
        <div>
          <h3 className="book-title font-bold text-[18px]">{book.title}</h3>
          <p className="book-author text-blue-500 mt-3">Author: {book.authors.map(author => author.name).join(", ")}</p>
          <p className="book-genre">Genre: {book.subjects[0] || 'N/A'}</p>
          <p className="book-id text-blue-800 font-semibold">ID: {book.id}</p>
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
    </div>
  );
};

export default Pagination;
