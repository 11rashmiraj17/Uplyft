const Coordinator=require("../models/coordinatorsModel")
const bcrypt=require('bcrypt')
const createToken=require('../utils/generateToken')

//**********Learner Registeration***************
const register=async(req,res,next)=>{
    try {
//input variable
        const {name,email,password}=req.body||{ }
        //console.log(name,role,email,password)
//Variable validation
       if(!name||!email||!password)
        {
           return res.status(400).json({error:"All fields are mandatory"})
        }
        //??
        const coordinatorExists=await Coordinator.findOne({email})
        if(coordinatorExists){
            return res.status(400).json({error:"Already existing coordinator"})
        }
//password hashing
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)

//saving to db
         const newCoordinator=new Coordinator({name,email,password:hashPassword})
        const savedCoordinator=await newCoordinator.save()

//remove password and return
        const coordinatorData=savedCoordinator.toObject()
        delete coordinatorData.password
        
        res.status(201).json({message:"Account created",coordinatorData})

        
    } catch (error) {
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
        
    }
}
//****************************login**********************************************************
const login=async(req,res,next)=>{
try{
    const {email,password}=req.body||{ }
       
        //vallidare i/p
        if(!email||!password)
        {
            return res.status(400).json({error:"All fields are mandatory"})
        }
        //check if user exist
        const coordinatorExists=await Coordinator.findOne({email})
        if(!coordinatorExists){
            return res.status(400).json({error:"User not found"})
        }

        //password comparison
        const passwordMatch=await bcrypt.compare(password,coordinatorExists.password)
        if(!passwordMatch)
        {
            return res.status(400).json({error:"Invalid Password"})
        }


        //token creation
        const token=createToken(coordinatorExists._id)
        res.cookie('token',token)
        
        const coordinatorObject=coordinatorExists.toObject() 
        delete coordinatorObject.password
        return res.status(200).json({message:"Login scuccess",coordinatorObject,token})

        
    
    
} catch (error) {
    console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    
}
}

/*************************************Profile**************************************************************/
const profile=async(req,res,next)=>{
try{
        const coordinatorId=req.Coordinator.id

        const coordinatorData=await Coordinator.findById(coordinatorId).select("-password")

       // return res.status(200).json({message:"profile retrieved"})


       return res.status(200).json({data:coordinatorData,message:"profile retrieved"})
    
        
} catch (error) {
    console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
    
}


}
/*************************************Update Profile*******************************************************/
const update=async(req,res,next)=>{
try{
        const coordinatorId=req.Coordinator.id

        const {name,email,password}=req.body||{ }

        const coordinatorData=await Coordinator.findByIdAndUpdate(coordinatorId,{name,email,password},{new:true}).select("-password")

       // return res.status(200).json({message:"profile retrieved"})
        console.log(coordinatorData)

       return res.status(200).json({data:coordinatorData,message:"profile updated"})
    
        
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

module.exports={register,profile,login,update,logout}