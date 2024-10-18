import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { hatch } from 'ldrs'
import { env } from '../../Configs/baseConfig';

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
: <div className='grid grid-cols-3 justify-center gap-11 w-[80%] border border-blue-500 mx-auto'>
      {
        bookData.map((item, index)=>(
          <div className='border border-red-500 rounded-[15px] w-[250px]'>
              <p className='text-[black] font-semibold'>{item.title}</p>
              <p className='text-[black] font-semibold'>{item.authors[0]?.name}</p>
              <figure className='w-[50px]'>
                 <img src={item.formats['image/jpeg']} alt="" />
              </figure>
          </div>
        ))
      }
    </div>
  )
}

export default BooklistContainer