const express=require('express')
const mentorRouter =express.Router()
const {register,login,logout,profile,update,getMentorById}=require("../controllers/mentorController")
const  authMentor=require("../middlewares/authMentor")
//const upload=require("../middlewares/multer")



mentorRouter.post('/register',register)

mentorRouter.post('/login',login)
mentorRouter.get('/logout',logout)
mentorRouter.get('/profile',authMentor,profile)
mentorRouter.patch("/update",authMentor,update)
mentorRouter.get('/:id', getMentorById);



module.exports=mentorRouter
