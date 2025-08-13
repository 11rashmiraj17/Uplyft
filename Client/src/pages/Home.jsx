import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import About from './About'
import Contact from './Contact'

const Home = () => {
  return (
    <div className='flex flex-col '>
      <div >

    
      <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
      >
    <SwiperSlide>
    <div className="relative w-full h-[70vh]">
      <img src="./images/banner1.jpg" className="w-full h-full object-cover opacity-100 hover:opacity-50 transition-opacity duration-300" />
      <div className="absolute inset-0  flex flex-col justify-center items-center text-white text-center px-4">
        <h2 className="text-4xl font-bold-italic-serif mb-4 text-white">"It is never too late to be what you might have been"</h2>
        <p className="mb-6">View Our Courses</p>
        <button className="bg-gradient-to-r from-teal-400  hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
         Courses
        </button>
      </div>
    </div>
    </SwiperSlide>
  <SwiperSlide>
      <div className="relative w-full h-[70vh]">
        <img src="./images/banner2.jpg" className="w-full h-full object-cover " />
        <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-3xl  font-bold-italic-serif mb-4">Top Plans</h2>
          <button className="bg-gradient-to-r from-teal-400  hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Explore
          </button>
        </div>
      </div>
    </SwiperSlide>
      <SwiperSlide>
      <div className="relative w-full h-[70vh]">
        <img src="./images/banner3.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
          <button className="bg-gradient-to-r from-teal-400  hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Certifications Details
          </button>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="relative w-full h-[70vh]">
        <img src="./images/banner4.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-3xl  font-bold-italic-serif mb-4">Our Faculties</h2>
          <button className="bg-gradient-to-r from-teal-400  hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Explore
          </button>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
    </div>
    <About/>
    <Contact/>
    </div>
  )
}

export default Home