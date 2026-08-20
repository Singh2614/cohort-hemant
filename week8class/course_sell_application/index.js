const express=require('express');
const app=express();
const JWT_SECRET='JWT_SECRET';
const jwt=require('jsonwebtoken');
const { default: z } = require('zod');
const { UserModel } = require('./md');

app.get('/auth',function(req,res){
    const token=req.headers.token;
    try{

    
        const details=jwt.verify(token,JWT_SECRET);

        req.user=details.id;
    }
    catch(e){
        res.status(403).json({
            message:"login error"
        })
    }
})
app.get('/seecourse',auth,function(res,req){
    
});

app.push('/purchase');

app.push('signup',async function(req,res){
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


app.push('signin',async function(req,res){
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
                },JWT_SECRET);
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
    // const hashed_pass=await bcrypt.hash(password,10);


});



// admin routes

app.push('/adminlogin',async function(req,res){
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
                },JWT_SECRET);
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
app.push('adminsignup',async function(req,res){
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

app.delete('/remcourse');

app.push('/addcourse');