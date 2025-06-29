const mongoose=require('mongoose')
const cartschema=new mongoose.Schema({
    leaenerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Learner'
    },
    courses:[
        {
        courseID:{
         type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
         },
        price:{
            type:mongoose.Schema.Types.Number,
            ref:'Course'
        },
    }],
    totalPrice:{
        type:Number,
        required:true,
        default:0
    }
},
    
    {timestamps:true})
    cartschema.methods.calculateTotalPrice=function(){
        this.totalPrice=this.courses.reduce((total,course)=>total+course.price,0)
    }



module.exports=mongoose.model('Cart',cartschema)