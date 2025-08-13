import React from 'react'
import { useState,useEffect } from 'react';

  

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false); 
    useEffect(() => {
         if (darkMode) {
           document.documentElement.classList.add('dark');
         } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

  return (
 <nav className="fixed top-0 left-0 w-full   z-50 bg-base-100 text-base-content shadow-md p-4 ">
     <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
{/*Logo*/}
      <div className="flex shrink-0 items-center w px-8 pt-2 ">
          <img className="h-20 w-auto " src="./images/Logo-removebg-preview.png" alt="Your Company" />
      </div>


{/*Hamburger Button */}        
    <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
          
 {/* Main Nav (Desktop) */}
    <div className="hidden md:flex md:space-x-6 items-center">
          <div className="flex space-x-4 pt-5">             
            <a href="#" className="rounded-md px-3 py-2 text-xl font-medium text-black hover:bg-blue-50 hover:text-grey-300">Explore</a>
            <a href="#" className="rounded-md px-3 py-2 text-xl font-medium text-black hover:bg-blue-50 hover:text-grey-300">Plans and Offers</a>
            <a href="#" className="rounded-md px-3 py-2 text-xl font-medium text-black hover:bg-blue-50 hover:text-grey-300">To Teach</a>
          </div>
    </div>
    <div className="hidden md:flex items-center space-x-4 ml-auto">
          <a href="#" className="mask-radial-at-center ">
            <img className="h-15 w-19 " src="./images/cart-removebg-preview.png"/>
          </a>
          <a href="/Login" className="rounded-md px-3 py-2 text-xl font-medium text-black hover:bg-blue-50 hover:text-grey-300">Login</a>
          <a href="/learner/register" className="rounded-md px-3 py-2 text-xl font-medium text-black hover:bg-blue-50 hover:text-grey-300">Register</a>
  {/* Dark Mode Toggle */}
        <label className="swap swap-rotate">
  {/* this hidden checkbox controls the state */}
       <input type="checkbox" onChange={()=>{
         const newTheme= document.documentElement.getAttribute('data-theme')=== "light"?"dark":"light";
          document.documentElement.setAttribute("data-theme",newTheme)
       }}/>

  {/* sun icon */}
        <svg
          className="swap-on h-10 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

  {/* moon icon */}
        <svg
          className="swap-off h-10 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>

    </div>    
    </div>
  {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-2">
          <a href="#" className="block text-black text-base px-3 py-2 rounded-md hover:bg-blue-50">Explore</a>
          <a href="#" className="block text-black text-base px-3 py-2 rounded-md hover:bg-blue-50">Plans and Offers</a>
          <a href="#" className="block text-black text-base px-3 py-2 rounded-md hover:bg-blue-50">To Teach</a>
          <a href="#" className="block text-black text-base px-3 py-2 rounded-md hover:bg-blue-50">Login</a>
          <a href="#" className="block text-black text-base px-3 py-2 rounded-md hover:bg-blue-50">Register</a>
        </div>
      )}     
 
        

</nav>

  )
}

export default Navbar