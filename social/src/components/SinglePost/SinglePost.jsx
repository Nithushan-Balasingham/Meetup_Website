import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; 
import { ArrowLeftCircle, CheckCircle, Map, XCircle } from 'react-feather';

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
  const [userStates, setUserStates] = useState({});
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [activeTab, setActiveTab] = useState('description');

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
        setName(data.name);
        setDescription(data.description);
        setMeeting(data.meeting);
        setMeetingType(data.meetingType);
        setStatus(data.status);
        setImgData(data.image);
        setCount(data.count);
        setPostId(data._id);

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

  return (
    <div className='min-h-screen'>
    <div className='flex items-center justify-between'>
      <Link to='/' className='text-red-400 hover:text-red-600 cursor-pointer'>
        <ArrowLeftCircle />
      </Link>
    </div>
    <div className='flex flex-col justify-center p-3 relative top-7'>
      <div className='text-teal-800 font-bold text-3xl font-mono'>{name}</div>
          <img src={`http://localhost:5001/uploads/${imgData}`} className='h-[500px] w-[500px] border-l-green-900 object-contain' alt=" " />
        <div className='flex justify-center space-x-4 mb-2'>
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
          <div className='text-green-400 font-bold w-11/12 text-justify shadow-xl shadow-black p-2 rounded-lg'>
            <div className='text-xl text-blue-400 text-center border-b-2'>
              Description
            </div>
            <div className='m-'>
              {description}
            </div>
          </div>
        )}
        {activeTab === 'details' && (
          <div className='flex border-2 mt-4 p-5 rounded-xl border-purple-400'>
            <div className='flex items-center justify-center w-48 text-blue-600 border-2 mt-2 border-blue-400 rounded-2xl'>
              {count === 0 ? (
                <div className='flex gap-2 text-red-500'>
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
            <div>
              <div className='border-2 m-2 p-1 rounded-xl bg-green-400 font-bold border-green-200'>
                Type : {meetingType}
              </div>
              <div className='border-2 m-2 p-1 rounded-xl bg-blue-400 font-bold border-green-200 flex'>
                <Map /> : {meeting}
              </div>
            </div>
          </div>
        )}
        <div className='mt-2'>
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
          ) : (
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
);
};
export default SinglePost;
