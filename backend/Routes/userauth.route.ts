import  Redis  from 'ioredis';
import express from 'express';

import _jsonwebtoken from "jsonwebtoken";

import _bcrypt from "bcrypt";

import UserModel from '../models/user.model';
import { Model } from 'mongoose';

let UserRouter=express.Router()

UserRouter.get("/",async(req,res)=>{
    res.json("welcome to user router")
})

const redis=new Redis()




UserRouter.post("/login",async(req,res)=>{
  let {email,password} = req.body
  let loader=await UserModel.find({email})

  let hashedpassword:String|any= loader?.password

  try {
    // load the hashed password
    

  } catch (error) {
    
  }  
})


UserRouter.post("/signup",async (req,res)=>{

let {email,password,name,age}=req.body


let loaddatafromdb = await UserModel.findOne({email})

try {
if(loaddatafromdb){
return  res.json({message:"user already exists"})

}else{
    // query is a instance of usermodel
let hashedpassword:String =_bcrypt.hashSync(password,10)
let query = new UserModel({email,password:hashedpassword,name,age})
await query.save()

return res.status(202).json({message:"account created successfully"})
}    

} catch (error) {
console.log(error)
let processError:unknown|string= error
res.status(500).json({message:"error in creating your account",processError})

}


})





export default UserRouter