require("dotenv").config();
const cors = require("cors");
const path = require("path");
const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);
const express=require('express');
const app=express();
 
const jwt=require('jsonwebtoken');
const {z} = require('zod');

const MONGODB_URL = process.env.MONGODB_URL;
app.use(cors());
app.use(express.json());
app.use("/front", express.static(path.join(__dirname, "../front")));
const PORT = process.env.PORT || 3000;
const { useRouter } = require('./routes/users');
const { useCourses } = require('./routes/courses');
const { useadmin } = require('./routes/admin');
const mongoose=require('mongoose');


app.use('/users',useRouter);
app.use('/admin',useadmin);
app.use('/courses',useCourses)
 
async function main(){
    try{
        await mongoose.connect(MONGODB_URL);
        console.log("connected to database");
        app.listen(PORT,()=>{
            console.log("hosting on ",PORT);
        })
    }catch(e){
        console.error("Failed to connect to the database");
        console.error(e);
    }
}
main()
