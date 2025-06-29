const mongoose=require('mongoose')
const mentorschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role: { type: String,
         default: 'Mentor'
         },
    qualification:{
        type:String,
        required:[true,'Qualification must be added']
    },
    expertseIn:{
        type:String,
        required:true
    },
  /*  rating:{
        type:String
    },*/
    email:{
         type:String,
        required:true,
        unique:true
    },    
    password:{
        type:String,
        required:true,
        
    },
    phone:{
        type:String,
        required:[true,'Phone number must be added']
    },
    dateOfJoining:{
        type:String,
         default:Date.now
    },
    

    
})
module.exports=mongoose.model('Mentor',mentorschema)