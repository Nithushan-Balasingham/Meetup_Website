import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className='flex items-center justify-center h-24 w-full p-3 border-b bg-transparent border-blue-700 z-50  bg-gradient-to-r from-green-300 to-teal-400'>
      <div className='flex items-center justify-center w-2/3 '>
      <div className='hidden md:block md:text-3xl xl:text-3xl  bg-gradient-to-r from-red-600 to-rose-300 text-transparent  font-mono bg-clip-text font-bold w-full'>Meeting Social</div>
      <div className='flex items-center justify-center  lg:w-2/5 xl:w-4/5 w-48 relative md:relative '> {/* Adjust the width based on your design */}
        <input
          type='text'
          placeholder='Search...'
          className='border border-blue-800 px-2 py-1 rounded-xl text-black border-blue bg-transparent w-full z-10'
          />
        <div className='relative right-6 text-blue-400 cursor-pointer'>
          <FaSearch />
        </div>
      </div>
      </div>
      <div className="flex items-center justify-end w-full lg:w-2/5 xl:w-1/3 relative md:relative ">
        <ul className='text-black flex flex-row text-xl gap-2'>
          <li className=' text-white font-mono'>SignIn</li>
          <li className='text-white font-mono '>SignUp</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
