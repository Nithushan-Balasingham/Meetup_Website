import React from 'react'
import { useState, useEffect } from 'react';


const CardInfo = () => {
    const [cardDetails, setCardDetails] = useState([]);

    useEffect(() => {
      const storedCardDetails = JSON.parse(localStorage.getItem('cardDetails'));
      if (storedCardDetails) {
        setCardDetails(storedCardDetails);
      }
    }, []);

  return (
    <div key={cardDetails.id}>
    <div
      className='flex flex-col  items-center justify-center p-2 shadow-xl rounded-xl shadow-black'
    >
      <div>
        <img src={cardDetails.eventImage} alt='' className='w-72 h-56 rounded-xl p-2' />
      </div>
      <div className='text-teal-400 font-bold'>{cardDetails.eventName}</div>
      <div className='text-white'>{cardDetails.eventDescription}</div>
      <div className='flex items-center justify-center'>
        <div className='m-2 text-white'>{cardDetails.peopleGoing}</div>
        <div
          className={cardDetails.status === 'Free' ? 'text-teal-400 font-bold' : 'text-rose-400 font-bold'}
        >
          {cardDetails.status}
        </div>
      </div>
    </div>
  </div>
  )
}

export default CardInfo