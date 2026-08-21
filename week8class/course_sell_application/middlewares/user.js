const jwt=require('jsonwebtoken');
const {JWT_SECRET_USER}=require('./config');

function userauth(req,res,next){
    const token=req.headers.token;
    try{

    
        const details=jwt.verify(token,JWT_SECRET_USER);

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
    userauth
}