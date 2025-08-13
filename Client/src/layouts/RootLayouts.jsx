import React from 'react'
import Navbar from '../component/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'



 
const RootLayouts = () => {
 

  return (
    
   <div className='min-h-screen flex flex-col'>
      <Navbar />
      
        <main className='w-full p-4 flex-grow'>
         <Outlet />
       
        </main>
      
      <Footer />
    </div>
    
  )
}

export default RootLayouts