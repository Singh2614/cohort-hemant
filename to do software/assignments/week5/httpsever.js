/*
## Assignment #1 - Create an HTTP Server
It should have 4 routes

1. http://localhost:3000/sum/1/2
2. http://localhost:3000/subtract/1/2
3. http://localhost:3000/multiply/1/2
4. http://localhost:3000/divide/1/2
*/

const express=require('express');
const app=express();

middleware=(req,res,next)=>{
    console.log(`Request made to: ${req.url}`);
    next();
}
app.use(middleware);
app.use(express.json());

app.get('/sum/:num1/:num2',function(req,res){
    const num1=parseInt(req.params.num1);
    const num2=parseInt(req.params.num2);
    res.json({ result: num1 + num2 });
});
app.get('/subtract/:num1/:num2',function(req,res){
    const num1=parseInt(req.params.num1);
    const num2=parseInt(req.params.num2);
    res.json({ result: num1 - num2 });
})

app.listen(3002,function(){
    console.log("Server is running on port 3002");
})