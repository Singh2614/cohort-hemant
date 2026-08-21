const {Router}=require('express');
const useRouter=Router();
const {userauth}=require('../middlewares/user');
const {JWT_SECRET_USER}="../config";
const {z} = require('zod');
const bcrypt = require("bcrypt");
const { UserModel } = require('../md');
const { CourseModel } = require('../md');
const { PurchaseModel } = require('../md');

useRouter.get('/seecourse',auth,function(res,req){
    const courses = [];

    for (let a of response) {
        const rep = await CourseModel.findOne({
            _id: a.courses_id
        });

        courses.push(rep);
    }
});



useRouter.push('/signup',async function(req,res){
    //zod
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
        await UserModel.create({
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


useRouter.push('/signin',async function(req,res){
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

    
        const response=await UserModel.findOne({
            username:username
        })

        if(response){
            const passwordMatch=await bcrypt.compare(password,response.password);
            if(passwordMatch){
                //generate a token
                const token=jwt.sign({
                    id:response._id.toString()
                },JWT_SECRET_USER);
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
useRouter.push('/purchase',auth,function(req,res){
    const user_i=req.user;
    const course_id=req.headers.course_id;
    await PurchaseModel.create({
        course_id:course_id,
        user_id:user_i
    })
    res.json("course purchased")
    
})

module.exports={
    useRouter:useRouter
}