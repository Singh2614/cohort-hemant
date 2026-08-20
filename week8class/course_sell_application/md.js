const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const user =new Schema({
    username:String,
    password:String,
    name:String
})

const courses=new Schema({
    discription:String,
    user_id:ObjectId
}) 
const admin =new Schema({
    username:String,
    password:String,
    name:String
})
const purchase=new Schema({
    discription:String,
    user_id:ObjectId
}) 