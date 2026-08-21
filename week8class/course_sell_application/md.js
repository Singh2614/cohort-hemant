const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const user =new Schema({
    username:String,
    password:String,
    name:String
})

const courses=new Schema({
    title:String,
    discription:String,
    price:Number,
    image_url:String,
    creater_id:ObjectId
}) 
const admin =new Schema({
    username:String,
    password:String,
    name:String
})
const purchase=new Schema({
    
    user_id:ObjectId,
    courses_id:ObjectId
}) 
const UserModel=mongoose.model('user',user);
const adminModel=mongoose.model('admin',admin);
const CourseModel=mongoose.model('course',courses);
const PurchaseModel=mongoose.model('purchase',purchase);

module.exports={
    UserModel:UserModel,
    adminModel:adminModel,
    CourseModel:CourseModel,
    PurchaseModel:PurchaseModel
}