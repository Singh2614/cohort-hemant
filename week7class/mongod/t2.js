//schema

const mongoose=require('mongoose');

//objectid
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const user=new Schema({
    username:String,
    password:String,
    name:String

})

const todo=new Schema({
    discription:String,
    status:Boolean,
    user_id:ObjectId
})

const UserModel=mongoose.model('users',user);
const TodoModel=mongoose.model('todos',todo);
module.exports={
    UserModel,
    TodoModel
}
