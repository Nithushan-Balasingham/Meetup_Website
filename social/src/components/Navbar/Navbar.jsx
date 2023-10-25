import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className='flex items-center justify-center h-24 z-50 w-full p-3 border-b border-blue-500'>
      <div className='flex items-center justify-center w-2/3 '>
      <div className='hidden md:block md:text-3xl xl:text-3xl font-mono bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text font-bold w-full'>Meeting Social</div>
      <div className='flex items-center justify-center  lg:w-2/5 xl:w-4/5 w-48 relative md:relative '> {/* Adjust the width based on your design */}
        <input
          type='text'
          placeholder='Search...'
          className='border border-blue-400 px-2 py-1 rounded-xl border-blue bg-transparent w-full' // Take up full width
        />
        <div className='relative right-6 text-blue-400 cursor-pointer'>
          <FaSearch />
        </div>
      </div>
      </div>
      <div className="flex items-center justify-end w-full lg:w-2/5 xl:w-1/3"> {/* Adjust the width based on your design */}
        <ul className='text-black flex flex-row text-xl'>
          <li className='text-cyan-400'>SignIn</li>
          <li className='text-indigo-400 px-2'>SignUp</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
