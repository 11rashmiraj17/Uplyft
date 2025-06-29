const Learner=require("../models/learnersModel")
const bcrypt=require('bcrypt')
const createToken=require('../utils/generateToken')

//***************************************Learner Registeration********************************************/
const register=async(req,res,next)=>{
    try {
//input variable
        const {name,role,email,password,phone,profileImage}=req.body||{ }
        
//Variable validation
       if(!name||!email||!password||!phone)
        {
           return res.status(400).json({error:"All fields are mandatory"})
        }
        //??
        const LearnerExists=await Learner.findOne({email})
        if(LearnerExists){
            return res.status(400).json({error:"User already exist"})
        }
//password hashing
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)

//saving to db
         const newLearner=new Learner({name,role,email,password:hashPassword,profileImage,phone})
        const savedLearner=await newLearner.save()

//remove password and return
        const learnerData=savedLearner.toObject()
        delete learnerData.password
        
        res.status(201).json({message:"Account created",learnerData})
    }

        
     catch (error) {
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
        
    }
}
//******************************************Login**********************************************************/
const login=async(req,res,next)=>{
try{
    const {email,password}=req.body||{ }
       
        //vallidare i/p
        if(!email||!password)
        {
            return res.status(400).json({error:"All fields are mandatory"})
        }
        //check if user exist
        const learnerExists=await Learner.findOne({email})
        if(!learnerExists){
            return res.status(400).json({error:"User not found"})
        }

        //password comparison
        const passwordMatch=await bcrypt.compare(password,learnerExists.password)
        if(!passwordMatch)
        {
            return res.status(400).json({error:"Invalid Password"})
        }


        //token creation
        const token=createToken(learnerExists._id,'learner')
        res.cookie('token',token)
        
        const learnerObject=learnerExists.toObject() 
        delete learnerObject.password
        return res.status(200).json({message:"Login scuccess",learnerObject,token})

        
    
    
} catch (error) {
    console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    
}
}


/*************************************Profile**************************************************************/
const profile=async(req,res,next)=>{
try{
        const learnerId=req.Learner.id

        const learnerData=await Learner.findById(learnerId).select("-password")

       // return res.status(200).json({message:"profile retrieved"})


       return res.status(200).json({data:learnerData,message:"profile retrieved"})
    
        
} catch (error) {
    console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    
}


}

/************************************Update Profle********************************************************/
const update=async(req,res,next)=>{
try{
        const learnerId=req.Learner.id

        const {name,email,password,phone,profileImage}=req.body||{ }

        const learnerData=await Learner.findByIdAndUpdate(learnerId,{name,email,password,phone,profileImage},{new:true}).select("-password")

       // return res.status(200).json({message:"profile retrieved"})
        console.log(learnerData)

       return res.status(200).json({data:learnerData,message:"profile updated"})
    
        
} catch (error) {
    console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    
}


}
/***************************************************Delete Leaner*****************************************/
const deleteLearner=async(req,res,next)=>{
try{
        const learnerId=req.params
        if(!learnerId)
        {
             return res.status(400).json({error:"Learner ID required"})
        }

        const learnerData=await Learner.findByIdAndDelete(learnerId)
        if(!learnerData)
        {
            return res.status(400).json({error:"Learner not found"})
        }


       return res.status(200).json({deleteLeaner:learnerData._id,message:"Learner deleted"})
    
        
} catch (error) {
    console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    
}


}
/**************************************************Logout**************************************************/
const logout=async(req,res,next)=>{
    try{
        res.clearCookie("token")
        res.status(200).json({
                success:true,
                message:"Logout Successfully",
        })
    }
    catch(error){
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    }
}
module.exports={register,login,profile,logout,update,deleteLearner}