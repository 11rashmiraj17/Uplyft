import React from 'react'
import { Link } from 'react-router-dom';

const LearnerDashboard = () => {
  return (
    <div className='pt-0'>
      
      <div className="relative w-full h-[70vh] ">
         <img src="./images/learner_banner.jpg" className="w-full h-full object-cover " />
         <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
           <Link  to="/learner/courses"
              className="bg-orange-300 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            >
            View All Courses
          </Link>
        </div>
      </div>

    </div>
  )
}

export default LearnerDashboard