const express =require("express");
const app=express();

function middleware(req,res,next){
    const ticket=req.query.ticket;
    if(ticket<=10){
        next();
    }
    else{
        res.send("ticket is not valid you are not allowed to access this page");
    }
    
}



app.get('/first',middleware,function(req,res){
    res.json({
        mark:"you are allowed to access this page 1"
    })
})
app.get("/sec",middleware,function(req,res){
    res.json({
        mark:"you are allowed to access this page 2"
    })
})
app.listen(3001,function(){
    console.log("server is running on port 3001");
})