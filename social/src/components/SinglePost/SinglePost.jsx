import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'; 
import {ArrowDownLeft, ArrowLeftCircle, CheckCircle, XCircle, check} from 'react-feather'

const SinglePost = () => {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [meeting, setMeeting] = useState('')
    const [meetingType, setMeetingType] = useState('')
    const [imgData, setImgData] = useState('')
    const [count, setCount] = useState('')
    const [postId, setPostId] = useState('')
    const [userStates, setUserStates] = useState({}); // Assuming userStates is an object with user._id as keys
    const [enrolledUsers, setEnrolledUsers] = useState([]);
    const [userIds, setUserIds] = useState([]);

    const accessToken = useSelector((state) => state.user);
    console.log("AS",accessToken.currentUser.userId)
    const userRefId = accessToken.currentUser.userId

    const handleEnroll = async () => {
    
        if (!accessToken) {
          throw new Error('Access token not found');
        }
    
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken.currentUser.accessToken }`,
          },
        };
    
        const data = {
            postId:postId 
        };
    
        try {
          await axios.patch(`http://localhost:5001/api/posts/enroll/${postId}`, data, config);
          toast.success("Enrolled Successfully",{position:"top-center"})
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        } catch (error) {
          console.error('Error updating checkbox status:', error);
        }
      };

    const handleDisenroll= async () => {
    
        if (!accessToken) {
          throw new Error('Access token not found');
        }
    
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken.currentUser.accessToken }`,
          },
        };
    
        const data = {
            postId:postId 
        };
    
        try {
          await axios.patch(`http://localhost:5001/api/posts/disenroll/${postId}`, data, config);
          toast.success("Disenrolled Successfully",{position:"top-center"})
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        } catch (error) {
          console.error('Error updating checkbox status:', error);
        }
      };

      useEffect(() => {
        const getDatabyId = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5001/api/posts/${id}`);
                console.log(data.enrolledUsers);

                // Update post-related state
                setName(data.name);
                setDescription(data.description);
                setMeeting(data.meeting);
                setMeetingType(data.meetingType);
                setStatus(data.status);
                setImgData(data.image);
                setCount(data.count);
                setPostId(data._id);

                // Update state for each user in enrolledUsers
                if (data.enrolledUsers && data.enrolledUsers.length > 0) {
                  const updatedUserIds = data.enrolledUsers.map(user => {
                      // Update state for each user's userId
                      setUserIds(prevUserIds => [...prevUserIds, user.userId]);
                      return user.userId;
                  });

                  // Optionally, if you want to update a single state for all userIds
                  setUserIds(updatedUserIds);
                    console.log('Updated enrolled users state:', updatedUserIds);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getDatabyId();
    }, [id]);


  return (
            <div className='h-screen'>
                 <div title='go back to home'>
                    <Link to='/'>
                        <ArrowLeftCircle className='text-red-400 hover:text-red-600 cursor-pointer'/>
                    </Link>
                 </div>
            <div className='flex justify-center  p-4'>
               

                <div>
                    <div className='flex items-center justify-center mb-2 text-4xl'>
                    <div className='text-teal-800 font-bold'>{name}</div>
                    </div>

                <div
                    className='flex flex-col  items-center justify-center p-2'>
                <div className=' shadow-xl rounded-xl shadow-black p-2 mb-5 bg-teal-400'>
                    <img src={`http://localhost:5001/uploads/${imgData}`} className='h-48 w-96' alt=" " />
                </div>
                <div className='text-green-400 font-bold w-96 text-justify shadow-xl p-4 rounded-lg'>
                    <div className='text-xl text-blue-400 text-center border-b-2'>
                        Description
                    </div>
                    <div className='m-1'>
                        {description}
                    </div>
                </div>
                <div className='flex items-center justify-center w-48 text-blue-600 border-2 mt-2 border-blue-400 rounded-2xl'>
                  {count === 0 ? 
                  (
                    <div className='flex gap-2 text-red-500'>
                        <XCircle className='text-red-500'/>
                        No People Joined    
                    </div>)
                  :(
                    <div className='m-2 flex gap-2'> 

                     <div className='font-bold flex gap-2'>
                        <CheckCircle color='red'/>
                        {count}
                    </div>
                     <div>People joined</div>
                     </div>)}
                </div>
                <div>
                  <div className='border-2 m-4 p-1 rounded-xl bg-green-400 font-bold border-green-200'>
                        Type : {meetingType}
                    </div>
                    <div className='border-2 m-4 p-1 rounded-xl bg-green-400 font-bold border-green-200'>
                        Venue : {meeting}
                    </div>
                </div>
                <div>
                {userIds.includes(userRefId) ? (
                        <div className='bg-'>
                           <button 
                                className='bg-rose-400 text-base w-24 font-bold gilroy text-white p-3 rounded-lg hover:bg-rose-800 focus:bg-rose-400'
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Are you want disenroll?',
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes!'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleDisenroll();
                                        }
                                    });
                                    }}
                            >
                                
                                Cancel
                            </button>
                        </div>
                     ):( 
                        <div>
                            <button 
                                className='bg-[#6A82FF] text-lg font-bold gilroy text-white p-3 rounded-lg hover:bg-[#536CF0] focus:bg-[#3E51B4]'
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Are you want enroll?',
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes!'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleEnroll();
                                        }
                                    });
                                    }}
                            >
                                Enroll
                            </button>
                        </div>
                     )} 
                   
                </div>
              </div>
            </div>
            </div>
            </div>
  )
}

export default SinglePost