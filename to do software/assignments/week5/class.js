const express=require("express");
const app=express();
app.get('/users',async function(req,res){
    const response=await fetch("https://jsonplaceholder.typicode.com/users");
    const value = await response.json();

    res.json(value);
}) 
app.listen(3002,function(){
    console.log("listen on port 3002");
});