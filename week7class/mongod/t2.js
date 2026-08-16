const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


// =======================
// USER MODEL
// =======================

const userSchema = new Schema({
    username: String,
    password: String,
    name: String
});


// =======================
// TODO MODEL
// =======================

const todoSchema = new Schema({
    description: String,
    status: Boolean,
    user_id: ObjectId
});


const UserModel = mongoose.model("users", userSchema);

const TodoModel = mongoose.model("todos", todoSchema);


module.exports = {
    UserModel,
    TodoModel
};