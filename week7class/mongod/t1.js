const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);
const express=require('express');
const { UserModel,TodoModel } = require('./md');
const app=express();
const jwt=require('jsonwebtoken');
const JWT_SECRET='harikirat';
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://hemant14:1A7EihqaZ6Z3tdpL@cluster0.bwzei7r.mongodb.net/hem-11');


app.use(express.json());

app.post('/signin',async function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    const response=await UserModel.findOne({
        username:username,
        password:password
    })
    if(response){
        //generate token
        const token=jwt.sign({
            id:response._id.toString()
        },JWT_SECRET);
        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"tu registered hi nhi hai lode"
        })
    }

})
app.post('/signup',async function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    const name=req.body.name;

    await UserModel.create({
        username:username,
        password:password,
        name:name
    })

    res.json({message:"you are signed in"});

    
})
app.get('/me',function(req,res){
    

})
app.post('/todo',function(req,res){
    
})
app.get('/todos',function(req,res){
    
})
app.listen(3001,()=>{
    console.log('3001 chalu hai')
})