const express=require('express')
const coordinatorRouter =express.Router()
const {register,profile,login,update,logout}=require("../controllers/coordinatorController")
const authCoordinator=require("../middlewares/authCoordinator")


coordinatorRouter.post('/register',register)
coordinatorRouter.post('/login',login)
coordinatorRouter.get('/profile',authCoordinator,profile)
coordinatorRouter.patch("/update",authCoordinator,update)
coordinatorRouter.get('/logout',logout)


module.exports=coordinatorRouter