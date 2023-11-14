import React, { useEffect, useState } from 'react';
import PostData from './PostData.json';
import Typed from 'react-typed';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getListFailure, getListSuccess } from "../../redux/post/postSlice";

const Posts = () => {
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [org, setOrg] = useState([])
  const totalPosts = PostData.length;
  const dispatch = useDispatch();

  const handleSeeMoreClick = () => {
    setVisiblePosts(visiblePosts + 3);
  };



  const accessToken = useSelector((state) => state.user);
  


  const fetchAllCollection = () => {
    const config = {
      method: "GET",
      url: "http://localhost:5001/api/posts",
    };

    axios(config)
      .then((response) => {
        setOrg(response.data)
        dispatch(getListSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(getListFailure(error.message));
      });
  };

  useEffect(() => {
    fetchAllCollection();
  },[]);


  return (
    <div className='h-full text-white flex flex-col items-center justify-center bg-slate-400 p-4'>
      <div className='flex justify-center items-center'>
        <p className='md:text-4xl sm:text-2xl text-2xl font-bold py-4 text-[#00df9a]'>
          EVENTS
        </p>
        <Typed
          className='md:text-4xl sm:text-2xl text-2xl font-bold md:pl-4 pl-2 text-[#00df9a]'
          strings={['Nearby']}
          typeSpeed={120}
          backSpeed={140}
          loop
        />
      </div>
        <div className='grid md:grid-cols-4 sm:grid-cols-1 gap-4  w-11/12 h-11/12'>
          {org.slice(0, visiblePosts).map((post) => (
            <div key={post._id}>
              <Link to={`/post/${post._id}`}><div
                className='flex flex-col  items-center justify-center p-2 shadow-xl rounded-xl shadow-black'
              >
                <div>
                <img src={`http://localhost:5001/uploads/${post.image}`} className='h-48 w-96' alt="Post Image" />

                </div>
                <div className='text-teal-400 font-bold'>{post.name}</div>
                <div className='flex items-center justify-center'>
                  {post.count == 0 ? ("No People Joined"):(<div className='m-2'>{post.count} people</div>)}
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
        {visiblePosts < totalPosts && (
          <div className='w-full h-full flex items-center justify-center'>
            <button
              onClick={handleSeeMoreClick}
              className='mt-4 p-2 bg-[#00df9a] text-white rounded hover:bg-green-600'
            >
              See More Events
            </button>
          </div>
        )}
      </div>
  );
};

export default Posts;
