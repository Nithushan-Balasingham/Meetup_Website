import React from 'react'
import Typed from 'react-typed'

const Home = () => {
  return (
    <div className='text-white h-screen' id='home'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#00df9a] font-bold p-2 md:text-3xl sm:text-2xl text-xl'>The people platform—Where interests become friendships</p>
            <h1 className='md:text-2xl sm:text-xl text-xl font-bold md:py-6 text-center'>
                 Whatever your interest, from hiking and reading to networking and skill sharing, 
                        there are thousands of people who share it on Meetup. Events are happening every day—sign 
                        up to join the fun.</h1>
            <div className='flex justify-center items-center'>
                <p className='md:text-2xl sm:text-xl text-xl font-bold py-4'>
                       JOIN
                       </p>
                <Typed  
                  className='md:text-2xl sm:text-xl text-xl font-bold md:pl-4 pl-2'
                  strings={['NOW','OR LATER']} 
                  typeSpeed={120} 
                  backSpeed={140} 
                  loop/>
            </div>
            <p className='md:text-2xl text-xl font-bold text-gray-500'>Welcome to the Meet Up</p>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started </button>
        </div>
    </div>  )
}

export default Home