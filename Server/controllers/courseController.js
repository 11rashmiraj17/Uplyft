const Mentor=require("../models/mentorsModel")
const Course=require("../models/coursesModel")
const bcrypt=require('bcrypt')
const createToken=require('../utils/generateToken')
const cloudinary=require('../config/cloudinary')
const Review=require("../models/reviewCourseModel")


const createCourse=async(req,res,next)=>{
    try{

        const {category,title,description,price,duration}=req.body||{ }
        if(!category||!title||!description||!price||!duration)
        {
            return res.status(400).json({error:"Required fields are missing...!"})
        }
//console.log("Uploader object:", cloudinary.uploader);
//take file detailes from multer
        const file=req.file
       
 //Check if file is uploaded
        if (!file) {
            return res.status(400).json({ error: "Image file is missing!" });
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(file.path)

        const mentorId=req.Mentor.id
        const newCourse= new Course({category,title,description,price,duration,image:cloudinaryResponse.url,mentorID:mentorId})
        await newCourse.save()
       res.status(200).json({
            success:true,
            message:"Course Created Successfully",data:newCourse
       })
    }
    catch(error){
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    }
}

/***********************************************View course***********************************************/

  const getAllCourses = async (req, res) => {
try {
    // Get all courses
      const courses = await Course.find();

    // For each course, calculate avgRating
          const coursesWithRatings = await Promise.all(
            courses.map(async (course) => {
              const reviews = await Review.find({ courseID: course._id });

              let avgRating = 0;
              if (reviews.length > 0) {
                avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
              }

              return {
                ...course.toObject(),
                avgRating: avgRating.toFixed(1), // 1 decimal place
              };
            })
          );

          res.status(200).json({
            success: true,
            data: coursesWithRatings,
          });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }

  /*try {
    const courses = await Course.find();
    res.status(200).json({ data: courses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

  
  try {
    const mentorId = req.Mentor.id;
    const courses = await Course.find({ mentorID: mentorId });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
  */
  }


const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const mentorId = req.Mentor.id; 

    const { category, title, description, price, duration } = req.body;

    // Find course and check ownership
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (course.mentorID.toString() !== mentorId) {
      return res.status(403).json({ error: "Unauthorized to update this course" });
    }

    // Handle image update if a file was uploaded
    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
      course.image = cloudinaryResponse.url;
    }

    // Update fields if provided
    if (category) course.category = category;
    if (title) course.title = title;
    if (description) course.description = description;
    if (price) course.price = price;
    if (duration) course.duration = duration;

    await course.save();

    res.status(200).json({ success: true, message: "Course updated", data: course });

  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({ error: "Failed to update course" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports={createCourse,updateCourse,getAllCourses,getCourseById}