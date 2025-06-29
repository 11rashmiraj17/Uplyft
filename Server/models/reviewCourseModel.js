const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
leaenerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Learner',
        required:[true,'Learner Id is required']
    },
courseID:{
    type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:[true,'Course Id is required']
},
rating:{
    type:Number,
    required:[true,'Rating is required'],
    min:1,
    max:5,
},
comment:{
    type:String,
    required:[true,'Comment is required'],
    trim:true

},
createdAt:{
    type:Date,
    default:Date.now
}

})
module.exports=mongoose.model('Review',reviewSchema)