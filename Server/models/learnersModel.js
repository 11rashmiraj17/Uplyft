const mongoose=require('mongoose')
const learnerschema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    role: { type: String,
         default: 'Learner' 
        },
    email:{
         type:String,
        required:true,
        unique:true
    },    
    password:{
        type:String,
        required:true,
       
    },
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    
    phone:{
        type:String,
        required:[true,'Phone number must be added']
    },
    profileImage:{
        type:String,
        default:null

    }
    

})
module.exports=mongoose.model('Learner',learnerschema)