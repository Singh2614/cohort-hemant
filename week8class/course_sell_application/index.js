const express=require('express');
const app=express();
const JWT_SECRET='JWT_SECRET';
const jwt=require('jsonwebtoken');
const {z} = require('zod');
const { UserModel } = require('./routes/md');

const { useRouter } = require('./routes/users');
const { useCourses } = require('./routes/courses');
const { useadmin } = require('./routes/admin');


app.use('/users',useRouter);
app.use('/admin',useadmin);
app.use('/courses',useCourses)
function auth(req,res,next){
    const token=req.headers.token;
    try{

    
        const details=jwt.verify(token,JWT_SECRET);

        req.user=details.id;
        next
    }
    catch(e){
        res.status(403).json({
            message:"login error"
        })
    }
}
// admin routes

 