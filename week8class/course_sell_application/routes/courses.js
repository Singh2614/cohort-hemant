const {Router}=require('express');
const useCourses=Router();
useCourses.post('/purchase',async function(req,res){
    
    await CourseModel.create({
        discription:req.body.discription,
        
    })
    res.json({
        message:"course added"
    })
});

module.exports={
    useCourses:useCourses
}