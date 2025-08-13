const express=require('express')
const reviewRouter=express.Router()
const authUser=require('../middlewares/authUser')
const {addReview,getAllAvgRatings,getReviewsByCourseId}=require('../controllers/courseReviewController')


//add review
reviewRouter.post('/addReview',authUser,addReview)
//delete
reviewRouter.get('/getAllRating',getAllAvgRatings)
reviewRouter.get('/reviews/:id', getReviewsByCourseId);
module.exports=reviewRouter