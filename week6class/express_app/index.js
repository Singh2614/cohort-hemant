const express=require('express');
const app=express();
const users=[];
app.use(express.json());
function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}
app.get('/signin',function(req,res){
    console.log(users);
    const username1=req.body.username;
    const password2=req.body.password;
    for(let a=0;a<users.length;a++){
        if(users[a].username==username1 && users[a].password==password2){
            const token=generateToken();
            users[a].token=token;
            console.log(users);
            return res.json({token:token});
        }
    }
    console.log(users);
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
    let user=null;

    for(let a=0;a<users.length;a++){
        if(users[a].token==token){
            user=users[a];
            return res.json({
                username:user.username,
                password:user.password
            });
        }
    }return res.json("asli id se bkl")

})
app.listen(3000,console.log("engin started"));