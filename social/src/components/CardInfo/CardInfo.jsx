import React from "react";
import { useState, useEffect } from "react";

const CardInfo = () => {
  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    const storedCardDetails = JSON.parse(localStorage.getItem("cardDetails"));
    if (storedCardDetails) {
      setCardDetails(storedCardDetails);
    }
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center p-4">
        <div
          className="flex flex-col items-center justify-center shadow-xl rounded-xl w-80 bg-green-700"
          key={cardDetails.id}
        >
          <div>
            <img
              src={cardDetails.eventImage}
              alt=""
              className="w-72 h-56 rounded-xl p-2"
            />
          </div>
          <div className="text-teal-400 font-bold">{cardDetails.eventName}</div>
          <div className="text-white">{cardDetails.eventDescription}</div>
          <div className="flex items-center justify-center">
            <div className="m-2 text-white">{cardDetails.peopleGoing}</div>
            <div
              className={
                cardDetails.status === "Free"
                  ? "text-teal-400 font-bold"
                  : "text-rose-400 font-bold"
              }
            >
              {cardDetails.status}
            </div>
          </div>
        </div>
      </div>
          <div className="flex w-full justify-center items-center">
        <img src="https://addicted2success.com/wp-content/uploads/2018/06/8-Reasons-You-Should-Join-a-Meetup-Group-Today.jpg" alt="" className='w-72 h-56 rounded-xl p-2'/>
        <img src="https://blog.euvou.events/wp-content/uploads/2021/06/meetup.png" alt="" className='w-72 h-56 rounded-xl p-2'/>
        <img src="https://miro.medium.com/v2/resize:fit:1400/1*xv_OrvHjTRjb09SrWHqT-A.jpeg" alt="" className='w-72 h-56 rounded-xl p-2'/>
        <img src="https://www.meetup.com/blog/wp-content/uploads/2022/01/conversation-over-coffee_how-to-make-conversation-1120x630.jpg" alt="" className='w-72 h-56 rounded-xl p-2'/>
        </div>
    </div>
  );
};

export default CardInfo;
