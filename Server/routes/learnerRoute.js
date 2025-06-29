const express=require('express')
const learnerRouter =express.Router()
const {register,login,profile,logout,update,deleteLearner}=require("../controllers/learnerController")
const authUser=require("../middlewares/authUser")
const authCoordinator=require("../middlewares/authCoordinator")
//Signup
learnerRouter.post('/register',register)
//login
learnerRouter.post('/login',login)
//logout
learnerRouter.get('/logout',logout)
//profile 
learnerRouter.get('/profile',authUser,profile)
//profile update
learnerRouter.patch("/update",authUser,update)
//delect account
learnerRouter.delete("/delete/:learnerId",authCoordinator,deleteLearner)



module.exports=learnerRouter