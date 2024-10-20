import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { env } from '../../Configs/baseConfig';
import { hatch } from 'ldrs';
import './customDesign.css'; // for adding styles and transitions
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import bookCoverImage from '../../assets/Navbar/demobook.png'

const Pagination = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genreFilter, setGenreFilter] = useState(''); // New state for genre filter
  const [sortOrder, setSortOrder] = useState(''); // New state for sorting

  hatch.register();

  // List of genres (you can customize this based on the genres available from your API)
  const genres = ['All', 'Fiction', 'Drama', 'Poetry', 'Adventure', 'Fantasy'];

  // List of sorting options
  const sortOptions = ['Title Ascending', 'Title Descending', 'Author Ascending', 'Author Descending'];

  useEffect(() => {
    fetchBooks(currentPage, genreFilter, sortOrder);
  }, [currentPage, genreFilter, sortOrder]);

  const fetchBooks = async (page, genre, sort) => {
    setLoading(true);
    try {
      let url = `${env.EXTERNAL_URL}/books/?page=${page}`;
      
      // If a genre is selected, add the genre as a filter parameter
      if (genre && genre !== 'All') {
        url += `&topic=${genre}`;
      }

      // Apply sorting to the request
      if (sort) {
        if (sort === 'Title Ascending') {
          url += `&sort=title`;
        } else if (sort === 'Title Descending') {
          url += `&sort=-title`;
        } else if (sort === 'Author Ascending') {
          url += `&sort=author`;
        } else if (sort === 'Author Descending') {
          url += `&sort=-author`;
        }
      }
      
      const response = await axios.get(url);
      const data = response.data;
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

  const handleGenreChange = (e) => {
    setGenreFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when genre changes
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const loveHandler = (book) => {
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isBookInWishlist = existingWishlist.some((item) => item.id === book.id);
  
    if (isBookInWishlist) {
      const updatedWishlist = existingWishlist.filter((item) => item.id !== book.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast(`${book.title} has been removed from your wishlist.`, {
        icon: '👏',
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
      });
    } else {
      const updatedWishlist = [
        ...existingWishlist,
        { id: book.id, title: book.title, authors: book.authors.map(author => author.name).join(", "), genre: book.subjects[0] || 'N/A', cover: book.formats['image/jpeg'] }
      ];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast(`${book.title} has been added to your wishlist.`, { icon: '👏', style: { borderRadius: '10px', background: '#333', color: '#fff' } });
    }
  };

  return (
    <div className="books-container">
      {loading ? (
        <div className="loader h-[50vh] w-full flex justify-center items-center">
          <l-hatch size="28" stroke="4" speed="3.5" color="black"></l-hatch>
        </div>
      ) : (
        <div className='w-[90%] mx-auto'>
          <div className="filter-container my-4">
            {/* Dropdown for filtering by genre */}
            <label htmlFor="genreFilter" className="mr-3 font-semibold">Filter by Genre:</label>
            <select id="genreFilter" value={genreFilter} onChange={handleGenreChange} className="p-2 border rounded">
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {/* Dropdown for sorting */}
            {/* <label htmlFor="sortOrder" className="ml-6 mr-3 font-semibold">Sort by:</label>
            <select id="sortOrder" value={sortOrder} onChange={handleSortChange} className="p-2 border rounded">
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => navigate(`/book-information/${book.id}`)}
                className="p-5 book-card flex gap-10 transition-transform duration-500 hover:scale-105 bg-white hover:bg-blue-50 rounded-lg relative"
              >
                <figure className='w-[200px] h-[220px]'>
                  <img src={book.formats['image/jpeg'] ? book.formats['image/jpeg'] : bookCoverImage} alt={book.title} className="book-cover w-full h-full object-cover" />
                </figure>
                <div>
                  <h3 className="book-title font-bold text-[18px]">{book.title}</h3>
                  <p className="book-author text-blue-500 mt-3">Author: {book.authors.map(author => author.name).join(", ")}</p>
                  <p className="book-genre">Genre: {book.subjects[0] || 'N/A'}</p>
                  <p className="book-id text-blue-800 font-semibold">ID: {book.id}</p>
                  <span onClick={(e) => { e.stopPropagation(); loveHandler(book); }} className='heart-icon-nofill absolute right-7 bottom-4'>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.7-55.9-43.1-92.6-49.5C96 66.5 54.2 110.7 54.2 189.5v3.3c0 34.2 14.2 65.9 38.9 88.7L256 431.4l162.9-149.9c24.6-22.8 38.9-54.5 38.9-88.7v-3.3c0-78.9-41.8-123.1-73.3-115.2c-36.7 6.4-69.5 23.9-92.6 49.5l-18.1 20.3c-.3.4-.7.7-1 1.1c-10.5 9.2-25.1 9.2-35.6 0z"></path></svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
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
