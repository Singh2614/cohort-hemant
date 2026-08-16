const express=require('express');
const JWT_SECRET="JWT_SECRET";
const jwt = require('jsonwebtoken');
const app=express();
const users=[];
app.use(express.json());

app.get('/signin',function(req,res){
    console.log(users);
    const username1=req.body.username;
    const password2=req.body.password;
    for(let a=0;a<users.length;a++){
        if(users[a].username==username1 && users[a].password==password2){
            const token=jwt.sign({
                username:username1
            }, JWT_SECRET);
            
            return res.json({token:token});
        }
    }
    
    return res.status(403).send({message:"chud gi ma"})
    
    

})
app.post('/signup',function(req,res){
    const body=req.body;
    const username=req.body.username;
    const password=req.body.password;
    users.push({username,password});
    res.send(users);

})

app.get('/me',function(req,res){
    const token=req.headers.token;
    const user_details=jwt.verify(token,JWT_SECRET);
    const username=user_details.username;
    

    for(let a=0;a<users.length;a++){
        if(users[a].username==username){
            return res.json({
                username:users[a].username,
                password:users[a].password
            });
        }
    }return res.json("asli id se bkl")

})
app.listen(3000,console.log("engin started"));