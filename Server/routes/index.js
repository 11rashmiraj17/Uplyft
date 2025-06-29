const express=require('express')
const router=express.Router()

const learnerRouter=require('./learnerRoute')
const mentorRouter=require("./mentorRoutes")
const coordinatorRouter=require("./coordinatorRoutes")
const cartRouter=require('./cartRoutes')
const reviewRouter=require('./reviewCourseRoutes')

// ./api/learner
router.use('/learner',learnerRouter)
router.use("/mentor",mentorRouter)
router.use("/coordinator",coordinatorRouter)
router.use('/cart',cartRouter)
router.use('/courseReview',reviewRouter)


module.exports=router