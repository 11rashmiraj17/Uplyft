const express=require('express')
const cartRouter =express.Router()
const authUser=require("../middlewares/authUser")
const {addCourseToCart,removeCourseFromCart,getCart,clearCart}=require("../controllers/cartController")


//add course to cart
cartRouter.post('/addCourse',authUser,addCourseToCart)
//remove course from cart
cartRouter.delete('/remove',authUser,removeCourseFromCart)
//view cart
cartRouter.get('/viewCart',authUser,getCart)
//clear cart
cartRouter.delete('/clearCart',authUser,clearCart)
module.exports=cartRouter