const express=require("express");
const app=express();

/*
Assignment #7 - You have to create a middleware for logging the number of errors on a server

You have been given an express server which has a few endpoints.

Your task is to
1. Ensure that if there is ever an exception, the end user sees a status code of 404
2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint
*/
let errorCount=0;


app.get("/user",function (req, res) {
    // throw an error with message "Some Error"
    throw new Error("Some Error");

    // return a json response with name as john if there is no error in the code execution
    res.status(200).json({ name: "john" });
});
app.get("/errorCount", function (req, res) {
    // return a json response with errorCount variable value
    res.status(200).json({ errorCount });
});

function errorMiddleware(err, req, res, next) {
    // increment the errorCount variable by 1
    errorCount++;
    res.status(404).send({"error:": err.messages});
}

app.use(errorMiddleware);
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
