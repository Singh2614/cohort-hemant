const dns = require("dns");

// Fix MongoDB SRV DNS problem
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();

const JWT_SECRET = "s3cret";

const { UserModel, TodoModel } = require("./t2");

app.use(express.json());
app.use(express.static("./full"));


// =======================
// MONGODB CONNECTION
// =======================

mongoose.connect(
    "mongodb+srv://hemant14:1A7EihqaZ6Z3tdpL@cluster0.bwzei7r.mongodb.net/harru"
)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});


// =======================
// AUTH MIDDLEWARE
// =======================

function auth(req, res, next) {

    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Store decoded JWT data in request
        req.user = decoded;

        next();
    });
}


// =======================
// SIGNUP
// =======================

app.post("/signup", async function(req, res) {

    try {

        const username = req.body.username;
        const password = req.body.password;
        const name = req.body.name;

        const existingUser = await UserModel.findOne({
            username: username
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        await UserModel.create({
            username: username,
            password: password,
            name: name
        });

        res.json({
            message: "You are signed up successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// =======================
// SIGNIN
// =======================

app.post("/signin", async function(req, res) {

    try {

        const username = req.body.username;
        const password = req.body.password;

        const user = await UserModel.findOne({
            username: username,
            password: password
        });

        if (!user) {
            return res.status(403).json({
                message: "Invalid username or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id.toString()
            },
            JWT_SECRET
        );

        res.json({
            token: token
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// =======================
// ME
// =======================

app.get("/me", auth, async function(req, res) {

    try {

        const user = await UserModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            username: user.username,
            name: user.name
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// =======================
// PROFILE
// =======================

app.get("/profile", auth, async function(req, res) {

    try {

        const user = await UserModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            username: user.username,
            name: user.name
        });

    } catch (err) {

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// =======================
// CREATE TODO
// =======================

app.post("/todo", auth, async function(req, res) {

    try {

        const description = req.body.description;

        const todo = await TodoModel.create({
            description: description,
            status: false,
            user_id: req.user.id
        });

        res.json({
            message: "Todo created",
            todo: todo
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// =======================
// GET TODOS
// =======================

app.get("/todos", auth, async function(req, res) {

    try {

        const todos = await TodoModel.find({
            user_id: req.user.id
        });

        res.json({
            todos: todos
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// =======================
// SERVER
// =======================

app.listen(3000, () => {
    console.log("Server started on port 3000");
});