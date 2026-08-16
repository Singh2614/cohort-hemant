// const express = require("express");
// const jwt=require('jsonwebtoken');
// const app = express();
// const JWT_SECRET = "s3cret";
// const {UserModel,TodoModel} =require("./md");
// const mongoose= require('mongoose');
// mongoose.connect('mongodb+srv://hemant14:1A7EihqaZ6Z3tdpL@cluster0.bwzei7r.mongodb.net/hem-10');

// app.use(express.json());

// app.post("/signup", async function(req, res) {
//     const username=req.body.username;
//     const password=req.body.password;
//     const name=req.body.name;

//     await UserModel.create({
//         username:username,
//         password:password,
//         name:name
//     });
//     res.json({message:"you are signed in"});
// });


// app.post("/signin",async function(req, res) {
//     const username=req.body.username;
//     const password=req.body.password;
//     // const name=req.body.name;
    

//     //find in db
//     const response = await UserModel.findOne({
//         username: username,
//         password: password,
//     });
//     console.log(response);
//     if(response){
//         const token=jwt.sign({
//             id:response._id.toString()
//         },JWT_SECRET)
//         res.json({token})

//     }else{
//         res.status(403).json({
//             message:"saale thailandi shai password daal"
//         })
//     }



// });


// app.post("/todo", function(req, res) {

// });


// app.get("/todos", function(req, res) {

// });

// app.listen(3000,()=>{
//     console.log("chudi")
// })
const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);
const express = require("express");
const jwt=require('jsonwebtoken');
const app = express();
const JWT_SECRET = "s3cret";
const {UserModel,TodoModel} =require("./md");
const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://hemant14:1A7EihqaZ6Z3tdpL@cluster0.bwzei7r.mongodb.net/hem-10');

app.use(express.json());


// auth middleware
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


app.post("/signup", async function(req, res) {
    const username=req.body.username;
    const password=req.body.password;
    const name=req.body.name;

    await UserModel.create({
        username:username,
        password:password,
        name:name
    });

    res.json({message:"you are signed in"});
});


app.post("/signin",async function(req, res) {
    const username=req.body.username;
    const password=req.body.password;

    //find in db
    const response = await UserModel.findOne({
        username: username,
        password: password,
    });

    console.log(response);

    if(response){
        const token=jwt.sign({
            id:response._id.toString()
        },JWT_SECRET)

        res.json({token})

    }else{
        res.status(403).json({
            message:"saale thailandi shai password daal"
        })
    }
});


app.post("/todo", function(req, res) {

});


app.get("/todos", function(req, res) {

});


app.listen(3000,()=>{
    console.log("chudi")
})