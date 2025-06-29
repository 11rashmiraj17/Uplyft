const mongoose=require('mongoose')
const courseschema=new mongoose.Schema({
    category:{
        type:String,
        required:[true,'category must be added']
    },
    title:{
        type:String,
        required:[true,'name must br added']
    },
    description:{
        type:String,
        required:true,
        maxLength:300,
        minLength:20
    },
    price:{
        type:Number,
        required:true
    },
    mentorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Mentor'
    },
    image:{
        type:String,
        default:null
    },
    duration:{
        type:String,
        required:true
    }
    
    /*rating:{
        type:String
    },*/
   


},
{
    timestamps:true
}
)
module.exports=mongoose.model('Course',courseschema)