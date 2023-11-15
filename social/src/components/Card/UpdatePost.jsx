import React, { useEffect, useState } from "react";
import { addListStart, addListFailure, addListSuccess } from "../../redux/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate, useParams} from 'react-router-dom'
import CountryData from '../Login/CountryData.json'


const UpdatePost = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      meeting: "",
      meetingType:"",
      image: null,
      date: "", 
      time: "", 
      country:""
    });
        const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.user);

    useEffect(() => {
      // Fetch data from the API using the post ID
      axios
        .get(`http://localhost:5001/api/posts/${id}`)
        .then((response) => {
          const postData = response.data;
          // Set the fetched data in the component state
          setFormData({
            name: postData.name,
            description: postData.description,
            meeting: postData.meeting,
            meetingType: postData.meetingType,
            date:new Date(postData.date).toISOString().slice(0, 10),
            time: postData.time,
            country: postData.country,
            image: postData.image,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          dispatch(addListFailure("Error fetching data"));
          // You might want to handle the error, e.g., redirect or display an error message
        });
    }, [id, dispatch]);
    const handleChange = (e) => {
      console.log("Event:", e);
      
      if (e.target.type === 'file') {
        console.log("File selected:", e.target.files[0]);
        setFormData({ ...formData, image: e.target.files[0] });
      } else {
        const value = e.target.value === 'null' ? null : e.target.value;
        console.log("Setting value:", value);
        setFormData({ ...formData, [e.target.id]: value });
      }
    };
    
    
    

 const handleCreateCollection = (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.meeting.trim() ||
      formData.image === null ||
      formData.meetingType === "null" ||
      formData.country === "null"
 
    ) {
      toast.error("Please fill in all fields and select a meeting type");
      return;
    }
    
  

    const postData = new FormData();
    postData.append('name', formData.name);
    postData.append('description', formData.description);
    postData.append('meeting', formData.meeting);
    postData.append('date', formData.date);
    postData.append('time', formData.time);
    postData.append('image', formData.image);
    postData.append('meetingType', formData.meetingType);
    postData.append('country', formData.country);




    const config = {
      method: "PUT",
      url: `http://localhost:5001/api/posts/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken.currentUser.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      data: postData,
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Successfully Created the Post", { position: "top-center" });
          navigate("/");
        } else {
          console.log("error")
          dispatch(addListFailure("Request failed with status: " + response.status));
          toast.error("Error: " + response.status);
        }
      })
      .catch((error) => {
        dispatch(addListFailure(error.message));
        if (error.response && error.response.status === 400) {
          toast.error("Bad Request: Please check your input and try again",{position:"top-center"});
        } else {
          toast.error("Error: " + error.message);
        }      
      });
  };

  return (
    <div className="flex flex-col items-center  min-h-screen w-screen p-4">
        <h2 className="text-2xl text-teal-400 font-bold mb-2  rounded-2xl border-blue-400 p-2">Update Post</h2>
      <form className='flex flex-col w-full  rounded-lg shadow-xl p-4 shadow-black'  onSubmit={handleCreateCollection}>
            <div className='flex flex-col '>
                <label className='m- font-bold w-fit'>Title</label>
                <input 
                    type='text'
                    id='name' 
                    placeholder='Enter your Text' 
                    className='w-250 px-4 py-2 border rounded-lg text-teal-400'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
            </div>
            <div className='flex flex-col mt-2'>
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
            <div className='flex flex-col mt-2'>
            <div className='flex justify-between'>
                <label className=' font-bold w-fit'>Country</label>    
                </div>                         
                <select
                  id='country'
                  value={formData.country}
                  onChange={handleChange}
                  className='w-250 px-4 py-2 border rounded-lg text-teal-400'
                  required
                >
                   <option value="null" disabled selected>
                    Select Country
                  </option>
                  {CountryData.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

            </div>
            <div className='flex flex-col mt-2'>
            <div className='flex justify-between'>
                <label className=' font-bold w-fit'>MeetingType</label>    
                </div>                         
                <select
                  id='meetingType'
                  value={formData.meetingType}
                  onChange={handleChange}
                  className='w-250 px-4 py-2 border rounded-lg text-teal-400'
                  required
                >
                  <option value="null">Select meeting type</option>
                  <option value='Online'>Online</option>
                  <option value='Physical'>Physical</option>
                </select>


            </div>
            <div className='flex flex-col mt-2'>
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
            <div className="flex items-center">
              <div className='flex flex-col mt-2'>
              <div className='flex justify-between'>
                  <label className=' font-bold w-fit'>Date</label>    
                  </div>                         
                  <input
                    type='date'
                    id='date'
                    value={formData.date}
                    onChange={handleChange}
                    className='w-250 px-4 py-2 border rounded-lg text-teal-400 mr-2'
                    required
                  />

              </div>
              <div className='flex flex-col mt-2'>
              <div className='flex justify-between'>
                  <label className=' font-bold w-fit'>Time</label>    
                  </div>                         
                  <input
                    type='time'
                    id='time'
                    value={formData.time}
                    onChange={handleChange}
                    className='w-250 px-4 py-2 border rounded-lg text-teal-400 ml-2'
                    required
                  />
              </div>

            </div>  
            <div className='flex flex-col mt-2'>
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

export default UpdatePost;
