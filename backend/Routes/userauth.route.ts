import  Redis  from 'ioredis';
import express, { request, response } from 'express';
import {MONGO_URL,SECRET_KEY} from "../secret"
import _jsonwebtoken from "jsonwebtoken";

import _bcrypt from "bcrypt";
// import express from "express"

import UserModel from '../models/user.model';
import { Model } from 'mongoose';
const passport=require("passport")
const UserRouter=express.Router()

UserRouter.get("/login/failed",(req:express.Request ,res:express.Response)=>{
res.status(401).json({
  success:false,
  message:"failure"
})
  // 
})


UserRouter.get("/login/success",(req:express.Request ,res:express.Response)=>{
  if(req.user){
    res.status(401).json({
      success:true,
      message:"successfull",
      user:req.user
    })
  }

    // 
  })



UserRouter.get("/google",passport.authenticate("google",{scope:["profile"]}))

UserRouter.get("/github",passport.authenticate("github",{scope:["profile"]}))


UserRouter.get("/github/callback",passport.authenticate("github",{
  successRedirect:"http://localhost:5173/",
  failureRedirect:"http://localhost:5173/userauth/login/failed"
  }))


UserRouter.get("/google/callback",passport.authenticate("google",{
successRedirect:"http://localhost:5173/",
failureRedirect:"http://localhost:5173/userauth/login/failed"
}))

UserRouter.get("/",async(req,res)=>{
    res.json("welcome to user router")
})

const redis=new Redis()




UserRouter.post("/login",async(req,response)=>{
  const {email,password} = req.body
  const loader=await UserModel.find({email})
  const hashedpassword:string|any= loader[0].password

  try {
    // load the hashed password
    /// here i am going to compare both hashed 
    _bcrypt.compare(password,hashedpassword,(err,res)=>{
      if(err) throw err
if(res){
// sign a token with jwt
interface body{
  emailId:string
}

const bodyvalue=<body>{
  emailId:email
}
const accesstoken=_jsonwebtoken.sign(bodyvalue,SECRET_KEY,{expiresIn:60*60})
const refreshtoken=_jsonwebtoken.sign(bodyvalue,SECRET_KEY,{expiresIn:60*60})
console.log(accesstoken,refreshtoken)
response.cookie("accessToken",accesstoken,{httpOnly:true})
return response.status(202).json({message:"login successfull",refreshToken:refreshtoken})
}else{

 return response.status(406).json({message:"wrong credentials",suggestion:"please fill write credentials"})

}

    })

  } catch (error) {
    console.log(error)

    return response.status(500).json({message:"somewent wrong",error:error})
  }  
})

// so this is basicaslly logout path

UserRouter.post("/logout",async (request,response)=>{
const accessToken=request.cookies.accessToken
// so here we will require the token and fi the person is there 
// let put this token in blacklist
try {
  await redis.lpush("blacklistedusers",accessToken)
  console.log("pushed to redis successfully")
  return response.status(202).json({message:"logout successfull"})
} catch (error) {
  console.log(error)
  response.json({message:"something went wrong",error:error.message})
}


})


UserRouter.post("/signup",async (req,res)=>{
const {email,password,name,age}=req.body;
const loaddatafromdb = await UserModel.findOne({email})

try {
if(loaddatafromdb){
return  res.json({message:"user already exists"})

}else{
    // query is a instance of usermodel
const hashedpassword:string =_bcrypt.hashSync(password,10)
const query = new UserModel({email,password:hashedpassword,name,age})
await query.save()

return res.status(202).json({message:"account created successfully"})
}    

} catch (error) {
console.log(error)
const processError:unknown|string= error
res.status(500).json({message:"error in creating your account",processError})

}
})





export default UserRouter