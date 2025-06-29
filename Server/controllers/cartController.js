const Cart=require("../models/cartModel")
const Course=require("../models/coursesModel")
const bcrypt=require('bcrypt')
const createToken=require('../utils/generateToken')

/**************************************************createCourse**************************************************/
const addCourseToCart=async(req,res,next)=>{
    try{

        const leaenerID=req.leaenerID
         //console.log(leaenerID)
        const {courseID}=req.body

//Find the courses valid or not
        const course=await Course.findById(courseID)
        if(!course){
            return res.status(404).json({message:"Course not found "})
        }

//Find the user's cart or create a new one
        let cart=await Cart.findOne({leaenerID})
       
        if(!cart){
            cart=new Cart({leaenerID,courses:[]})
        }

//check if the course is already in  the cart
        const courseExists=cart.courses.some((item)=>item.courseID.equals(courseID))
        if(courseExists){
            return res.status(404).json({message:"Course already in the cart "})
        }
//Add the course to the cart
        cart.courses.push({courseID,price:course.price,})

//Calculate total prize
        cart.calculateTotalPrice()

//save to db
        await cart.save()


       
       res.status(200).json({
            success:true,
            message:"Course Added to Cart",data:cart
       })
    }
    catch(error){
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    }
}


/*****************Remove from Cart**************************/
const removeCourseFromCart=async(req,res) =>{
        try{
                 const leaenerID=req.leaenerID
                 
        const {courseID}=req.body

//Find the user's cart or create a new one
        let cart=await Cart.findOne({leaenerID})
        if(!cart){
            return res.status(404).json({message:"Cart not found "})
        }
//Remove the course from the cart
        cart.courses=cart.courses.filter(
                (item)=> !item.courseID.equals(courseID)
        )
//Recalculate the total price
        cart.calculateTotalPrice()
        await cart.save()
        res.status(200).json({message:"Course removed from cart"})
        }


        catch(error){
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    }
    
} 

/****************************Display cart Details*****************************/
const getCart =async(req,res)=>{
        try {
                const leaenerID=req.leaenerID
                // console.log(leaenerID)
                const cart=await Cart.findOne({leaenerID}).populate('courses.courseID','title description image price')
               
                if(!cart){
                return res.status(404).json({message:"Cart not found "})
                }
                res.status(200).json({data:cart,message:"Cart details fetched"})
                
                
        } 
        catch(error){
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    }
}

/********************Clear cart*********************/
const clearCart = async(req,res)=>{
        try{
                const learnerId=req.Learner.id
                console.log(learnerId)
              /*  if(!learnerId){
                        return res.status(401).json({success:false,error:"User not authorized"})
                }*/
//Update cart in one operation
                const result=await Cart.updateOne(
                        {learnerId},
                        { $set : {courses:[ ],totalPrice:0}}
                )
                console.log(result)
//Check if cart was found
                if(result.matchedCount === 0){
                        return res.status(200).json({success:true,message:"Cart Cleared"})
                }


        }
        catch(error){
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    }

}
module.exports={addCourseToCart,removeCourseFromCart,getCart,clearCart}