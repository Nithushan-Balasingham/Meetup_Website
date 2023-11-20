import React from 'react';
import Typed from 'react-typed';
import videoBg from '../../assets/video/videoBg.mp4';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <div className='relative  h-screen w-full' id='home'>
<video src={videoBg} autoPlay loop muted className="absolute -z-10 w-full h-full object-cover  " />
      <div className='relative z-10 h-full mx-auto text-center flex flex-col items-center justify-center'>
        <p className='text-blue-400 font-mono font-bold p-2 md:text-3xl sm:text-2xl text-xl'>The people platform—Where interests become friendships</p>
        <div className='md:text-2xl sm:text-xl text-xl font-bold md:py-6 text-center w-2/3  '>
          Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Meetup. Events are happening every day—sign up to join the fun.
        </div>
        <div className='flex justify-center items-center'>
          <p className='md:text-2xl sm:text-xl text-xl font-bold py-4 text-green-300'>
            JOIN
          </p>
          <Typed  
            className='md:text-2xl sm:text-xl text-xl font-bold md:pl-4 pl-2 text-green-300'
            strings={['NOW','OR LATER']} 
            typeSpeed={120} 
            backSpeed={140} 
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-300'>Welcome to the Meet Up</p>
      </div>
    </div>
  );
}

export default Home;
