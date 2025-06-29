const mongoose=require('mongoose')
const coordinatorschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role: { type: String, 
        default: 'Coordinator' 
    },
    email:{
         type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        
    },
    courseID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
     },
    mentorID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Mentor'
    },
    leaenerID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Learner'
    }
})
module.exports=mongoose.model('Coordinator',coordinatorschema)
