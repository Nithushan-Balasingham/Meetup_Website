import React, { useState } from "react";
import { addListStart, addListFailure, addListSuccess } from "../../redux/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

const NewPost = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: "", description: "", meeting: "", image: null });
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.user);

    const handleChange = (e) => {
        if (e.target.type === 'file') {
          setFormData({ ...formData, image: e.target.files[0] });
        } else {
          setFormData({ ...formData, [e.target.id]: e.target.value });
        }
      };

 const handleCreateCollection = (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (/^\s*$/.test(formData.name) || /^\s*$/.test(formData.description) || /^\s*$/.test(formData.meeting) || formData.image === null) {
      toast.error("Empty Space Found");
      return;
    }

    const postData = new FormData();
    postData.append('name', formData.name);
    postData.append('description', formData.description);
    postData.append('meeting', formData.meeting);
    postData.append('image', formData.image);

    dispatch(addListStart());

    const config = {
      method: "POST",
      url: "http://localhost:5001/api/posts/addPost",
      headers: {
        Authorization: `Bearer ${accessToken.currentUser.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      data: postData,
    };

    axios(config)
      .then((response) => {
        dispatch(addListSuccess(response.data));
        toast.success("Successfully Created the Post", { position: "top-center" });
        navigate('/')
      })
      .catch((error) => {
        dispatch(addListFailure(error.message));
      });
  };

  return (
    <div className="flex flex-col items-center  h-screen w-screen p-8">
        <h2 className="text-4xl text-teal-400 font-bold mb-8">Add Post</h2>
      <form className='flex flex-col w-full  rounded-lg'  onSubmit={handleCreateCollection}>
            <div className='flex flex-col '>
                <label className='m- font-bold w-fit'>Ttile</label>
                <input 
                    type='text'
                    id='name' 
                    placeholder='Enter your Text' 
                    className='w-250 px-4 py-2 border rounded-lg text-teal-400'
                    value={formData.listname}
                    onChange={handleChange}
                    required
                    />
            </div>
            <div className='flex flex-col mt-5'>
            <div className='flex justify-between'>
                <label className=' font-bold w-fit'>Description</label>    
                </div>                         
                <textarea 
                    type='text'
                    id='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Enter your description' 
                    className='w-250 px-4 py-2 border rounded-lg text-teal-400'
                    required
                    />

            </div>
            <div className='flex flex-col mt-5'>
            <div className='flex justify-between'>
                <label className=' font-bold w-fit'>Meeting</label>    
                </div>                         
                <input 
                    type='text'
                    id='meeting'
                    value={formData.meeting}
                    onChange={handleChange}
                    placeholder='Enter your meeting' 
                    className='w-250 px-4 py-2 border rounded-lg text-teal-400'
                    required
                    />

            </div>
            <div className='flex flex-col mt-5'>
                <label className=' font-bold w-fit'>Image</label>
                <input
                    type='file'
                    id='image'
                    onChange={handleChange}
                    className='w-250 px-4 py-2 border rounded-lg text-teal-400'
                    required
                />
            </div>
            <div className='flex items-center justify-center w-100 mt-4 flex-col'>
                <button 
                type="submit" 
                className=' bg-rose-400 p-2 rounded-lg text-xl font-bold hover:scale-105 duration-300 ease-in-out hover:shadow-md' 
                >
                Submit  
                </button>

            </div>

            </form>
            </div>
       
    
            
  );
};

export default NewPost;
