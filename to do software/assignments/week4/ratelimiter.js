const express = require("express");
const app = express();

let pressed = {};

function reset() {
    pressed = {};
}

setInterval(reset, 1000);

function middleware(req, res, next) {
    const userId = req.headers["user-id"];

    if (pressed[userId]) {
        if (pressed[userId] >= 1) {
            res.status(404).send("No Entry!");
        }
        pressed[userId]++;
    } else {
        pressed[userId] = 1;
        next();
    }

   
}

app.get("/first", middleware, function (req, res) {
    res.send("Hello");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});