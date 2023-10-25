import React, { useState } from 'react'
import PostData from './PostData.json'
import Typed from 'react-typed'

const Posts = () => {
    const [visiblePosts, setVisiblePosts] = useState(4);
    const totalPosts = PostData.length;

    const handleSeeMoreClick = () => {
        setVisiblePosts(visiblePosts + 3);
      };
    
  return (
    <div className='h-full   text-white flex flex-col items-center justify-center'>
    <div className='flex justify-center items-center'>
                <p className='md:text-4xl sm:text-2xl text-2xl font-bold py-4 text-[#00df9a]'>
                       EVENTS 
                       </p>
                <Typed  
                  className='md:text-4xl sm:text-2xl text-2xl font-bold md:pl-4 pl-2 text-[#00df9a]'
                  strings={['NOW','OR LATER']} 
                  typeSpeed={120} 
                  backSpeed={140} 
                  loop/>
            </div>
            <div className>         
             <div className='grid md:grid-cols-4  sm:grid-cols-1 gap-4 '>
             {PostData.slice(0, visiblePosts).map((post) => (
                <div key={post.id}  >
                    <div className='flex flex-col  items-center justify-center p-2 shadow-xl rounded-xl shadow-black' >
                        <div>
                            <img src= {post.eventImage} alt='' className='w-72 h-56 rounded-xl p-2'/>
                        </div>
                        <div className='text-teal-400 font-bold'>
                            {post.eventName}
                        </div>
                        <div>{post.eventDescription}</div>
                        <div className='flex items-center justify-center'>
                            <div className='m-2'>{post.peopleGoing}</div>
                            <div 
                                className={post.status === "Free" ? "text-teal-400 font-bold" : "text-rose-400 font-bold"}
                            >{post.status}</div>
                        </div>     
                    </div>
                </div>
            ))}
             
        </div>
        {visiblePosts < totalPosts && (
                <div className='  w-full h-full flex items-center justify-center'>
                    <button
                        onClick={handleSeeMoreClick}
                        className='mt-4 p-2 bg-[#00df9a] text-white rounded hover:bg-green-600'
                        >
                        See More Events
                    </button>
                </div>
                
            )}
    </div>
    </div>
  )
}

export default Posts