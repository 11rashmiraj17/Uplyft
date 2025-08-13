const courseReview=require("../models/reviewCourseModel")
const bcrypt=require('bcrypt')
const createToken=require('../utils/generateToken')
const Course=require('../models/coursesModel')
const Review=require("../models/reviewCourseModel")

const  addReview=async(req,res) => {
    try{
        const {courseID,rating,comment} = req.body
        const leaenerID=req.Learner.id

//validate mandatory fields

//Validate user
    if(!leaenerID){
        return res.status(401).json({success:false,message:'User not Authorized'})
    }

//Validate if the course exists
    const course=await Course.findById(courseID)
    if(!course){
        return res.status(401).json({success:false,message:'Course not found'})
    }
//Validate rating
    if(rating<1|| rating>5){
        return res.status(401).json({success:false,message:'Rating must be 1 to 5'})
    }
//only purchased learner can review

//Create or Update the review
const review =await Review.findOneAndUpdate(
    {leaenerID,courseID},
    {rating,comment},
    {new:true,upsert:true}
)
console.log(review)
return res.status(201).json({ success:true,data:review})

    }
    catch(error){
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})

    }

}
/******************************Rating***************************************/
const getAllAvgRatings = async (req, res) => {
  try {
    // Fetch all reviews
    const reviews = await Review.find();

    if (!reviews.length) {
                    return res.status(200).json({
                                 success: true,
                                    data: []
                                    });
    }

    // Group ratings by courseID
    const ratingMap = {};
    reviews.forEach(review => {
      if (!ratingMap[review.courseID]) {
        ratingMap[review.courseID] = { sum: 0, count: 0 };
      }
      ratingMap[review.courseID].sum += review.rating;
      ratingMap[review.courseID].count += 1;
    });

    // Calculate average for each course
    const avgRatings = Object.keys(ratingMap).map(courseID => ({
      courseID,
      avgRating: ratingMap[courseID].sum / ratingMap[courseID].count
    }));

    return res.status(200).json({
      success: true,
      data: avgRatings
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

const getReviewsByCourseId = async (req, res) => {
  try {
    const courseID = req.params.id;

    // 1. Check if course exists
              const courseExists = await Course.findById(courseID);
              if (!courseExists) {
                return res.status(404).json({
                  success: false,
                  message: "Course not found",
                  data: []
                });
              }

    // 2. Fetch reviews for this course
    const reviews = await Review.find({ courseID })
                .populate("leaenerID", "name email") // populate learner info if needed
                .select("rating comment createdAt"); // only select needed fields

              return res.status(200).json({
                success: true,
                data: reviews
              });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching reviews",
      data: []
    });
  }
}



module.exports={addReview,getAllAvgRatings,getReviewsByCourseId}