const {Router}=require('express');
const useCourses=Router();
    useCourses.push('/purchase',auth,function(req,res){
        const user_id=req.user;
        await CourseModel.create({
            discription:req.body.discription,
            user_id:user_id
        })
        res.json({
            message:"course added"
        })
    });

module.exports={
    useCourses:useCourses
}