const express=require('express')
const reviewRouter=express.Router()
const authUser=require('../middlewares/authUser')
const {addReview,getAvgRating}=require('../controllers/courseReviewController')


//add review
reviewRouter.post('/addReview',authUser,addReview)
//delete
//get course review
//get avg rating of a course
reviewRouter.get('/getAvgRating',authUser,getAvgRating)

module.exports=reviewRouter