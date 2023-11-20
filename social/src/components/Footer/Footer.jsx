import React, { useEffect, useState, useRef } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [subject, setSubject] = useState(''); // State to track the subject field value
    const refForm = useRef();
  
    useEffect(() => {
      setTimeout(() => {
        setLetterClass('text-animate-hover');
      }, 3000);
    }, []);
  
    const sendEmail = (e) => {
      e.preventDefault();
      const formData = new FormData(refForm.current);
      const email = formData.get('email');
      console.log('Email:', email);
      console.log('Subject:', subject);
      if (!email || !subject) {
        alert('Please fill in both the email and subject fields before submitting.');
        return;
      }
      const mailtoLink = `mailto:bala@gmail.com?subject=${encodeURIComponent(subject)}`;
      console.log('Mailto Link:', mailtoLink);
      window.open(mailtoLink, '_blank');
      refForm.current.reset();
      setSubject(''); 
    };
  
    const handleSubjectChange = (e) => {
      setSubject(e.target.value);
    };
  return (
    <div className='flex  flex-col items-center justify-center h-full bg-slate-400'>
      <div className=" rounded-xl h-full relative flex items-center justify-center m-2 ">
        <div className="md:w-1/2  flex flex-col items-center justify-center rounded-xl ">
          <p className=" text-center  sm:text-base md:text-2xl text-cyan-400 font-bold w-full">          
           People use Meetup to meet new people, learn new things, find support, get out of their comfort zones, and pursue their passions, together. Membership is free.
          </p>
          <hr/>
             </div>
    
      </div>
      <hr className='bg-white'/>
      <div className='text-center text-white h-12 bg-gray-700 p-3 w-full  font-bold'>
        © 2023 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </div>  
    )
}