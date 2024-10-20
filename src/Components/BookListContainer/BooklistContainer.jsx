import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { hatch } from 'ldrs'
import { env } from '../../Configs/baseConfig';
import './customDesign.css'
import bookCoverImage from '../../assets/Navbar/demobook.png'

const BooklistContainer = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  hatch.register()

  const fetchBookData = async() =>{
      setLoading(true)

      try {
        const response = await axios.get(`${env.EXTERNAL_URL}/books`);
        console.log('This is response ', response.data);
        setBookData(response.data.results); // Set data on success
      } catch (err) {
        console.log('Error occurred while data fetching ', err.message); // Set error state on failure
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
  }

  useEffect(()=>{
    fetchBookData();
  },[])

  return (
    loading ? <div className="loader h-[50vh] w-full flex justify-center items-center">
          <l-hatch
            size="28"
            stroke="4"
            speed="3.5" 
            color="black" 
          ></l-hatch>
      </div> 
: <div className='grid grid-cols-3 justify-center gap-11 w-[88%] mx-auto my-[4rem]'>
      {
        bookData.map((book, index)=>(
          <div
          key={book.id}
          onClick={() => navigate(`/book-information/${book.id}`)}
          className="p-5 book-card flex gap-10 transition-transform duration-500 hover:scale-105 bg-white hover:bg-blue-50 rounded-lg"
        >
          <figure className='w-[120px] '>
            <img src={book.formats['image/jpeg'] ? book.formats['image/jpeg'] : bookCoverImage} alt={book.title} className="book-cover w-full h-full object-cover" />
          </figure>
          <div>
            <h3 className="book-title font-bold text-[18px]">{book.title.length > 40 ? <span title={book.title}>{book.title.slice(0, 40) + '...'}</span>  : book.title}</h3>
            <p className="book-author text-blue-500 mt-3">Author: {book.authors.map(author => author.name).join(", ")}</p>
            <p className="book-genre">Genre: {book.subjects[0] || 'N/A'}</p>
            <p className="book-id text-blue-800 font-semibold">ID: {book.id}</p>
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default BooklistContainer