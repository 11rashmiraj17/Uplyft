import React from 'react'

const TredingCourses = () => {
  return (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
    <img class="h-48 w-full object-cover" src="./images/banner1.jpg" alt="Course Image"/>
    <div class="p-4 space-y-2">
      <h2 class="text-xl font-semibold text-gray-800">Branch Name: Computer Science</h2>
      <p class="text-gray-700">Course: Full Stack Development</p>
      <p class="text-green-600 font-medium">Price: ₹15,000</p>
      <p class="text-sm text-gray-500">Duration: 3 Months</p>
    </div>
  </div>
  
</div>

  )
}

export default TredingCourses