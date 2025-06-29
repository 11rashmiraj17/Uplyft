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

const getAvgRating=async(req,res)=>{
try{
    const {courseID}=req.body
    console.log(courseID)
//Validate courseid
    if(!courseID){
        return res.status(401).json({success:false,message:'UserCourse ID is required'})
    }

//Find review for the course
    const reviews=await Review.find({courseID})
    if(!reviews.length)
    {
        return res.status(401).json({success:false,message:'No review found for this course'})
    }
//Calculate average rating
    const avgRating=reviews.reduce((sum,review)=>sum + review.rating,0)/reviews.length
    return res.status(201).json({ success:true,data:avgRating})



}
catch(error){
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})

    }





}
module.exports={addReview,getAvgRating}