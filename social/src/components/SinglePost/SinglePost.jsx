import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; 
import { ArrowLeftCircle, Calendar, CheckCircle, Clock, Delete, Edit, Map, MapPin, Trash, XCircle } from 'react-feather';

const SinglePost = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [meeting, setMeeting] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [imgData, setImgData] = useState('');
  const [count, setCount] = useState('');
  const [postId, setPostId] = useState('');
  const [userName, setUserName] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [country ,setCountry] = useState('')
  const [ownId, setOwnerId] = useState('')
  const [time, setTime] = useState('');
  const [date, setDate] = useState(null);
  const navigate = useNavigate()

  const accessToken = useSelector((state) => state.user);
  const userRefId = accessToken.currentUser.userId;

  const handleEnroll = async () => {
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken.currentUser.accessToken}`,
      },
    };

    const data = {
      postId: postId,
    };

    try {
      await axios.patch(`http://localhost:5001/api/posts/enroll/${postId}`, data, config);
      toast.success("Enrolled Successfully", { position: "top-center" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error updating checkbox status:', error);
    }
  };

  const handleDisenroll = async () => {
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken.currentUser.accessToken}`,
      },
    };

    const data = {
      postId: postId,
    };

    try {
      await axios.patch(`http://localhost:5001/api/posts/disenroll/${postId}`, data, config);
      toast.success("Disenrolled Successfully", { position: "top-center" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error updating checkbox status:', error);
    }
  };

  useEffect(() => {
    const getDatabyId = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/posts/${id}`);
        setOwnerId(data.user_id._id)
        setName(data.name);
        setDescription(data.description);
        setMeeting(data.meeting);
        setMeetingType(data.meetingType);
        setStatus(data.status);
        setImgData(data.image);
        setCount(data.count);
        setPostId(data._id);
        setUserName(data.userName)
        setCountry(data.country)
        setTime(data.time) 
        const formattedDate = new Date(data.date).toISOString().slice(0, 10);
        setDate(formattedDate);

        if (data.enrolledUsers && data.enrolledUsers.length > 0) {
          const updatedUserIds = data.enrolledUsers.map(user => {
            setUserIds(prevUserIds => [...prevUserIds, user.userId]);
            return user.userId;
          });

          setUserIds(updatedUserIds);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDatabyId();
  }, [id]);

  const deletePost = () => {
    console.log("Delete post function called");

    const config = {
      method: "DELETE",
      url: `http://localhost:5001/api/posts/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken.currentUser.accessToken}`,
      },

    };

    axios(config)
      .then((response) => {
        toast.success("Successfully Deleted", {position:'top-center'})
        navigate('/')

      })
      .catch((error) => {
        console.error("Error deleting collection:", error);
        toast.error("Server Wrong", {position:"top-center"})
   
      });
  };

  const onBack =()=>{
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='flex items-center justify-between'>
        <Link to='/' className='text-red-400 hover:text-red-600 cursor-pointer'>
          <ArrowLeftCircle className='m-2' />
        </Link>
        {ownId !== userRefId ? (
          null
        ):(
          <div>
          <Link to={`/edit/${id}`} title='edit'>
          <Edit className='m-2' color='blue'/>
        </Link>
        <div 
          title='Delete' 
          style={{ zIndex: 999 }} 
          className='cursor-pointer '
          onClick={() => {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this Account and Post!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deletePost();
                }
            });
            }}
          >
        <Trash 
          className='m-2 cursor-pointer'
          color='red'  /> 
            </div>       
      </div>
        )}
       
        </div>
      <div className='flex flex-col justify-center p-3 relative -top-3'>
        <div className='flex flex-col items-center  justify-center'  >
        <div className='text-teal-800 font-bold text-3xl font-mono flex items-center justify-center' >{name} </div>
        <p className='text-rose-400 font-thin text-2xl'>Created By {userName}</p>
        <p className='flex mt-1 text-cyan-400'><MapPin /> : {country}</p>
          <img src={`http://localhost:5001/uploads/${imgData}`} className='h-[350px] w-[450px] object-contain relative -top-5' alt=" " />
        </div>
        <div className=' flex justify-center items-center'>
            <div className='flex relative -top-14 w-fit  justify-center  text-blue-600 border-2 m-2 border-blue-400 rounded-2xl'>
              {count === 0 ? (
                <div className='flex gap-2 text-red-500 p-2'>
                  <XCircle className='text-red-500' />
                  No People Joined
                </div>
              ) : (
                <div className='m-2 flex gap-2'>
                  <div className='font-bold flex gap-2'>
                    <CheckCircle color='red' />
                    {count}
                  </div>
                  <div>People joined</div>
                </div>
              )}
            </div>
            <div className=' '>
          {userIds.includes(userRefId) ? (
            <div className='relative -top-14'>
              <button
                className='bg-rose-400 text-base w-24 font-bold text-white p-3 rounded-lg hover:bg-rose-800 focus:bg-rose-400'
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
          ) : (
            <div className='relative -top-14'>
              <button
                className='bg-blue-500 w-32  font-bold text-white p-3 text-sm rounded-lg hover:bg-blue-700 focus:bg-blue-400'
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
        <div className='flex justify-center space-x-4 mb-2 relative -top-12'>
          <button
            className={`font-bold text-lg ${activeTab === 'description' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`font-bold text-lg ${activeTab === 'details' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
        </div>
        {activeTab === 'description' && (
          <div className='flex items-center justify-center relative -top-12'>
          <div className='text-green-400 font-bold w-10/12  text-center shadow-xl shadow-black p-4 rounded-lg bg-white'>
            <div className='text-xl text-blue-400 text-center border-b-2 pb-2'>
              Description
            </div>
            <div className='mt-2'>
              {description}
            </div>
          </div>
          
          </div>
        )}
        {activeTab === 'details' && (
         <div className='flex items-center justify-center relative -top-12'>
            <div className='relative top-2'>
              <div className='border-2 m-2 p-1 rounded-xl bg-green-400 font-bold border-green-200'>
                Type : {meetingType}
              </div>
              <div className='border-2 m-2 p-1 rounded-xl bg-blue-400 font-bold border-green-200 flex'>
                <Map /> : {meeting}
              </div>
            </div>
            <div className='relative top-2 '>
              <div className='border-2 m-2 p-1 rounded-xl bg-indigo-400 font-bold border-green-200 flex'>
                <Clock/>: {time}
              </div>
              <div className='border-2 m-2 p-1 rounded-xl bg-rose-400 font-bold border-green-200 flex '>
                <Calendar/> :{date}
              </div>
            </div>
          </div>
        )}
       
      </div>
    </div>
  );
};

export default SinglePost;
