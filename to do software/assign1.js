const express = require("express");
const app=express();

// Assignment #5 - You have to create a middleware for logging the number of requests on a server

// You have been given an express server which has a few endpoints.

// Your task is to create a global middleware (app.use) which will maintain a count of the number of 
// requests made to the server in the global requestCount variable
let requestCount=0;

function middleware(req, res, next) {
    requestCount++;
    next();
}

app.use(middleware);
const users = [];
app.use(express.json());
app.get('/', function(req, res) {
    // 
    res.json({
        requestCount: requestCount
    },users);
    

});
app.get('/user', function(req, res) {
    res.status(200).json(users);
    res.json({
        requestCount: requestCount
    });
});

app.post('/user', function(req, res) {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

app.put('/user', function(req, res) {
    if(users[0]?.name===req.body.name){
        users[0].name=req.body.cname;
        res.status(201).json(users);
    }
    else{
        res.status(404).json({ message: "User not found" });
    }
});

app.delete('/', function(req, res) {
    res.json({
        requestCount: requestCount
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
