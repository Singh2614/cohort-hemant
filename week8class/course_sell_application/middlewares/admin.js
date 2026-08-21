const jwt=require('jsonwebtoken');
const {JWT_SECRET_ADMIN}=require('./config');

function adminauth(req,res,next){
    const token=req.headers.token;
    try{

    
        const details=jwt.verify(token,JWT_SECRET_ADMIN);

        req.user=details.id;
        next
    }
    catch(e){
        res.status(403).json({
            message:"login error"
        })
    }
}
module.exports={
    adminauth
}