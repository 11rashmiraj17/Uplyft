const mongoose=require('mongoose')
const successschema=new mongoose.Schema({
leaenerID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Learner'
    },
courseID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
     },
 batchName:{
    type:mongoose.Schema.Types.String,
            ref:'Course'
 },
 profileImage:{
    type:mongoose.Schema.Types.String,
            ref:'Learner'
 },
 comments:{
    type:String,
    required:true
 },
 role:{
    type:String,
    required:true
 },
 companyName:{
    type:String,
    required:true
 }

})
module.exports=mongoose.model('Success',successschema)