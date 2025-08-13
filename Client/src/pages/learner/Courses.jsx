import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { api } from '../../config/axiosInstence'
import { useNavigate } from 'react-router-dom';


const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
   
const fetchData = async () => {
  try {
    const response = await api({ method: "GET", url: '/course/allcourses' });
    const coursesData = response?.data?.data || [];

    const ratingRes = await api.get('/courseReview/getAllRating');
      const allRatings = ratingRes?.data?.data || []; // array of {courseID, avgRating}

const coursesWithRatings = coursesData.map(course => {
  const ratingObj = allRatings.find(r => r.courseID === course._id);
  return { ...course, avgRating: ratingObj ? ratingObj.avgRating : null };
});

    /*const coursesWithRatings = await Promise.all(
      coursesData.map(async (course) => {
        try {
        const ratingRes = await api.get('/courseReview/getAllRating', {
                  params: { courseID: course._id }
                });
          const avgRating = ratingRes.data.data?.avgRating ?? null;
          return { ...course, avgRating };
        } catch {
          return { ...course, avgRating: null };
        }
      })
    );*/

    setCourses(coursesWithRatings);
  } catch (error) {
    console.log(error);
  }
};

    useEffect(()=>{
            fetchData()
        },[])


  return (
    <div className="p-4 ">
  <h2 className="text-2xl font-bold mb-4">Courses</h2>

  {courses.length === 0 ? (
    <p>No courses found.</p>
  ) : (
    <div className="flex flex-wrap gap-4 justify-center">
      {courses.map((course) => (
        <motion.div
           key={course._id}
              className="card bg-base-100 w-96 shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
              transition={{ duration: 0.3 }}
        >
 {/*   <h4 className="card-title text-3xl font-poppins">{course.category}</h4>   */}

          <figure className='pt-4 rounded-md'>
            <img
              src={course.image}
              alt="Course Images"
            />
          </figure>
          <div className="card-body">
            
            <h3 className="card-title">{course.title}</h3>
             {/* Star Rating */}
                   <p>⭐⭐⭐⭐⭐ <b>{course.avgRating != null ? course.avgRating.toFixed(1) : 'No ratings yet'}</b></p>
                    {console.log(course.avgRating)}
                    
             

              <div className="card-actions flex justify-between items-center w-full">
                <button className="flex items-center gap-2 bg-blue-400 hover:text-white px-3 py-2 rounded-lg transition">
                Add to Cart    
                </button>
              <button   className="btn  bg-blue-400 px-3 py-2 rounded-lg  hover:text-white"
                    onClick={() => navigate(`/learner/courses/${course._id}`)}
                >
                 Read More
                 </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )}
</div>






        )
}

export default Courses