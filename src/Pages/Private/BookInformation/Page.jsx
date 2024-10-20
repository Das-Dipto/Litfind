import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import './customDesign.css';
import bookCoverImage from '../../../assets/Navbar/demobook.png'  // Custom styles

const Page = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the book data from the Gutendex API
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`https://gutendex.com/books?ids=${id}`);
        setBook(response.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book data:', error);
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  const downloadZip = () => {
    if (book && book.formats['application/octet-stream']) {
      const zipUrl = book.formats['application/octet-stream'];
  
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = `${book.title}.zip`; // Specify the file name
  
      // Append the link to the body
      document.body.appendChild(link);
      link.click(); // Simulate a click on the link to download the file
  
      // Clean up by removing the link element
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return <div className="loading-spinner min-h-[80vh]">Loading...</div>;  // Custom spinner style
  }

  if (!book) {
    return <div className="error-message">Book not found</div>;
  }

  return (
    <div className="book-page p-5 min-h-[80vh]">
      <div className='flex justify-center items-center'>
        <div className="book-card-detail flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-5 gap-10 relative">
          <figure className="w-full md:w-[250px] h-[300px]">
            <img src={book.formats['image/jpeg'] ? book.formats['image/jpeg'] : bookCoverImage } alt={book.title} className="w-full h-full object-cover rounded-md" />
          </figure>
          <div className="book-info flex-1">
            <h2 className="font-bold text-2xl mb-4">{book.title}</h2>
            <p className="text-lg text-blue-500 mb-2">Author: {book.authors.map(author => author.name).join(', ')}</p>
            <p className="text-gray-700 mb-4">Genre: {book.subjects[0] || 'N/A'}</p>
            <p className="text-gray-700 mb-4 font-semibold">Download: {book.download_count || 'N/A'}</p>
            {/* <p className="text-gray-500 text-sm mb-6">Published by: {book.publishers[0] || 'Unknown'}</p> */}

            <button
              onClick={downloadZip}
              className="download-btn absolute right-4 bottom-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
            >
              Download Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
