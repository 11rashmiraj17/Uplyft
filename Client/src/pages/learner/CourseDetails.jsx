import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../config/axiosInstence';
import { useNavigate } from 'react-router-dom';



const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const courseRes = await api.get(`/course/${id}`);
        setCourse(courseRes.data.data);

        if (courseRes.data.data?.mentorID) {
          const mentorRes = await api.get(
            `/mentor/${courseRes.data.data.mentorID}`
          );
          setMentor(mentorRes.data.data);
        }

        const reviewsRes = await api.get(`/courseReview/reviews/${id}`);
        if (!reviewsRes.data?.success) {
          console.warn(reviewsRes.data?.message || 'No reviews found');
        } else {
          setReviews(reviewsRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };



    fetchAllData();
  }, [id]);

const handleAddToCart = async () => {
  
   try {
   await api.post('/cart/addCourse', {
  learnerID,
  courseID: courseId
});
    alert(res.data.message);
  } catch (err) {
    console.error(err);
  }
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <section className="font-sans">
      <div className="bg-blue-400 w-full mx-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="md:flex-1 pl-10 pt-4">
          <p className="mb-2 font-semibold">Branch: {course.category}</p>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <h4 className="font-semibold mb-4">
            Created By: {mentor?.name || 'No mentor assigned'}
          </h4>
          <h3 className="font-semibold mb-4">
            Created Date: {new Date(course.createdAt).toLocaleDateString()}
          </h3>
        </div>
        <div className="md:flex-1">
          {course?.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-60 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
              No Image Available
            </div>
          )}
        </div>
      </div>

      <div className="pl-16 pt-4 flex flex-col md:flex-row flex-wrap gap-6">
        {/* Ensures wrapping and stacking */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400 block md:table">
              <thead className="block md:table-header-group">
                <tr className="border md:border-none block md:table-row">
                  <th className="p-2 font-medium text-left md:border md:border-gray-300 block md:table-cell">
                    Course Description
                  </th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                <tr className="bg-gray-100 border md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 block md:table-cell text-black dark:text-black">
                    {course.description}
                  </td>
                </tr>
                <tr className="bg-gray-100 border md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 block md:table-cell text-black dark:text-black">
                    Course Duration: {course.duration}
                  </td>
                </tr>
                <tr className="bg-gray-100 border md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-gray-300 block md:table-cell text-black dark:text-black">
                    Price: ₹{course.price}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-6 flex flex-col md:flex-row gap-8 w-full">
              <button className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg text-lg"
                      onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-lg">
                Buy Now
              </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
