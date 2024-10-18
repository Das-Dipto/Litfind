import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './customDesign.css' // Lodash for throttle and debounce
import { env } from '../../../Configs/baseConfig';
import Pagination from '../../../Components/Pagination/Pagination';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch books from the API
  const fetchBooks = async (query) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${env.EXTERNAL_URL}/books?search=${query}`);
      console.log(response); // Log the entire response 
      if(response.data.count > 0){
        setBooks(response.data.results); // Store the book results in state
      }
      else{
        setError('No book found with this title, kindly search with proper title')
      }
    } catch (err) {
      console.error('API fetch error:', err);
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced function to optimize API calls
  const debouncedFetchBooks = useCallback(_.debounce(fetchBooks, 500), []);

  // Throttled function to control user input triggers
  const throttledHandleInput = useCallback(
    _.throttle((query) => {
      if (query.trim().length > 2) {
        debouncedFetchBooks(query); // Trigger debounced search when query has enough characters
      }
    }, 300),
    []
  );

  // Input handler for the search query
  const handleInputChange = (e) => {
    setBooks([]);
    setError(``);
    const query = e.target.value;
    setSearchQuery(query);
    throttledHandleInput(query); // Throttled search
  };

  return (
    <>
    <div className="container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search Books by Title"
          value={searchQuery}
          onChange={handleInputChange}
          className="search-bar"
        />
      </div>

      {loading && <p className="loading">Loading books...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <strong>{book.title}</strong> by {book.authors.map((author) => author.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>

    <div className='mt-[4rem]'>
        <Pagination/>
    </div>
    
    </>
  );
};

export default Page;
