const {Router}=require('express');
const useadmin=Router();

const { adminauth } = require("../middlewares/admin");

// Import the JWT Admin Password from the config file for verification
const { JWT_SECRET_ADMIN } = require("../config");
const jwt = require("jsonwebtoken");
const {z} = require('zod');
const bcrypt = require("bcrypt");
 
const { CourseModel } = require('../md');
const { adminModel } = require('../md');
// admin routes
useadmin.post('/adminlogin',async function(req,res){
    const requireBody=z.object({
        username:z.string().email().max(20).min(5),
        password:z.string().max(20).min(6)
    })

    const parseData=requireBody.safeParse(req.body);

    if(!parseData.success){
        return res.json({message:"erong input format",error:parseData.error});
    }
    const username=parseData.data.username;
    const password=parseData.data.password;
    try{

    
        const response=await adminModel.findOne({
            username:username
        })

        if(response){
            const passwordMatch=await bcrypt.compare(password,response.password);
            if(passwordMatch){
                //generate a token
                const token=jwt.sign({
                    id:response._id.toString()
                },JWT_SECRET_ADMIN);
                return res.json({token:token})
            }else{
                return res.status(403).json({
                    message:"wrong password"
                })
            }
        }
        else{
            return res.status(404).json({
                message:"user didn't exist plz create a new account"
            })
        }
    }
    catch(e){
        return res.status(500).json({
            message: "Error while signing in"
        });
    }
    
});
useadmin.post('/adminsignup',async function(req,res){
    try{
        const requireBody=z.object({
            username:z.string().min(5).max(20).email(),
            password:z.string().min(6).max(20),
            name:z.string().min(3).max(10)

        })
        const parseData=requireBody.safeParse(req.body);

        if(!parseData.success){
            return res.json({message:"input type is wrong ",
                error:parseData.error
            });
        }


        const username=parseData.data.username;
        const password=parseData.data.password;
        const name=parseData.data.name;

        const hashed_pass=await bcrypt.hash(password,10);
        await adminModel.create({
            username:username,
            password:hashed_pass,
            name:name
        })
        res.json("you are sign up");
    }
    catch(e){
        res.status(403).json({
            message:"user already exists"
        })
    }
});

useadmin.delete('/remcourse',adminauth,async function(req,res){
    const courseId=req.body.courseId;
    console.log("courseId:", courseId);
    const response = await CourseModel.deleteOne({
        _id: courseId
    }); 
    console.log("courseId:", courseId);
    if (response.deletedCount === 0) {
        return res.status(404).json({
            message: "Course not found"
        });
    }
    res.json({
        message: "course deleted"
    });
});

useadmin.post('/addcourse',adminauth,async function(req,res){
    const admin_i=req.user;
    const title=req.body.title;
    const discription=req.body.discription;
    const image_url=req.body.image_url;
    const price=req.body.price;
    console.log("yha pe");
    await CourseModel.create({
        
        title:title,
        discription:discription,
        price:price,
        image_url:image_url,
        creater_id:admin_i
    })
    console.log("yha nhi pe");
    res.json("course added");
});
useadmin.get('/showcourse',adminauth,async function(req,res){
    const admin_i=req.user;

    const response=await CourseModel.find({
        creater_id:admin_i
    })
    res.json(response);
});

module.exports={
    useadmin:useadmin
}