import React from 'react';
import { LogOut, Plus, PlusCircle, User } from 'react-feather';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "../../redux/user/userSlice"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; 


const Navbar = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const handleSignOut = () => {
    toast.success("LogOut Successfully", {position:"top-center"})
    dispatch(signOut());

  };
  const handleLogin =()=>{
    navigate('/login')
  }
  const accessToken = useSelector((state) => state.user);
  const username = accessToken.currentUser ? accessToken.currentUser.userName : "Nouser";
  console.log(username)

  return (
    <div className='flex items-center justify-center h-20 w-full p-3 border-b bg-transparent border-blue-700 z-50  bg-gradient-to-r from-green-300 to-teal-400'>
      <div className='flex items-center justify-between w-full '>
      <div className='hidden md:block md:text-3xl xl:text-3xl  bg-gradient-to-r from-red-600 to-rose-300 text-transparent  font-mono bg-clip-text font-bold w-full'>VoluNet</div>
      </div>
    
      <div className='w-full'>
        {username == "Nouser" ? (
          <div className="flex items-center justify-end  relative md:relative cursor-pointer m-1" title='Sign-In/Up'>
          <User size={32} className='border-4 rounded-3xl border-gray-700' color='red' onClick={handleLogin}/>
        </div>
        ):(
          <div className='flex items-center justify-end w-full ' >
            <div className='flex mr-8 gap-2'> 
              <div className=' text-slate-900 font-bold' style={{fontSize:"20px"}}>
              {username}
              </div>
              <div title='Add New Post' className=''>
                <Link to='/post'><PlusCircle className='text-blue-800' size={32}/></Link>
              </div>
            </div>
            <div title='Logout'>
              <LogOut 
                className='cursor-pointer' 
                onClick={() => {
                  Swal.fire({
                      title: `${username}, Are you want log-out?`,
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, LogOut'
                  }).then((result) => {
                      if (result.isConfirmed) {
                        handleSignOut();
                      }
                  });
                  }}
                
                />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
