const Mentor=require("../models/mentorsModel")
const Course=require("../models/coursesModel")
const bcrypt=require('bcrypt')
const createToken=require('../utils/generateToken')
const cloudinary=require('../config/cloudinary')

//******************************************Mentor Registeration*******************************************/
const register=async(req,res,next)=>{
    try {
//input variable
        const {name,email,password,qualification,expertseIn,phone,dateOfJoining}=req.body||{ }
        console.log(name,email,password,qualification,expertseIn,phone,dateOfJoining)
//Variable validation
       if(!name||!email||!password||!qualification||!expertseIn||!phone||!dateOfJoining)
        {
           return res.status(400).json({error:"All fields are mandatory"})
        }
//Mentor Exist or not
        const MentorExists=await Mentor.findOne({email})
        if(MentorExists){
            return res.status(400).json({error:"Mentor already exist"})
        }
//password hashing
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)

//saving to db
         const newMentor=new Mentor({name,email,password,qualification,expertseIn,phone,dateOfJoining})
        const savedMentor=await newMentor.save()

//remove password and return
        const mentorData=savedMentor.toObject()
        delete mentorData.password
        
        res.status(201).json({message:"Account created",mentorData})

        
    } catch (error) {
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
        
    }
}

//**********************************************Login******************************************************/
const login=async(req,res,next)=>{
try{
    const {email,password}=req.body||{ }
       
    //vallidare i/p
        if(!email||!password)
        {
            return res.status(400).json({error:"All fields are mandatory"})
        }
    //check if user exist
        const mentorExists=await Mentor.findOne({email})
        if(!mentorExists){
            return res.status(400).json({error:"User not found"})
        }

    //password comparison
        const passwordMatch=await bcrypt.compare(password,mentorExists.password)
        //console.log(mentorExists.password)
       // console.log(password)
        if(passwordMatch)
        {
            return res.status(400).json({error:"Invalid Password"})
        }


    //token creation
        const token=createToken(mentorExists._id,'mentor')
        res.cookie('token',token)
        
        const mentorObject=mentorExists.toObject() 
        delete mentorObject.password
        return res.status(200).json({message:"Login scuccess",mentorObject,token})      
    
} 
catch (error) {
    console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    
}
}

/*************************************Profile**************************************************************/
const profile=async(req,res,next)=>{
try{
        const mentorId=req.Mentor.id

        const mentorData=await Mentor.findById(mentorId).select("-password")

       // return res.status(200).json({message:"profile retrieved"})
        console.log(mentorData)

       return res.status(200).json({data:mentorData,message:"profile retrieved"})
    
        
} catch (error) {
    console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    
}


}

/************************************Update Profle********************************************************/
const update=async(req,res,next)=>{
try{
        const mentorId=req.Mentor.id

        const {name,email,password,qualification,expertseIn,phone,dateOfJoining}=req.body||{ }

        const mentorData=await Mentor.findByIdAndUpdate(mentorId,{name,email,password,qualification,expertseIn,phone,dateOfJoining},{new:true}).select("-password")

       // return res.status(200).json({message:"profile retrieved"})
       // console.log(learnerData)

       return res.status(200).json({data:mentorData,message:"profile updated"})
    
        
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

/**************************************************GET mentor**************************************************/
const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }
    res.status(200).json({ success: true, data: mentor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



module.exports={register,login,logout,profile,update,getMentorById}