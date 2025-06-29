const jwt =require('jsonwebtoken')

 const authMentor =(req,res,next)=>{
    try {
    //collect token from cookies
      const {token}=req.cookies
       // console.log(token)
    //no token-unautho
        if(!token){
         return res.status(401).json({message:"User not authorised"})
        }

    //token decode
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY)

    //issue with token
        if(!decodedToken){
             return res.status(401).json({message:"Invalid token"})
        }
       // console.log(decodedToken)

    //check the role
        if(decodedToken.role!="coordinator" && decodedToken.role!="mentor" )
        {
              return res.status(401).json({message:"User not authorised"})
        }
    //attach token to req
        req.Mentor=decodedToken

         next()
        
            
    } catch (error) {
        console.log(error)
        res.status(error.status||500).json({error:error.message||"Internal server error"})
        
    }
 }
 
 module.exports=authMentor