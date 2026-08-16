// Can you try creating a middleware called auth that verifies if a user is logged in and ends 
// the request early if the user isn’t logged in?
// const axios=require('axios');
const express=require('express');
const app=express();
const users=[];
const JWT_SECRET="JWT_SECRET";
const jwt=require('jsonwebtoken');

app.use(express.json());
app.use(express.static("./full"))
function auth(req,res,next){
    const token=req.headers.token;
    if(token){
        jwt.verify(token,JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    message: "Unauthorized"
                })
            }
            req.user=decode;
            next();
        });
    }
    else{
        return res.status(401).send({
            message: "Unauthorized"
        })
    }
}

app.get('/profile',auth,function(req,res){
    const user=req.user;
    res.send({
        username:user.username
    })

})
app.post('/signin',function(req,res){
    console.log(users);
    const username1=req.body.username;
    const password2=req.body.password;
    for(let a=0;a<users.length;a++){
        if(users[a].username==username1 && users[a].password==password2){
            const token=jwt.sign({
                username:username1
            }, JWT_SECRET);
            
            
            return res.json({token:token})
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

app.get('/me', auth, function(req, res) {
    const username = req.user.username;

    for (let a = 0; a < users.length; a++) {
        if (users[a].username === username) {
            return res.json({
                username: username,
                password:users[a].password
            });
        }
    }

    return res.status(404).json({
        message: "User not found"
    });
});
app.listen(3000,console.log("engin started"));