const express=require('express')
const courseRouter =express.Router()
const  authMentor=require("../middlewares/authMentor")
const upload=require("../middlewares/multer")

const {createCourse,getAllCourses,updateCourse,getCourseById}=require('../controllers/courseController')


courseRouter.post('/addCourse',authMentor,upload.single('image'),createCourse)
courseRouter.get('/allCourses',getAllCourses);
courseRouter.patch('/updateCourse/:id', authMentor, upload.single('image'), updateCourse);
courseRouter.get('/:id',getCourseById);





module.exports=courseRouter