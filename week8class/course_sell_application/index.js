const express=require('express');
const app=express();
const JWT_SECRET='JWT_SECRET';
const jwt=require('jsonwebtoken');
const {z} = require('zod');

 


const { useRouter } = require('./routes/users');
const { useCourses } = require('./routes/courses');
const { useadmin } = require('./routes/admin');


app.use('/users',useRouter);
app.use('/admin',useadmin);
app.use('/courses',useCourses)
