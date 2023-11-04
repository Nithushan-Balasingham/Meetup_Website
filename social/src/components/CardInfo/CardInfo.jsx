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
          className="flex flex-col items-center justify-center shadow-xl rounded-xl"
          key={cardDetails.id}
        >
          <div>
            <img
              src={cardDetails.eventImage}
              alt=""
              className="w-98 h-56 rounded-xl p-2 flex justify-start"
            />
          </div>
          <div className="text-teal-400 font-bold text-4xl">{cardDetails.eventName}</div>
          <div className="text-white text-3xl">{cardDetails.eventDescription}</div>
          <div className="flex items-center  flex-col justify-center text-3xl">
            <div className="m-2 text-white font-mono">{cardDetails.peopleGoing}</div>
            <div
              className={
                cardDetails.status === "Free"
                  ? "text-teal-400 font-bold font-mono"
                  : "text-rose-400 font-bold font-mono"
              }
            >
              {cardDetails.status}
            </div>
          </div>
          <div className="text-teal-700 font-bold text-xl">
            Images
          </div>
          <div className="flex w-full justify-center items-center shadow-xl shadow-black/40 p-8">
            <img src="https://addicted2success.com/wp-content/uploads/2018/06/8-Reasons-You-Should-Join-a-Meetup-Group-Today.jpg" alt="" className='w-72 h-56 rounded-xl p-2 hover:scale-110 transition duration-300'/>
            <img src="https://blog.euvou.events/wp-content/uploads/2021/06/meetup.png" alt="" className='w-72 h-56 rounded-xl p-2 hover:scale-110 transition duration-300'/>
            <img src="https://miro.medium.com/v2/resize:fit:1400/1*xv_OrvHjTRjb09SrWHqT-A.jpeg" alt="" className='w-72 h-56 rounded-xl p-2 hover:scale-110 transition duration-300'/>
            <img src="https://www.meetup.com/blog/wp-content/uploads/2022/01/conversation-over-coffee_how-to-make-conversation-1120x630.jpg" alt="" className='w-72 h-56 rounded-xl p-2 hover:scale-110 transition duration-300'/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
