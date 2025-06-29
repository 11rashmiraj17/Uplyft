const express=require('express')
const mentorRouter =express.Router()
const {register,login,logout,profile,update,createCourse}=require("../controllers/mentorController")
const  authMentor=require("../middlewares/authMentor")
const upload=require("../middlewares/multer")



mentorRouter.post('/register',register)

mentorRouter.post('/login',login)
mentorRouter.get('/logout',logout)
mentorRouter.get('/profile',authMentor,profile)
mentorRouter.patch("/update",authMentor,update)
mentorRouter.post('/course',authMentor,upload.single('image'),createCourse)





module.exports=mentorRouter
