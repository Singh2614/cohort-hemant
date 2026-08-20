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
const bcrypt=require('bcrypt');
const {z}=require('zod');
mongoose.connect('');


app.use(express.json());

app.post('/signin',async function(req,res){
    const requireBody=({
        username:z.string().min(5).max(20).email(),
        password:z.string().min(6).max(10),
        

    })
    const parseDataWithSuccess=requireBody.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        return res.json({
            message:"wrong data format",
            error:parseDataWithSuccess.error,
        })
    }
    const username=parseDataWithSuccess.data.username;
    const password=parseDataWithSuccess.data.password;
    
    
    const response=await UserModel.findOne({
        username:username,
        
    })
    
    if(response){
        const passwordMatch = await bcrypt.compare(password, response.password);
        if(passwordMatch){
            //generate token
            const token=jwt.sign({
                id:response._id.toString()
            },JWT_SECRET);
            res.json({
                token:token
            })
        }else{
            res.status(403).json({
                message:"bhul gya bc"
            })
        }
        
        
    }
    else{
        res.status(403).json({
            message:"tu registered hi nhi hai lode"
        })
    }

})
app.post('/signup',async function(req,res){
    const requireBody=z.object({
        username:z.string().min(5).max(20).email(),
        password:z.string().min(6).max(10),
        name:z.string().min(3).max(10)

    })
    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        return res.json({
            message:"wrong data format",
            error:parseDataWithSuccess.error,
        });
    }
    const username = parseDataWithSuccess.data.username;
    const password = parseDataWithSuccess.data.password;
    const name = parseDataWithSuccess.data.name;

    try{
        const hashed_password=await bcrypt.hash(password,6);
        await UserModel.create({
            username:username,
            
            password:hashed_password,//hash+salt
            name:name
        })

        res.json({message:"you are signed in"});
    }catch(e) {
        console.log("kisi ne use kr rkha isse to phele se hi")
        res.status(500).json({
            message: "Error while signing up"            
        })
    }
    

    
})
app.get('/me',auth,async function(req,res){
    const userid=req.lambda;
    const value_u=await UserModel.findOne({
        _id:userid
    })
    res.json(value_u);
    

})
function auth(req, res, next) {
    const token = req.headers.token;

    try {
        const details = jwt.verify(token, JWT_SECRET);

        req.lambda = details.id;

        next();

    } catch (err) {
        res.status(403).json({
            message: "gaand maar gyi lund k beej"
        });
    }
}
app.post('/todo',auth,async function(req,res){
    //we will recieve a token and then we can go
    const userid=req.lambda;
    const value=await TodoModel.findOne({
        user_id:userid
    })
    const discription=req.body.discription;
    const status=req.body.status;
    const user_id=req.body.user_id;
    await TodoModel.create({
        discription:discription,
        status:status,
        user_id:user_id
    })
    res.json("to do created")
    
})
app.get('/todos',auth,async function(req,res){
    const userid=req.lambda;
    const value=await TodoModel.find({
        user_id:userid
    })
    res.json(value)
})

app.listen(3001,()=>{
    console.log('3001 chalu hai')
})
