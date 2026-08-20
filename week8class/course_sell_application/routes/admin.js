const {Router}=require('express');
const useadmin=Router();
// admin routes

    useadmin.push('/adminlogin',async function(req,res){
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
    useadmin.push('/adminsignup',async function(req,res){
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

    useadmin.delete('/remcourse',auth,function(req,res){
        const 
    });

    useadmin.push('/addcourse',auth,function(req,res){
        const 
    });

module.exports={
    useadmin:useadmin
}